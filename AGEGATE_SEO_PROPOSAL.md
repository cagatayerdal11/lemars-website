# AGEGATE_SEO_PROPOSAL.md

**Status: PROPOSAL ONLY — not implemented. Awaiting separate approval.**
**Compliance-sensitive: this component enforces the age gate. No change will be made without your explicit sign-off.**

File in scope: `src/components/AgeGate.tsx` (client component). Verified live behavior: `curl https://www.lemarsgida.com/tr` → `<body>` renders only the loading spinner.

---

## 1. Current rendering flow (verified from `AgeGate.tsx`)

State: `verified: boolean | null = null`, `denied: boolean = false`. Verification stored in `sessionStorage["lemars-age-verified"]`.

1. **Server render (SSR):** `verified === null` → returns a **full-screen spinner** (`min-h-screen … animate-spin`). `children` are **not** in the returned tree.
2. **Client hydrate → `useEffect`** reads `sessionStorage`:
   - not set → `verified = false` → returns the **age-gate modal** (question or denied view). `children` still not rendered.
   - `"true"` → `verified = true` → returns `<>{children}</>`.

Net: the real site (`TAPDKBanner`, `Header`, `main`, `Footer`, …) is rendered **only after** a human clicks “Evet”.

## 2. Crawler rendering flow (why it hurts SEO)

- The initial HTML a crawler fetches contains **only the spinner** — no `<h1>`, nav, or body copy on **any** route (title/description in `<head>` still emit via `generateMetadata`).
- A JS-rendering crawler (Googlebot) hydrates, runs the `useEffect`, finds no `sessionStorage`, and lands on the **age-gate modal** — it does not click “Evet”, so it never reaches `children`.
- Result: high risk that every page is indexed as thin / age-gate content. **This is the P0 in `LEMARS_SEO_AUDIT.md`.**

## 3. Proposed overlay architecture

Render the site content **normally in the document flow** (server-rendered, crawlable) and show the age gate as a **fixed overlay on top** until verified.

Pseudocode (replaces the current branching `return`s):

```tsx
return (
  <>
    {children}                                   {/* always rendered → in SSR HTML + DOM */}
    {verified === false && (
      <div
        role="dialog" aria-modal="true" aria-labelledby="agegate-title"
        className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur … overflow-y-auto"
      >
        {/* existing modal markup (question / denied), unchanged text */}
      </div>
    )}
  </>
);
// verified === null: render children with the overlay shown by default
// (assume "not verified" on first paint), then hide on verify — avoids the
// blank spinner and keeps content in the HTML.
```

Key points:
- `children` are **always** rendered (SSR + client) → crawlers and no-JS users get full content.
- Overlay uses `position: fixed; inset: 0; z-index` above everything; background scroll locked (`document.body` overflow hidden) while shown.
- **Same** verification logic, **same** `sessionStorage["lemars-age-verified"]` key, **same** legal texts and “Evet/Hayır” behavior.
- To avoid a flash of content pre-verification on first load, show the overlay by default (initial `verified` treated as not-verified for the overlay) and hide it once `sessionStorage` confirms — the content is still in the HTML (good for SEO), just visually covered.

## 4. Exact files / lines that would change

| File | Change |
|---|---|
| `src/components/AgeGate.tsx` | Replace the three conditional `return`s (spinner `~L42–48`, gate `~L50–125`, `children` `~L128`) with: always-render `children` + conditional fixed overlay. Add `role="dialog"`/`aria-modal`, focus handling, and background scroll-lock. Keep all dict text and the `handleYes`/`sessionStorage` logic. |
| (no other files) | Layout usage `[locale]/layout.tsx` stays the same — it still wraps children in `<AgeGate>`. |

## 5. User-visible behavior — before / after

| | Before | After |
|---|---|---|
| First paint | Full-screen spinner, then modal | Age-gate overlay over a (blurred/darkened) page |
| After “Evet” | Content appears | Overlay disappears, content already there |
| Return visit (verified) | Spinner → content | Content immediately, no overlay |
| “Hayır” | Denied view | Denied view (unchanged) |
| Human gating | Enforced | **Still enforced** (must dismiss overlay to use the site) |

## 6. SEO benefit

- Full page content (H1s, nav, body, footer, internal links) present in **initial HTML on every route** → crawlable and indexable.
- Resolves the site-wide P0 crawler-visibility risk. Complements the metadata/canonical/hreflang/schema work already implemented.

## 7. Accessibility impact (net positive)

- Adds `role="dialog"` + `aria-modal="true"` + labelled title (currently absent).
- Should add: focus trap within the modal, initial focus on the “Evet” button, background `aria-hidden`/scroll-lock, and an Escape decision (Escape should NOT dismiss without a choice, to preserve gating).
- Underlying content becomes reachable by assistive tech only conceptually — visually/interactively it stays blocked by the overlay.

## 8. Compliance-sensitive aspects (for your / legal review — not a legal opinion)

- **Trade-off:** with the overlay, the page HTML/DOM technically **exists behind** the modal (a determined user could inspect/scroll the source). This is how most compliant TR and global alcohol sites work, but it is a change from the current “content absent until verified” behavior.
- If your interpretation of **4250 / 4733 / TAPDK** requires content to be **fully unreachable** before age confirmation, this overlay approach may not be acceptable, and the current (SEO-costly) behavior might be the deliberate choice.
- The **age-gate texts, the sessionStorage-only (no personal data stored) approach, and the “Evet/Hayır” flow remain unchanged.**

**Recommendation:** proceed with the overlay **only** after you confirm the compliance trade-off in §8 is acceptable. If not, we keep AgeGate as-is and accept the SEO limitation (documented as an accepted risk).
