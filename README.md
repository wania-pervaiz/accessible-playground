# Accessible Components Playground

Three interactive UI components — **Modal, Tabs, and Disclosure** — built from scratch in React + TypeScript, without component libraries, following the official [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) patterns.

shadcn/ui's Dialog and Tabs are also included for comparison, showing what a hand-built implementation gets right and what a library handles automatically.

---

# Why This Exists

AI assistants and component libraries can generate UI quickly, including inaccessible UI. These components were built by hand first to understand the accessibility requirements before comparing them with shadcn/ui.

See **`NOTES.md`** for the comparison.

---

# What's Inside

```text
src/
├── components/
│   ├── Modal.tsx
│   ├── Tabs.tsx
│   ├── Disclosure.tsx
│   └── ui/
│       ├── dialog.tsx
│       └── tabs.tsx
└── App.tsx
```

---

# Getting Started

```bash
npm install
npm run dev
```

Open the provided localhost link to view the components.

---

# Accessibility Patterns

* **Modal** — Dialog pattern with `role="dialog"`, `aria-modal`, and focus management.
* **Tabs** — Tablist, tabs, tabpanel, roving `tabindex`, and arrow-key navigation.
* **Disclosure** — Native button with `aria-expanded`.

---

# shadcn/ui Comparison

The shadcn/ui Dialog and Tabs components are included under `src/components/ui/`.

See **`NOTES.md`** for the differences between the hand-built components and shadcn/ui, including focus trapping, portals, and reusable focus behavior.

---

# Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
