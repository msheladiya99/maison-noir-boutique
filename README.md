# Maison Noir — virtual fragrance boutique

A demonstration storefront built with Next.js, TypeScript, React Three Fiber and Zustand. The brand and all six catalogue records are illustrative; they are not real inventory.

## Run locally

Requirements: Node.js 20+. Run `npm install` and `npm run dev`, then open http://localhost:3000. `npm run build` performs the production compilation and type check; `npm start` starts the compiled application.

## Try the experience

1. From the home page choose **Enter the 3D boutique**. Drag to orbit and use the side arrows or Directory to navigate to a department. Click a bottle.
2. In its panel use **View in 3D**, add it to the trolley, and change quantities in the bag. Bag and wishlist persist in browser local storage.
3. Select **Billing** in the showroom toolbar, review the trolley, and continue to checkout. You can also shop from the 2D catalogue or use the fragrance guide.
4. Checkout deliberately stops before payment. No payment or order is created, and no card details are collected.

## Important implementation limits

This is a working **prototype**, not a production-ready e-commerce backend. It uses procedural 3D geometry and a local sample catalogue. It does not include PostgreSQL/Prisma, inventory, authentication, admin, real orders, order confirmation, payment processing or verification, email, uploads, server-side pricing, fulfillment, or production SEO. The checkout is intentionally disabled rather than simulating a payment. Camera navigation is guided/orbit-based rather than free-roaming collision-based. The billing counter is a simple procedural scene. A real deployment requires those systems, security review, legal policies, accessible alternatives, validated product content, and payment provider credentials and webhooks. The imagery is AI-generated. 

## Verification

- `npm run build`
- Verify catalogue filters, product pages, wishlist, search, cart persistence, quantity controls and checkout notice.
- In a WebGL-capable browser verify showroom navigation, bottle selection and 3D rotation. If WebGL is unavailable, use the 2D catalogue.
- Test at mobile and desktop widths. The site supports reduced-motion CSS preferences, though the 3D camera is not yet fully reduced-motion aware.
