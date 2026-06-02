export default function HeroSection() {
  return (
    <section
      data-section="hero"
      data-aura-1="0, 229, 255"
      data-aura-2="123, 47, 255"
      className="stage-section relative w-full"
    >
      <div className="stage-content flex flex-col items-start gap-7 hero-content">
        <div className="caption">Vibe · GEO Protocol v1</div>

        <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.92] text-glow">
          Does your
          <br />
          business exist
          <br />
          <span className="text-gradient">for artificial</span>
          <br />
          <span className="text-gradient">intelligence?</span>
        </h1>

        <p className="text-base md:text-lg text-white/55 max-w-md leading-relaxed">
          When someone asks ChatGPT, Claude, or Perplexity about your industry —{" "}
          <span className="text-white/90">do you show up, or your competition?</span>
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-2">
          <a
            href="https://isitagentready.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-fit items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
          >
            Get your score
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
            60 sec · free
          </span>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-white/40 z-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          scroll
        </span>
        <div className="animate-bounce-down text-white/60 text-sm">↓</div>
      </div>
    </section>
  );
}
