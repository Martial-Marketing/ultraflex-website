import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, MapPin } from 'lucide-react';

interface LocationOption {
  id: number | string;
  name: string;
  slug?: string;
}

interface LocationSelectProps {
  options: LocationOption[];
  value: string | number | '';
  onChange: (val: string | number | '') => void;
  placeholder?: string;
  disabled?: boolean;
  showSearch?: boolean;
  className?: string;
  label?: string;
  optional?: boolean;
}

// Utility: compose class names
function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function LocationSelect({
  options,
  value,
  onChange,
  placeholder = 'Select a location',
  disabled = false,
  showSearch = true,
  className,
  label,
  optional = false,
}: LocationSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const filtered = query.trim() === ''
    ? options
    : options.filter(o => o.name.toLowerCase().includes(query.toLowerCase()));

  // Ensure activeIndex valid when filtered changes
  useEffect(() => {
    if (activeIndex >= filtered.length) setActiveIndex(0);
  }, [filtered.length, activeIndex]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setQuery(''); buttonRef.current?.focus(); }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(i => (i + 1) % filtered.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(i => (i - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const chosen = filtered[activeIndex];
        if (chosen) {
          onChange(chosen.id.toString());
          setOpen(false);
          setQuery('');
          buttonRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, activeIndex, onChange]);

  const selectedOption = options.find(o => o.id.toString() === value.toString());

  return (
    <div ref={containerRef} className={cx('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-white mb-1 select-none">
          {label} {optional && <span className="text-gray-400 font-normal">(Optional)</span>}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className={cx(
          'w-full flex items-center justify-between rounded-md px-4 py-3 text-sm transition-all',
          'bg-black/30 border border-white/15 backdrop-blur-sm text-white',
          'hover:border-red-700/40 focus:outline-none focus:ring-2 focus:ring-red-700/50',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className={cx('truncate', !selectedOption && 'text-gray-400')}>{selectedOption ? selectedOption.name : placeholder}</span>
        <ChevronDown className={cx('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-full rounded-lg border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1"
        >
          {showSearch && (
            <div className="p-2 border-b border-white/10 flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                placeholder="Search locations..."
                className="w-full bg-transparent focus:outline-none text-sm text-white placeholder-gray-500"
              />
            </div>
          )}
          <ul
            ref={listRef}
            role="listbox"
            aria-activedescendant={filtered[activeIndex]?.id.toString()}
            className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-red-700/40"
          >
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-xs text-gray-400 select-none">No matches</li>
            )}
            {filtered.map((opt, i) => {
              const isSelected = value.toString() === opt.id.toString();
              const isActive = i === activeIndex;
              const isHeadOffice = /head office/i.test(opt.name) || opt.slug === 'head-office';
              return (
                <li
                  key={opt.id}
                  id={opt.id.toString()}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseDown={(e) => { // onMouseDown to fire before blur
                    e.preventDefault();
                    onChange(opt.id.toString());
                    setOpen(false);
                    setQuery('');
                    buttonRef.current?.focus();
                  }}
                  className={cx(
                    'px-4 py-2.5 text-sm flex items-center gap-2 cursor-pointer select-none transition-colors',
                    'border-b border-white/5 last:border-b-0',
                    isActive ? 'bg-red-700/30 text-white' : 'text-gray-200 hover:bg-white/5',
                    isSelected && 'bg-red-700/50 text-white font-semibold'
                  )}
                >
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="truncate flex-1">{opt.name}</span>
                  {isHeadOffice && (
                    <span className="text-[10px] uppercase tracking-wide bg-gradient-to-r from-red-700 to-red-800 text-white px-2 py-0.5 rounded-full border border-red-700/30">HQ</span>
                  )}
                  {isSelected && (
                    <span className="text-[10px] uppercase tracking-wide text-red-500">Selected</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
