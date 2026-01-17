#!/usr/bin/env node
/*
  Convert images in specific folders to WebP.

  Default folders:
    - public/Images/Gallery
    - public/Images/HOME PAGE GALLERY IMAGES

  Usage:
    node scripts/convert-gallery-folders-to-webp.cjs
    node scripts/convert-gallery-folders-to-webp.cjs --delete-originals
    node scripts/convert-gallery-folders-to-webp.cjs --quality=85
    node scripts/convert-gallery-folders-to-webp.cjs --force

  Notes:
    - Converts .jpg/.jpeg/.png to .webp
    - Keeps existing .webp as-is
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const repoRoot = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const out = { quality: 85, force: false, deleteOriginals: false };
  for (const arg of argv.slice(2)) {
    if (arg === '--force') out.force = true;
    else if (arg === '--delete-originals') out.deleteOriginals = true;
    else if (arg.startsWith('--quality=')) {
      const q = Number(arg.slice('--quality='.length));
      if (Number.isFinite(q) && q >= 1 && q <= 100) out.quality = q;
    }
  }
  return out;
}

function walkFiles(rootDir) {
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
      if (entry.isDirectory()) {
        stack.push(abs);
      } else if (entry.isFile()) {
        results.push(abs);
      }
    }
  }
  return results;
}

async function convertOne(inputAbs, { quality, force, deleteOriginals }) {
  const ext = path.extname(inputAbs).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return { skipped: true };

  const outputAbs = path.join(path.dirname(inputAbs), path.parse(inputAbs).name + '.webp');

  if (!force && fs.existsSync(outputAbs)) {
    return { skipped: true, reason: 'exists', outputAbs };
  }

  await sharp(inputAbs).webp({ quality }).toFile(outputAbs);

  if (deleteOriginals) {
    try {
      fs.unlinkSync(inputAbs);
    } catch {
      // ignore
    }
  }

  return { converted: true, outputAbs };
}

async function main() {
  const { quality, force, deleteOriginals } = parseArgs(process.argv);

  const targetDirs = [
    path.join(repoRoot, 'public', 'Images', 'Gallery'),
    path.join(repoRoot, 'public', 'Images', 'HOME PAGE GALLERY IMAGES'),
  ].filter((p) => fs.existsSync(p));

  if (targetDirs.length === 0) {
    console.error('No target directories found under public/Images.');
    process.exit(1);
  }

  let total = 0;
  let converted = 0;
  let skipped = 0;

  for (const dir of targetDirs) {
    const files = walkFiles(dir);
    for (const file of files) {
      total++;
      try {
        const res = await convertOne(file, { quality, force, deleteOriginals });
        if (res && res.converted) converted++;
        else skipped++;
      } catch (e) {
        console.error(`Failed converting: ${path.relative(repoRoot, file)} (${e?.message || e})`);
      }
    }
  }

  console.log(
    JSON.stringify(
      {
        quality,
        force,
        deleteOriginals,
        scannedFiles: total,
        converted,
        skipped,
        targetDirs: targetDirs.map((d) => path.relative(repoRoot, d).split(path.sep).join('/')),
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
