import { useId, useRef, useState } from 'react';
import Modal from './components/Modal';
import Tabs from './components/Tabs';
import Disclosure from './components/Disclosure';
import './index.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalTitleId = useId();
  const openButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* Hidden from assistive tech while the modal is open, so background
          content doesn't get announced as if it were still interactive. */}
      <div aria-hidden={isModalOpen || undefined} className="app-root">
        <h1>Accessible Components Playground</h1>

        <section>
          <h2>Modal Dialog</h2>
          <button ref={openButtonRef} onClick={() => setIsModalOpen(true)}>
            Open modal
          </button>
        </section>

        <section>
          <h2>Tabs</h2>
          <Tabs
            idPrefix="demo"
            items={[
              { id: 'profile', label: 'Profile', content: <p>Profile panel content.</p> },
              { id: 'settings', label: 'Settings', content: <p>Settings panel content.</p> },
              { id: 'billing', label: 'Billing', content: <p>Billing panel content.</p> },
            ]}
          />
        </section>

        <section>
          <h2>Disclosure</h2>
          <Disclosure summary="What is a disclosure widget?">
            <p>
              A disclosure is a button that reveals or hides a section of content — commonly
              used for FAQs or optional details.
            </p>
          </Disclosure>
        </section>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titleId={modalTitleId} title="Example Modal">
        <p>This is a modal dialog. Try tabbing through its controls, or press Escape.</p>
        <label>
          Name
          <input type="text" />
        </label>
        <button onClick={() => setIsModalOpen(false)}>Confirm</button>
      </Modal>
    </>
  );
}