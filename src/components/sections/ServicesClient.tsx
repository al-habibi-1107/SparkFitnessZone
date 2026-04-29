"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ServiceCardData = {
  num: string;
  imageUrl: string;
  name: string;
  desc: string;
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function ServicesClient({ services }: { services: ServiceCardData[] }) {
  return (
    <section id="services" className="bg-black">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="flex justify-between items-end gap-8 flex-wrap mb-16">

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-[0.6rem] mb-3">
              <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
              <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                What We Offer
              </span>
            </div>
            <h2
              className="font-display leading-none tracking-[0.03em] text-white"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
            >
              OUR<br />
              <span className="text-dark-gray">PROGRAMMES</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-body text-[1rem] font-light leading-[1.75] text-offwhite max-w-[520px] mb-0"
          >
            Structured programmes designed for every goal — whether you want to
            lose fat, build muscle, balance your hormones, or simply eat better.
          </motion.p>
        </div>

        {/* ── 2×2 card grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-dark-gray">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Service card ──────────────────────────────────────────────────────────────

function ServiceCard({ service, delay }: { service: ServiceCardData; delay: number }) {
  const lines = service.name.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="group relative bg-charcoal overflow-hidden cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-300"
    >
      {/* Ghost order number */}
      <span
        aria-hidden="true"
        className="absolute top-6 right-6 font-display text-[5rem] leading-none tracking-[-0.02em] pointer-events-none select-none transition-colors duration-300 text-white/[0.04] group-hover:text-red/[0.08]"
      >
        {service.num}
      </span>

      {/* ── Card image ──────────────────────────────────────────── */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={lines.join(" ")}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.55) 100%)",
          }}
        />
      </div>

      {/* ── Card content ────────────────────────────────────────── */}
      <div className="px-10 pt-8 pb-12">
        <div className="font-display text-[2.2rem] leading-[1.05] tracking-[0.04em] text-white mb-3">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </div>

        <p className="font-body text-[0.9rem] font-light text-gray leading-[1.7] mb-6">
          {service.desc}
        </p>

        <a
          href="/book"
          className="inline-flex items-center gap-2 group-hover:gap-[0.9rem] font-condensed text-[0.75rem] tracking-[0.18em] uppercase text-red transition-[gap] duration-200"
        >
          Enquire Now
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[0.4s] ease-out"
      />
    </motion.div>
  );
}
