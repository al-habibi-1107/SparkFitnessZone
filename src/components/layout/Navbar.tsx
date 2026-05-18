"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoImage from "@/components/ui/LogoImage";

const NAV_LINKS = [
  { label: "About",     href: "#about"     },
  { label: "Services",  href: "#services"  },
  { label: "Trainers",  href: "#trainers"  },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "flex items-center justify-between",
          "h-[72px] px-[5vw]",
          "transition-[background,backdrop-filter,border-color] duration-300",
          scrolled
            ? "bg-black/[0.97] backdrop-blur-[20px] border-b border-white/[0.06]"
            : "bg-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          onClick={closeMobileMenu}
        >
          <LogoImage size={32} />
          <span className="font-display text-[1.55rem] leading-none tracking-[0.06em] text-white">
            spark<span style={{ color: "#D62828" }}>fitness zone</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.3, duration: 0.35, ease: "easeOut" }}
              className="font-condensed text-[0.85rem] tracking-[0.12em] uppercase text-white/70 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * NAV_LINKS.length + 0.3, duration: 0.35, ease: "easeOut" }}
          >
            <a
              href="#membership"
              className="font-condensed text-[0.8rem] tracking-[0.14em] uppercase px-5 py-[9px] text-white hover:-translate-y-px transition-transform duration-200 inline-block"
              style={{ backgroundColor: "#D62828" }}
            >
              Join Now
            </a>
          </motion.div>
        </div>

        {/* Hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-[6px] cursor-pointer"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-6 h-[2px] bg-white origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-[2px] bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-6 h-[2px] bg-white origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-[72px] left-0 right-0 z-40 flex flex-col gap-6 px-[5vw] py-8 bg-black/[0.97] backdrop-blur-[20px] border-b border-white/[0.06] md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="font-condensed text-[1rem] tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#membership"
              onClick={closeMobileMenu}
              className="font-condensed text-[0.85rem] tracking-[0.14em] uppercase px-6 py-[10px] text-white text-center hover:opacity-90 transition-opacity duration-200 inline-block mt-2"
              style={{ backgroundColor: "#D62828" }}
            >
              Join Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
