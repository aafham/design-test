import { GlassCard } from "../GlassCard";

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 7h11v8H3zM14 10h3l3 3v2h-2" />
      <circle cx="8" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4.5l3 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12.3 10.8 15 16 9.5" />
    </svg>
  );
}

export function InfoChipsSection() {
  return (
    <section aria-label="Service details">
      <div className="chips-grid">
        <GlassCard as="article" className="info-chip">
          <span className="icon-circle">
            <TruckIcon />
          </span>
          <h3>Delivery Zones</h3>
          <p>Klang Valley, Putrajaya, and selected nearby areas.</p>
        </GlassCard>
        <GlassCard as="article" className="info-chip">
          <span className="icon-circle">
            <ClockIcon />
          </span>
          <h3>Lead Time</h3>
          <p>Standard cakes: 24–48 hours. Custom projects: 3–5 days.</p>
        </GlassCard>
        <GlassCard as="article" className="info-chip">
          <span className="icon-circle">
            <CheckIcon />
          </span>
          <h3>Certified Kitchen</h3>
          <p>Premium ingredients, clean process, and strict QC handling.</p>
        </GlassCard>
      </div>
    </section>
  );
}
