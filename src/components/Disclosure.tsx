import { useId, useState, type ReactNode } from 'react';

interface DisclosureProps {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Disclosure({ summary, children, defaultOpen = false }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="disclosure">
      <h3 className="disclosure-heading">
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="disclosure-trigger"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={`disclosure-icon${isOpen ? ' disclosure-icon-open' : ''}`} aria-hidden="true">
            ▶
          </span>
          {summary}
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="disclosure-panel">
        {children}
      </div>
    </div>
  );
}