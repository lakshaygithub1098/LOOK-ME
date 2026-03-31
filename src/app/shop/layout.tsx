import { Suspense } from "react";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div style={{ background: "var(--bg-primary)", minHeight: "100vh" }} />}>
      {children}
    </Suspense>
  );
}
