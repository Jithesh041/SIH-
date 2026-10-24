"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const MicroSlats = dynamic(() => import("@/components/backgrounds/micro-slats"), { ssr: false });
const revealSelector = ".blur-reveal, .workspace-main h1, .workspace-main h2, .workspace-main h3";

export function GlobalEffects() {
  const pathname = usePathname();
  const isLanding = pathname === "/login" || pathname === "/";

  useEffect(() => {
    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("is-pending");
        entry.target.classList.add("is-visible");
        observer?.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }) : null;

    const reveal = (node: ParentNode) => {
      const elements: HTMLElement[] = [];
      if (node instanceof HTMLElement && node.matches(revealSelector)) elements.push(node);
      elements.push(...Array.from(node.querySelectorAll<HTMLElement>(revealSelector)));

      elements.forEach((element) => {
        if (element.dataset.blurReady) return;
        element.dataset.blurReady = "true";
        element.classList.add("blur-reveal");
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView || !observer) {
          element.classList.add("is-visible");
        } else {
          
          observer.observe(element);
        }
      });
    };

    reveal(document);
    const mutations = new MutationObserver((records) => records.forEach((record) => {
      record.addedNodes.forEach((node) => { if (node instanceof HTMLElement) reveal(node); });
    }));
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { mutations.disconnect(); observer?.disconnect(); };
  }, []);

  return <div className="global-effects" aria-hidden="true"><MicroSlats className="global-micro-slats" preset="tide" color={isLanding ? "#D99A28" : "#8B5CF6"} glintColor={isLanding ? "#F7E2A6" : "#E9D5FF"} backgroundColor="rgba(0, 0, 0, 0)" slatWidth={7} slatHeight={16} gap={3} speed={isLanding ? 0.16 : 0.22} scale={1.5} glint={0.28} fog={0.9} perspective={0.48} interactive cursorStrength={0.3} cursorSize={34} trail={1.1} lean={0.12} intro introDuration={1.5} /></div>;
}


