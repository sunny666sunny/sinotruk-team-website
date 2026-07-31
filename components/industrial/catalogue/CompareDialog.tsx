import { useEffect, useId, useRef, type KeyboardEvent } from 'react';
import ComparisonTable from '@/components/procurement/ComparisonTable';
import type { ComparableProduct } from '@/lib/procurement/compare-products';
import { activateDrawer, handleDrawerKeyDown } from '@/lib/ui/focus-trap';

type CompareDialogProps = {
  onClose(): void;
  open: boolean;
  products: ComparableProduct[];
};

export function CompareDialog({ onClose, open, products }: CompareDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open || !panelRef.current) return;
    return activateDrawer(panelRef.current);
  }, [open]);

  if (!open) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (panelRef.current) handleDrawerKeyDown(event, panelRef.current, onClose);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 p-4" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <div
        ref={panelRef}
        className="mx-auto mt-10 max-w-6xl border border-[var(--industrial-line)] bg-[var(--industrial-panel)] p-5 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[var(--industrial-accent)]">Selected vehicles</p>
            <h2 id={titleId} className="mt-1 text-3xl font-extrabold uppercase text-[var(--industrial-text)]">Compare specifications</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close vehicle comparison" className="min-h-11 text-sm font-bold uppercase text-[var(--industrial-text)]">Close</button>
        </div>
        <ComparisonTable products={products} />
      </div>
    </div>
  );
}
