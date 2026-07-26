import { type ReactNode } from 'react';

interface EmptyStateProps {
  action?: ReactNode;
  description: string;
  title: string;
}

export function EmptyState({ action, description, title }: EmptyStateProps) {
  return <div className="ui-empty-state"><p className="ui-empty-state__title">{title}</p><p className="ui-empty-state__description">{description}</p>{action}</div>;
}
