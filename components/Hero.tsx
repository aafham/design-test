import Link from "next/link";
import { GlassCard } from "./GlassCard";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <GlassCard className="hero-copy">
        <p className="kicker">Liquid Glass Collection</p>
        <h1 id="hero-title">Luxury cakes, crafted for unforgettable moments.</h1>
        <p>Premium custom cakes for birthdays, weddings, and branded events with elegant design and balanced flavor.</p>
        <div className="hero-cta">
          <Link className="btn btn-primary" href="/order">
            Order Now
          </Link>
          <Link className="btn btn-ghost" href="#menu">
            View Collection
          </Link>
        </div>
        <div className="stats-row" aria-label="Shop stats">
          <span>
            <strong>4.9/5</strong> rating
          </span>
          <span className="dot" aria-hidden="true" />
          <span>
            <strong>1,200+</strong> orders completed
          </span>
        </div>
      </GlassCard>

      <GlassCard className="featured-card">
        <img
          className="featured-image"
          src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1100&q=80"
          alt="Berry Cloud Royale cake"
          loading="eager"
        />
        <div className="featured-meta surface-strong">
          <div className="featured-title-row">
            <div>
              <strong>Berry Cloud Royale</strong>
              <p style={{ margin: 0, color: "var(--muted)" }}>Signature Drop</p>
            </div>
            <span className="featured-price">RM 145</span>
          </div>
          <div className="featured-actions">
            <Link href="#menu" className="link-btn">
              View details
            </Link>
            <button type="button" className="btn btn-ghost" style={{ height: 34, paddingInline: 12 }}>
              Add to cart
            </button>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
