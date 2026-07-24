import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — 16px circle that lerps toward the pointer, growing to
 * 44px + amber fill on hover of interactive elements. Uses
 * mix-blend-mode: difference to stay visible on all backgrounds.
 *
 * Returns null on touch/coarse-pointer devices to avoid a phantom circle.
 * Sets body[data-custom-cursor="true"] when active so CSS can apply
 * cursor:none globally.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [canRender, setCanRender] = useState(false);

  // Detect whether we should render at all (no touch, fine pointer)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanRender(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanRender(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Toggle body attribute
  useEffect(() => {
    if (canRender) {
      document.body.setAttribute("data-custom-cursor", "true");
    } else {
      document.body.removeAttribute("data-custom-cursor");
    }
    return () => document.body.removeAttribute("data-custom-cursor");
  }, [canRender]);

  // Mouse move tracking
  useEffect(() => {
    if (!canRender) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [canRender, visible]);

  // Hover detection on interactive elements
  useEffect(() => {
    if (!canRender) return;

    const selector = 'a, button, .card, [data-hover]';

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const attach = () => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    // Initial attach + observe DOM changes
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      document.querySelectorAll(selector).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [canRender]);

  // Animation loop — lerp position
  useEffect(() => {
    if (!canRender) return;

    let raf: number;
    const LERP = 0.2;

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * LERP;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * LERP;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [canRender]);

  if (!canRender) return null;

  const size = hovering ? 44 : 16;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        background: hovering ? "var(--amber)" : "var(--cream)",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "width 0.25s ease, height 0.25s ease, background 0.25s ease, opacity 0.2s ease",
        willChange: "transform",
      }}
    />
  );
}
