interface CompareTrayProps { count: number; onClear: () => void; onCompare: () => void; }
export default function CompareTray({ count, onClear, onCompare }: CompareTrayProps) {
  if (!count) return null;

  return (
    <div className="sticky bottom-3 z-30 mx-3 flex flex-col gap-3 border border-[var(--industrial-line)] bg-[var(--industrial-bg)] px-4 py-3 text-sm text-[var(--industrial-text)] shadow-xl sm:mx-auto sm:max-w-2xl sm:flex-row sm:items-center sm:justify-between" role="status" aria-live="polite">
      <span>{count} vehicle{count === 1 ? '' : 's'} selected for comparison</span>
      <div className="grid grid-cols-2 gap-px bg-[var(--industrial-line)]">
        <button type="button" className="min-h-11 bg-[var(--industrial-accent)] px-5 font-bold uppercase text-[#061314]" onClick={onCompare}>Compare</button>
        <button type="button" className="min-h-11 bg-[var(--industrial-panel)] px-5 font-bold uppercase text-[var(--industrial-text)]" onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}
