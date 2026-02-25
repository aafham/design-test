import Link from "next/link";
import { GlassCard } from "../GlassCard";

export function CustomDesignSection() {
  return (
    <GlassCard as="section" id="custom" className="split" aria-labelledby="custom-title">
      <div>
        <p className="kicker">Custom Design</p>
        <h2 id="custom-title" style={{ margin: "8px 0 0" }}>
          Bespoke cakes matched to your event concept.
        </h2>
        <p style={{ color: "var(--muted)", marginTop: 12 }}>
          Share your theme and we will prepare a clean visual direction before baking starts.
        </p>
        <ul className="benefits">
          <li>Design mockup before production</li>
          <li>Flavor + color customization</li>
          <li>Reliable timeline with delivery support</li>
        </ul>
      </div>
      <div>
        <Link className="btn btn-primary" href="/quote">
          Request a Quote
        </Link>
      </div>
    </GlassCard>
  );
}
