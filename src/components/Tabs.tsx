import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  idPrefix: string;
  defaultActiveId?: string;
}

export default function Tabs({ items, idPrefix, defaultActiveId }: TabsProps) {
  const [activeId, setActiveId] = useState<string>(defaultActiveId ?? items[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeIndex = items.findIndex((item) => item.id === activeId);

  const focusTab = (index: number) => {
    const item = items[index];
    setActiveId(item.id);
    tabRefs.current[item.id]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        focusTab((activeIndex + 1) % items.length);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        focusTab((activeIndex - 1 + items.length) % items.length);
        break;
      case 'Home':
        e.preventDefault();
        focusTab(0);
        break;
      case 'End':
        e.preventDefault();
        focusTab(items.length - 1);
        break;
    }
  };

  return (
    <div className="tabs">
      <div role="tablist" aria-label="Playground tabs" className="tablist">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              role="tab"
              id={`${idPrefix}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`tab${isActive ? ' tab-active' : ''}`}
              onClick={() => setActiveId(item.id)}
              onKeyDown={handleKeyDown}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <div
            key={item.id}
            role="tabpanel"
            id={`${idPrefix}-panel-${item.id}`}
            aria-labelledby={`${idPrefix}-tab-${item.id}`}
            hidden={!isActive}
            tabIndex={0}
            className="tabpanel"
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}