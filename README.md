
## Checkout Joy

A clean, modern **cart → shipping → payment → success** checkout flow built with **React + TypeScript** and styled with **Tailwind + shadcn/ui**.

This repo is intentionally small and readable: mock data is local, state is stored in a lightweight context, and each step is a focused component.

### What’s inside

- **Cart step**
  - Renders cart items from a mocked async fetch
  - Quantity updates (with a minimum of 1)
  - Displays subtotal and total
- **Shipping step**
  - Form fields: Full Name, Email, Phone Number, PIN Code, City, State
  - Validation:
    - **Email**: required and must contain `@`
    - **Phone**: exactly **10 digits**
    - **PIN Code**: exactly **6 digits**
    - Other fields required
- **Payment step**
  - Final confirmation summary
  - Simulated payment to success state
- **Success step**
  - Simple order success confirmation

### Product images

Cart images are served from the `public/` folder:

- `public/products/bamboo-brush.png`
- `public/products/cotton-bags.jpg`

The image paths are referenced in:

- `src/data/mockData.ts`

### Mock backend / data fetching

There’s no real backend here—just a tiny async mock that simulates latency:

- `src/data/mockData.ts` exports `fetchCartData()` which returns the cart JSON after a short delay.

### State management

Checkout state (step, cart data, shipping address) is managed via React Context:

- `src/context/CheckoutContext.tsx`

### Tech stack

- **React 18 + TypeScript**
- **Vite 5** (dev server + build)
- **Tailwind CSS**
- **shadcn/ui + Radix UI**
- **React Router** (page navigation)
- **Zod / React Hook Form** are installed (used where appropriate in UI utilities)

### Running locally

Requirements: Node.js 18+ recommended.

```bash
git clone <YOUR_GIT_URL>
cd checkout-joy
npm install
npm run dev
```

### Useful scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview production build locally
npm run lint       # lint
npm run test       # run tests once
```

### Project structure (high-level)

- `src/pages/Index.tsx` – main checkout page (step container)
- `src/components/CartStep.tsx` – cart UI
- `src/components/ShippingStep.tsx` – shipping form + validation
- `src/components/PaymentStep.tsx` – payment/confirmation
- `src/context/CheckoutContext.tsx` – global checkout state
- `src/data/mockData.ts` – mock cart data fetch

### Notes

- If you previously saw a Vite CSS error about `@import` ordering, ensure `src/index.css` has any `@import` statements at the top (before `@tailwind ...`).

