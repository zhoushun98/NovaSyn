"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("/en");
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg)] px-6 py-20 text-[var(--fg)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(124,170,255,0.2),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_50%_120%,rgba(83,113,195,0.18),transparent_34%)]" />
      <section className="relative w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[rgba(6,10,20,0.72)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-12">
        <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.055] px-3.5 py-1.5 text-[0.66rem] font-semibold tracking-[0.34em] text-white/58 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          Clarionis 明谛
        </span>
        <h1 className="mt-6 text-4xl leading-tight tracking-[-0.05em] text-white md:text-6xl">
          Redirecting to English.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
          If the site does not continue automatically, use the link below to enter the English experience.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/en"
            className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[var(--accent-soft)]"
          >
            Continue to English
          </Link>
        </div>
      </section>
    </main>
  );
}
