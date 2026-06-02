"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Particles = dynamic(() => import("./Particles"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
function getReducedMotionServer() {
  return false;
}

export default function ScrollScene({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  // Wait for video to have enough data to seek
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => setReady(true);

    if (v.readyState >= 1) onLoaded();
    else {
      v.addEventListener("loadedmetadata", onLoaded);
      v.addEventListener("canplay", onLoaded);
    }

    const fallback = window.setTimeout(onLoaded, 4000);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("canplay", onLoaded);
      window.clearTimeout(fallback);
    };
  }, []);

  // Scroll → currentTime
  useEffect(() => {
    if (!ready || reducedMotion) return;
    const container = containerRef.current;
    const video = videoRef.current;
    const aura = auraRef.current;
    if (!container || !video || !aura) return;

    const triggers: ScrollTrigger[] = [];
    const sections = gsap.utils.toArray<HTMLElement>("[data-section]");

    triggers.push(
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (!video.duration) return;
          const t = self.progress * video.duration;
          if (Math.abs(video.currentTime - t) > 0.01) {
            video.currentTime = t;
          }
        },
      }),
    );

    // Aura color shift per section
    sections.forEach((sec) => {
      const a1 = sec.dataset.aura1;
      const a2 = sec.dataset.aura2;
      if (!a1 || !a2) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: sec,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.to(aura, {
              "--aura-1": a1,
              "--aura-2": a2,
              duration: 1.2,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(aura, {
              "--aura-1": a1,
              "--aura-2": a2,
              duration: 1.2,
              ease: "power2.out",
            });
          },
        }),
      );
    });

    // Content reveals
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        opacity: 0,
        y: 18,
        duration: 1.1,
        stagger: 0.12,
        delay: 0.3,
        ease: "power3.out",
      });

      sections.forEach((sec) => {
        if (sec.dataset.section === "hero") return;
        const children = Array.from(
          sec.querySelectorAll(":scope > div > *"),
        ) as HTMLElement[];
        gsap.from(children, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 70%" },
        });
      });
    }, container);

    return () => {
      triggers.forEach((t) => t.kill());
      ctx.revert();
    };
  }, [ready, reducedMotion]);

  return (
    <>
      {!reducedMotion && <Particles />}

      <div ref={auraRef} className="character-aura" aria-hidden />
      <div className="character-halo" aria-hidden />

      <div className="character-stage">
        <video
          ref={videoRef}
          muted
          playsInline
          {...({ "webkit-playsinline": "true" } as Record<string, string>)}
          preload="auto"
          poster="/images/scene-poster.jpg"
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/videos/scene-mobile.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
          <source src="/videos/scene.mp4" type="video/mp4" />
        </video>
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center text-[#00E5FF]/80 font-mono text-xs tracking-widest">
            LOADING…
          </div>
        )}
      </div>

      <div className="vignette" aria-hidden />
      <div className="grain" aria-hidden />

      <div ref={containerRef} className="relative z-10 flex flex-col">
        {children}
      </div>
    </>
  );
}
