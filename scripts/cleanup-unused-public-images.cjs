#!/usr/bin/env node
/*
  Cleanup unused images under public/Images (and/or public/images).

  Usage:
    node scripts/cleanup-unused-public-images.cjs
    node scripts/cleanup-unused-public-images.cjs --apply

    # Keep only images referenced by Locations (cards), Trainers, Tours, News
    node scripts/cleanup-unused-public-images.cjs --scope=marketing
    node scripts/cleanup-unused-public-images.cjs --scope=marketing --apply

  Notes:
  - Default mode (scope=all) keeps any image referenced anywhere in code.
  - This script does NOT permanently delete; it moves unused files to storage/app/image-trash/<timestamp>/...
  - Always run without --apply first.
*/

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const publicDir = path.join(repoRoot, 'public');

function parseArgs(argv) {
  const out = { apply: false, delete: false, yes: false, scope: 'all' };
  for (const arg of argv.slice(2)) {
    if (arg === '--apply') out.apply = true;
    else if (arg === '--delete') out.delete = true;
    else if (arg === '--yes') out.yes = true;
    else if (arg.startsWith('--scope=')) out.scope = arg.slice('--scope='.length) || 'all';
  }
  return out;
}

function safeDecodeURIComponent(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function normalizePublicPath(p) {
  const cleaned = p.split('?')[0].split('#')[0].trim();
  const decoded = safeDecodeURIComponent(cleaned);
  const noLeading = decoded.startsWith('/') ? decoded.slice(1) : decoded;
  return noLeading.replace(/\\/g, '/');
}

function captureImageRefs(text) {
  const refs = [];
  const quoted = /['"`]\s*(\/[Ii]mages\/[^'"`\n]+?)\s*['"`]/g;
  const cssUrl = /url\(\s*['"]?(\/[Ii]mages\/[^'"\)\n]+?)['"]?\s*\)/g;
  let m;
  while ((m = quoted.exec(text))) refs.push(m[1]);
  while ((m = cssUrl.exec(text))) refs.push(m[1]);
  return refs;
}

function walkFiles(rootDir, { includeExts, excludeDirs }) {
  const results = [];
  const stack = [rootDir];
  while (stack.length) {
    const current = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      const rel = path.relative(repoRoot, abs).split(path.sep).join('/');
      if (entry.isDirectory()) {
        if (excludeDirs.some((x) => rel === x || rel.startsWith(x + '/'))) continue;
        stack.push(abs);
        continue;
      }
      if (!entry.isFile()) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (!includeExts || includeExts.includes(ext)) results.push(abs);
    }
  }
  return results;
}

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function moveFile(srcAbs, destAbs) {
  ensureDir(path.dirname(destAbs));
  try {
    fs.renameSync(srcAbs, destAbs);
  } catch {
    fs.copyFileSync(srcAbs, destAbs);
    fs.unlinkSync(srcAbs);
  }
}

function main() {
  const { apply, delete: doDelete, yes, scope } = parseArgs(process.argv);

  const imagesRoot = [path.join(publicDir, 'Images'), path.join(publicDir, 'images')].find((p) => fs.existsSync(p));
  if (!imagesRoot) {
    console.error('No public/Images or public/images directory found.');
    process.exit(1);
  }

  const imageExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
  const imageFiles = walkFiles(imagesRoot, { includeExts: imageExts, excludeDirs: [] });

  // lower-case rel path from public/ -> { abs, rel }
  const imageIndex = new Map();
  for (const abs of imageFiles) {
    const relFromPublic = path.relative(publicDir, abs).split(path.sep).join('/');
    imageIndex.set(relFromPublic.toLowerCase(), { abs, rel: relFromPublic });
  }

  const codeExcludeDirs = ['vendor', 'node_modules', 'public/build', 'storage', '.git'];
  const codeIncludeExts = ['.php', '.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.json'];

  let codeFiles;
  if (scope === 'marketing') {
    const focusRel = [
      'app/Http/Controllers/LocationController.php',
      'resources/js/pages/Locations/Index.tsx',
      'app/Data/TrainerData.php',
      'app/Http/Controllers/TourController.php',
      'app/Http/Controllers/NewsController.php',
      'resources/js/pages/Trainers/Index.tsx',
      'resources/js/pages/Trainers/[trainer].tsx',
      'resources/js/pages/Trainers/Show.tsx',
      'resources/js/pages/Tours/Index.tsx',
      'resources/js/pages/News/Index.tsx',
      'resources/js/pages/News/Show.tsx',
    ];
    codeFiles = focusRel.map((p) => path.join(repoRoot, p)).filter((p) => fs.existsSync(p));
  } else {
    codeFiles = walkFiles(repoRoot, { includeExts: codeIncludeExts, excludeDirs: codeExcludeDirs });
  }

  const used = new Set();
  const tryExts = ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.svg'];

  function markUsed(normNoLeadingSlash) {
    const norm = String(normNoLeadingSlash).replace(/^\/+/, '').replace(/\\/g, '/');
    const lower = norm.toLowerCase();
    const hasExt = Boolean(path.extname(norm));

    // Try both Images/ and images/ (Linux is case-sensitive)
    const variants = new Set([lower]);
    if (lower.startsWith('images/')) {
      const remainder = norm.slice('Images/'.length);
      variants.add(('Images/' + remainder).toLowerCase());
      variants.add(('images/' + remainder).toLowerCase());
    }

    for (const v of variants) {
      if (imageIndex.has(v)) used.add(v);
      if (!hasExt) {
        for (const ext of tryExts) {
          const withExt = (v + ext).toLowerCase();
          if (imageIndex.has(withExt)) used.add(withExt);
        }
      }
    }
  }

  for (const file of codeFiles) {
    let text;
    try {
      text = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    for (const ref of captureImageRefs(text)) {
      markUsed(normalizePublicPath(ref));
    }
  }

  const allKeys = Array.from(imageIndex.keys());
  const unusedKeys = allKeys.filter((k) => !used.has(k));

  console.log(
    JSON.stringify(
      {
        scope,
        apply,
        delete: doDelete,
        imagesRoot: path.relative(repoRoot, imagesRoot).split(path.sep).join('/'),
        totalImages: allKeys.length,
        usedImages: used.size,
        unusedImages: unusedKeys.length,
        unusedSample: unusedKeys.slice(0, 50),
      },
      null,
      2
    )
  );

  if (!apply) {
    console.log(`\nDry-run only. Re-run with --apply to move unused files to storage/app/image-trash/.`);
    console.log(`To permanently delete instead of moving, add --delete --yes (irreversible).`);
    return;
  }

  if (doDelete && !yes) {
    console.error('Refusing to permanently delete without --yes.');
    console.error('Re-run with: --apply --delete --yes');
    process.exit(2);
  }

  if (doDelete) {
    let deleted = 0;
    for (const key of unusedKeys) {
      const entry = imageIndex.get(key);
      if (!entry) continue;
      if (!fs.existsSync(entry.abs)) continue;
      try {
        fs.unlinkSync(entry.abs);
        deleted++;
      } catch {
        // ignore and continue
      }
    }

    // Best-effort cleanup of now-empty directories under imagesRoot
    const dirs = [];
    const stack = [imagesRoot];
    while (stack.length) {
      const current = stack.pop();
      let entries;
      try {
        entries = fs.readdirSync(current, { withFileTypes: true });
      } catch {
        continue;
      }
      for (const e of entries) {
        if (e.isDirectory()) stack.push(path.join(current, e.name));
      }
      dirs.push(current);
    }
    dirs.sort((a, b) => b.length - a.length);
    for (const dir of dirs) {
      if (dir === imagesRoot) continue;
      try {
        const items = fs.readdirSync(dir);
        if (items.length === 0) fs.rmdirSync(dir);
      } catch {
        // ignore
      }
    }

    console.log(`\nPermanently deleted ${deleted} files under ${path.relative(repoRoot, imagesRoot).split(path.sep).join('/')}`);
    return;
  }

  const trashBase = path.join(repoRoot, 'storage', 'app', 'image-trash', nowStamp());
  ensureDir(trashBase);

  let moved = 0;
  for (const key of unusedKeys) {
    const entry = imageIndex.get(key);
    if (!entry) continue;
    if (!fs.existsSync(entry.abs)) continue;
    const destAbs = path.join(trashBase, entry.rel.split('/').join(path.sep));
    moveFile(entry.abs, destAbs);
    moved++;
  }

  console.log(`\nMoved ${moved} files to ${path.relative(repoRoot, trashBase).split(path.sep).join('/')}`);
}

main();