"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/components/CartProvider";

const navLinks = [
  { href: "/shop", label: "Catalog", hasDropdown: true },
  { href: "/shop?filter=sale", label: "Sale" },
  { href: "/shop?filter=new", label: "New Arrival" },
  { href: "/#contact", label: "About" },
];

interface NavbarProps {
  transparentOnTop?: boolean;
}

export default function Navbar({ transparentOnTop = false }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { totalItems } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/shop") {
      setSearchQuery(searchParams.get("q") ?? "");
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const q = searchQuery.trim();

      if (pathname === "/shop") {
        const params = new URLSearchParams(searchParams.toString());
        if (q) {
          params.set("q", q);
        } else {
          params.delete("q");
        }
        router.replace(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
        return;
      }

      if (q) {
        router.push(`/shop?q=${encodeURIComponent(q)}`);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [searchQuery, pathname, searchParams, router]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[900]">
      {/* ── Main Navbar ── */}
      <nav
        className="navbar"
        style={{ 
          width: "100%",
          maxWidth: "100%",
          background: transparentOnTop && !scrolled ? "transparent" : "var(--bg-primary)",
          borderBottom: transparentOnTop && !scrolled ? "none" : "1px solid var(--border)",
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.06)" : "none", 
          transition: "all 0.4s ease" 
        }}
      >
        <div className="mx-auto flex items-center justify-between h-14" style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" style={{ opacity: 1, transition: "opacity 0.25s ease" }} onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                fontSize: "24px",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "var(--text-primary)", transition: "color 0.4s ease" }}>LOOK AT ME</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 py-2 transition-colors duration-200"
                  style={{ color: transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 400 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = transparentOnTop && !scrolled ? "rgba(255,255,255,0.7)" : "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-primary)")}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={12} />}
                </Link>
                <span
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--accent)" }}
                />
              </div>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            {/* Search box */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded text-sm"
              style={{ 
                background: transparentOnTop && !scrolled ? "rgba(255,255,255,0.15)" : "var(--bg-secondary)", 
                border: transparentOnTop && !scrolled ? "1px solid rgba(255,255,255,0.2)" : "1px solid var(--border)", 
                minWidth: "170px", 
                color: transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-muted)",
                transition: "all 0.4s ease"
              }}
            >
              <Search size={13} style={{ color: transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-muted)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                  fontSize: "13px",
                  color: transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-primary)",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            <Link
              href="#"
              aria-label="Account"
              style={{ color: transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-primary)", padding: "6px", transition: "color 0.4s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = transparentOnTop && !scrolled ? "rgba(255,255,255,0.7)" : "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-primary)")}
            >
              <User size={20} />
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              style={{ color: transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-primary)", padding: "6px", transition: "color 0.4s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = transparentOnTop && !scrolled ? "rgba(255,255,255,0.7)" : "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-primary)")}
            >
              <span style={{ position: "relative", display: "inline-flex" }}>
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
                      minWidth: "16px",
                      height: "16px",
                      borderRadius: "999px",
                      background: "#111",
                      color: "#fff",
                      fontSize: "10px",
                      lineHeight: "16px",
                      textAlign: "center",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </span>
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: transparentOnTop && !scrolled ? "#FFFFFF" : "var(--text-primary)", background: "none", border: "none", cursor: "pointer", padding: "6px" }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: "white", borderTop: "1px solid var(--border)", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          >
            <div className="px-6 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-sm font-medium"
                  style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border)", fontFamily: "'DM Sans', sans-serif" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
