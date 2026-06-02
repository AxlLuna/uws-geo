export default function CtaSection() {
  return (
    <section
      data-section="cta"
      data-aura-1="0, 229, 255"
      data-aura-2="123, 47, 255"
      className="stage-section relative w-full"
    >
      <div className="stage-content flex flex-col gap-7">
        <div className="caption">The diagnostic</div>

        <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] text-glow">
          Is your site
          <br />
          <span className="text-gradient">ready for AI?</span>
        </h2>

        <p className="text-base md:text-lg text-white/60 max-w-md leading-relaxed">
          Measure your GEO score in <span className="text-white">60 seconds</span>{" "}
          with Is It Agent Ready — you&apos;ll know exactly what&apos;s missing
          for AI to start talking about you.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://isitagentready.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-[#7B2FFF] via-[#B066FF] to-[#00E5FF] text-white font-medium text-base hover:scale-[1.02] transition-all shadow-[0_0_60px_rgba(123,47,255,0.5)]"
          >
            Run the diagnostic
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-1 mt-6 pt-6 border-t border-white/5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            Presented by urvenue
          </p>
          <p className="text-xs text-white/30">
            Technology for experiences you don&apos;t forget · © 2026
          </p>
        </div>
      </div>
    </section>
  );
}
