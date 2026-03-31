"use client";

import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/products";

const footerLinks = {
  Account: [
    { label: "My Account", href: "#" },
    { label: "Sign Up", href: "#" },
    { label: "Checkout", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  "Get Help": [
    { label: "Help Center", href: "#" },
    { label: "Return Policy", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "Bulk Orders", href: "#" },
  ],
  Connect: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "WhatsApp", href: `https://wa.me/91${WHATSAPP_NUMBER}` },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer" style={{ background: "#FFFFFF", borderTop: "1px solid #E0E0E0", marginTop: "56px" }}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-12 py-20" style={{ paddingTop: "64px", paddingBottom: "56px" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-5 gap-16"
          style={{ justifyItems: "center", textAlign: "center", width: "fit-content", margin: "0 auto" }}
        >
          {/* Left columns - 4 columns for links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} style={{ maxWidth: "220px" }}>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-6"
                style={{
                  color: "#000000",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.label === "WhatsApp" ? "_blank" : undefined}
                      rel={link.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                      className="text-sm transition-opacity hover:opacity-70"
                      style={{
                        color: "#555555",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Right column - Email subscription */}
          <div style={{ maxWidth: "320px" }}>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{
                color: "#000000",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.12em",
                fontWeight: 600,
              }}
            >
              Email
            </h4>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              <input
                type="email"
                placeholder="Email Address"
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  border: "1px solid #E0E0E0",
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#333333",
                  background: "#FFFFFF",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#000000")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E0E0E0")}
              />
              <button
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#000000",
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                aria-label="Subscribe"
              >
                <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #E0E0E0", margin: "40px 0", width: "100vw", marginLeft: "calc(50% - 50vw)" }} />

        {/* Bottom bar - Footer links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "32px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <Link
            href="#"
            style={{
              fontSize: "12px",
              color: "#888888",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.3s ease",
            }}
            className="hover:text-black"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            style={{
              fontSize: "12px",
              color: "#888888",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.3s ease",
            }}
            className="hover:text-black"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            style={{
              fontSize: "12px",
              color: "#888888",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.3s ease",
            }}
            className="hover:text-black"
          >
            Do Not Sell My Personal Information
          </Link>
          <Link
            href="#"
            style={{
              fontSize: "12px",
              color: "#888888",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.3s ease",
            }}
            className="hover:text-black"
          >
            Sustainability
          </Link>
        </div>

        {/* Copyright */}
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#999999",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          © {currentYear} LOOK@ME. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
