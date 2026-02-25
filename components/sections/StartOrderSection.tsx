import Link from "next/link";
import { GlassCard } from "../GlassCard";

export function StartOrderSection() {
  return (
    <GlassCard as="section" id="start-order" className="order-card" aria-labelledby="order-title">
      <div>
        <p className="kicker">Order Flow</p>
        <h2 id="order-title" style={{ margin: "8px 0 0" }}>
          Start your order in under 2 minutes.
        </h2>
        <p style={{ margin: "12px 0 0", color: "var(--muted)" }}>
          Continue to a focused checkout at <strong>/order</strong> with step-by-step details and validation.
        </p>
      </div>
      <div>
        <Link className="btn btn-primary" href="/order">
          Start Order
        </Link>
      </div>
    </GlassCard>
  );
}
