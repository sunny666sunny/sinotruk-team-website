import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { activateDrawer, handleDrawerKeyDown } from '@/lib/ui/focus-trap';

interface FilterDrawerProps {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  title: string;
}

export function FilterDrawer({ children, onClose, open, title }: FilterDrawerProps) {
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
    <div className="ui-filter-drawer" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <div ref={panelRef} className="ui-filter-drawer__panel" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} onKeyDown={onKeyDown}>
        <div className="ui-filter-drawer__header">
          <h2 id={titleId} className="ui-filter-drawer__title">{title}</h2>
          <button type="button" className="ui-filter-drawer__close" onClick={onClose} aria-label="Close filters">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
