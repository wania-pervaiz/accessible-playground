# Notes: My Components vs. shadcn/ui (Radix)

## Why I built these by hand first

AI tools and component libraries can create UI very fast — but they can
create *inaccessible* UI just as fast. You can't properly check code you
don't understand. So before using a library, I built a Modal, Tabs, and
Disclosure myself, following the official accessibility rules (W3C ARIA
patterns) by hand. Only after that did I install shadcn/ui and look at its
version — so I could actually understand what it does differently, instead
of just trusting that "it's from a library, so it must be fine."

## What I found: Dialog (Modal)

1. **My code has visible keyboard logic. Theirs doesn't.**
   My `Modal.tsx` has about 30 lines of code that manually handle the Tab
   key (trapping focus inside the modal) and the Escape key (closing it).
   When I opened shadcn's generated `dialog.tsx`, there is **no keyboard
   code at all** — no Tab handling, no Escape handling. All of that is
   hidden inside Radix's `DialogPrimitive.Content` component. It still
   works, it's just invisible to me as the person using it.

2. **Their modal renders in a different part of the page (a "Portal").**
   shadcn wraps the dialog content in something called `DialogPortal`,
   which makes it render near the very bottom of the whole page (close to
   `<body>`), no matter where the button that opened it is. My modal
   renders right where it is in the code. In practice, this means my
   modal *could* get visually cut off if a parent element on the page has
   `overflow: hidden` — Radix's version avoids that problem entirely.

3. **I had to remember to hide the background myself. They do it automatically.**
   When my modal is open, I manually hide the rest of the page from
   screen readers using `aria-hidden` — something I could easily forget to
   do. Radix's version does this (and also stops the background from
   scrolling) automatically, without me having to remember anything.

## What I found: Tabs

1. **My tabs only work one way. Theirs is more flexible.**
   My `Tabs.tsx` only supports left-to-right tabs where pressing an arrow
   key *immediately* switches the tab. Radix's Tabs component also supports
   top-to-bottom tabs and a "manual" mode (where arrow keys just move focus,
   and you have to press Enter to actually switch). I only built the one
   basic version.

2. **My "move between tabs" logic is written just once, for tabs only.**
   The technique that lets you Tab into the tab list once and then use
   arrow keys to move between tabs (called "roving tabindex") — I wrote
   that code specifically inside `Tabs.tsx`, just for this one component.
   Radix built that same logic as a separate, reusable piece that they
   also use in other components like menus and radio buttons — so they
   only had to get it right once, and every component benefits.

## The bottom line

Both my version and shadcn's version pass the basic keyboard tests — I
tested mine myself with Tab, Shift+Tab, Escape, and arrow keys, and they
all worked correctly. The real difference isn't that mine is "broken" — it's
that Radix's version also quietly handles extra edge cases (rare situations)
that the accessibility spec doesn't strictly force you to think about, and
they share their solutions across multiple components instead of writing
the same logic over and over.