export default function ManifestoSection() {
  return (
    <section
      data-section="manifesto"
      data-aura-1="176, 102, 255"
      data-aura-2="255, 61, 240"
      className="stage-section relative w-full"
    >
      <div className="stage-content flex flex-col gap-8">
        <div className="caption">The silent shift</div>

        <h2 className="font-display text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[0.95] text-glow">
          <span className="text-white/40">SEO</span>
          <br />
          <span className="text-white/40">optimizes for</span>{" "}
          <span className="text-white">Google.</span>
          <br />
          <span className="text-gradient">GEO optimizes</span>
          <br />
          <span className="text-gradient">for AI.</span>
        </h2>

        <div className="flex items-baseline gap-5 py-2">
          <div className="font-display text-6xl md:text-7xl text-white leading-none">
            40<span className="text-[#00E5FF]">%</span>
          </div>
          <p className="text-white/55 text-sm md:text-base leading-snug max-w-[200px]">
            of Google searches now{" "}
            <span className="text-white/90">end without a click.</span>
          </p>
        </div>

        <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-md">
          GEO structures your content, data, and technical signals so language
          models{" "}
          <span className="text-white">find, understand, and recommend you</span>{" "}
          — before anyone else.
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-md mt-2">
          {[
            ["llms.txt", "Index for LLMs"],
            ["robots", "AI crawler permissions"],
            ["markdown", "Clean content"],
            ["speed", "< 200ms response"],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#00E5FF]/80">
                {k}
              </span>
              <span className="text-sm text-white/70">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
