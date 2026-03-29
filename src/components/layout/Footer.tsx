import Link from "next/link";
import LogoImage from "@/components/ui/LogoImage";

// ── Data ─────────────────────────────────────────────────────────────────────

const PROGRAMMES = [
  { label: "Fat Loss",        href: "#services" },
  { label: "Bodybuilding",    href: "#services" },
  { label: "Hormone Therapy", href: "#services" },
  { label: "Custom Diet Plans", href: "#services" },
] as const;

const QUICK_LINKS = [
  { label: "About Us",     href: "#about" },
  { label: "Our Trainers", href: "#trainers" },
  { label: "Equipment",    href: "#equipment" },
  { label: "Membership",   href: "#membership" },
  { label: "Book a Trial", href: "/book" },
] as const;

const CONTACT = [
  {
    icon: "📍",
    text: "2nd & 3rd Floor, IOCL Petrol Pump, Shalimar Plaza, Chepapul, Mango, Jamshedpur — 832110",
  },
  { icon: "⏰", text: "5:00 AM – 11:00 PM, Every Day" },
] as const;

// ── Social icon paths ─────────────────────────────────────────────────────────

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon fill="currentColor" stroke="none" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-dark-gray">
      {/* 4-column grid */}
      <div className="max-w-[1320px] mx-auto px-[5vw] pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <LogoImage size={32} />
              <span className="font-display text-[2rem] leading-none tracking-[0.08em] text-white">
                SPARK<span className="text-red">FITNESS ZONE</span>
              </span>
            </Link>

            <p className="font-body text-[0.85rem] font-light leading-[1.7] text-gray max-w-[280px]">
              Jamshedpur&apos;s premier fitness centre — where serious athletes and
              first-timers alike come to transform. Open 7 days a week, 5 AM to 11 PM.
            </p>

            {/* Social buttons */}
            <div className="flex gap-3 mt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-dark-gray text-gray hover:border-red hover:text-red transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Programmes */}
          <FooterCol heading="Programmes">
            {PROGRAMMES.map((p) => (
              <FooterLink key={p.label} href={p.href}>{p.label}</FooterLink>
            ))}
          </FooterCol>

          {/* Col 3 — Quick Links */}
          <FooterCol heading="Quick Links">
            {QUICK_LINKS.map((l) => (
              <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
            ))}
          </FooterCol>

          {/* Col 4 — Contact */}
          <FooterCol heading="Contact">
            {CONTACT.map((c) => (
              <li
                key={c.icon}
                className="flex gap-2 items-start font-body text-[0.85rem] font-light text-gray leading-[1.65] py-[0.35rem]"
              >
                <span className="mt-[1px] shrink-0">{c.icon}</span>
                <span>{c.text}</span>
              </li>
            ))}
          </FooterCol>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-gray">
        <div className="max-w-[1320px] mx-auto px-[5vw] py-5 flex flex-col sm:flex-row justify-between items-center gap-3 flex-wrap">
          <p className="font-body text-[0.78rem] text-gray">
            © {year} Spark Fitness Zone. All rights reserved. Built with{" "}
            <span className="text-red">♥</span> in Jamshedpur.
          </p>
          <p className="font-condensed text-[0.68rem] tracking-[0.12em] uppercase text-dark-gray">
            Strength · Discipline · Results
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FooterCol({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-condensed text-[0.72rem] tracking-[0.2em] uppercase text-white mb-5">
        {heading}
      </h4>
      <ul className="list-none flex flex-col">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");
  const isAnchor   = href.startsWith("#");

  if (isAnchor) {
    return (
      <li>
        <a
          href={href}
          className="font-body text-[0.85rem] font-light text-gray hover:text-white transition-colors duration-200 py-[0.35rem] block"
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="font-body text-[0.85rem] font-light text-gray hover:text-white transition-colors duration-200 py-[0.35rem] block"
      >
        {children}
      </Link>
    </li>
  );
}

