"use client";

export default function ManifestoSection() {
  return (
    <section
      data-section="manifesto"
      data-aura-1="176, 102, 255"
      data-aura-2="255, 61, 240"
      className="stage-section relative w-full"
    >
      <div className="stage-content flex flex-col gap-8">
        <div className="caption">El cambio silencioso</div>

        <h2 className="font-display text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[0.95] text-glow">
          <span className="text-white/40">El SEO</span>
          <br />
          <span className="text-white/40">optimiza para</span>{" "}
          <span className="text-white">Google.</span>
          <br />
          <span className="text-gradient">GEO optimiza</span>
          <br />
          <span className="text-gradient">para la IA.</span>
        </h2>

        <div className="flex items-baseline gap-5 py-2">
          <div className="font-display text-6xl md:text-7xl text-white leading-none">
            40<span className="text-[#00E5FF]">%</span>
          </div>
          <p className="text-white/55 text-sm md:text-base leading-snug max-w-[200px]">
            de las búsquedas en Google ya{" "}
            <span className="text-white/90">terminan sin un clic.</span>
          </p>
        </div>

        <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-md">
          GEO estructura tu contenido, datos y señales técnicas para que los
          modelos de lenguaje te{" "}
          <span className="text-white">encuentren, entiendan y recomienden</span>{" "}
          — antes que a cualquier otro.
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-md mt-2">
          {[
            ["llms.txt", "Índice para LLMs"],
            ["robots", "Permisos para crawlers IA"],
            ["markdown", "Contenido limpio"],
            ["velocidad", "< 200ms response"],
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
