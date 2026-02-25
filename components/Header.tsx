import Link from "next/link";
import { GlassCard } from "./GlassCard";
import { ThemeToggle } from "./ThemeToggle";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2.2l1.4 8.1a1 1 0 0 0 1 .84h8.7a1 1 0 0 0 .97-.78L18.6 7H7.2" />
      <circle cx="10" cy="18" r="1.5" />
      <circle cx="16.5" cy="18" r="1.5" />
    </svg>
  );
}

export function Header() {
  return (
    <GlassCard as="header" className="topbar">
      <Link href="/" className="brand">
        <span className="brand-dot" aria-hidden="true" />
        <span>Cloud Cake Atelier</span>
      </Link>

      <nav className="nav-center" aria-label="Primary">
        <Link href="#menu">Menu</Link>
        <Link href="#custom">Custom</Link>
        <Link href="#start-order">Order</Link>
      </nav>

      <div className="top-actions">
        <button className="btn btn-ghost icon-btn" type="button" aria-label="Open cart">
          <CartIcon />
        </button>
        <ThemeToggle />
        <span className="pill-subtle">Open 10:00–21:00</span>
      </div>
    </GlassCard>
  );
}
