"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import { useGesture } from "@use-gesture/react";

declare global {
  interface Window {
    __closeDomeGalleryItem?: () => void;
  }
}

type CustomCSSProperties = React.CSSProperties &
  Record<string, string | number | undefined>;

// Extended type to include image metadata
type ImageItem =
  | string
  | { src: string; alt?: string; category?: string; description?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
};

type ItemDef = {
  src: string;
  alt: string;
  category: string;
  description: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULTS = {
  maxVerticalRotationDeg: 0,
  dragSensitivity: 22,
  enlargeTransitionMs: 400,
  segments: 28,
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

// Helper: Two-tier Next.js image optimization URL generator
const getOptimizedThumbUrl = (src: string) => {
  if (!src) return "";
  try {
    const clean = decodeURIComponent(src);
    return `/_next/image?url=${encodeURIComponent(clean)}&w=384&q=60`;
  } catch {
    return `/_next/image?url=${encodeURIComponent(src)}&w=384&q=60`;
  }
};

const getOptimizedLightboxUrl = (src: string) => {
  if (!src) return "";
  try {
    const clean = decodeURIComponent(src);
    return `/_next/image?url=${encodeURIComponent(clean)}&w=1200&q=80`;
  } catch {
    return `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=80`;
  }
};

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const startX = -Math.floor(seg) - 1;
  const xCols = Array.from({ length: seg }, (_, i) => startX + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map((c) => ({
      ...c,
      src: "",
      alt: "",
      category: "",
      description: "",
    }));
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") {
      return { src: image, alt: "", category: "", description: "" };
    }
    return {
      src: image.src || "",
      alt: image.alt || "",
      category: image.category || "",
      description: image.description || "",
    };
  });

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length],
  );

  // De-duplicate adjacent identical images where possible
  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
    category: usedImages[i].category,
    description: usedImages[i].description,
  }));
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number,
) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({
  images = [],
  fit = 0.8,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#060010",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = false,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef<"mouse" | "pen" | "touch">("mouse");
  const tapTargetRef = useRef<HTMLElement | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);
  const scrollLockedRef = useRef(false);

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, []);

  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
    scrollLockedRef.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translate3d(0, 0, calc(var(--radius) * -1)) rotateX(${xDeg.toFixed(2)}deg) rotateY(${yDeg.toFixed(2)}deg)`;
    }
  }, []);

  const lockedRadiusRef = useRef<number | null>(null);

  // Synchronous initial measurement + Debounced ResizeObserver
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measureAndApply = (w: number, h: number) => {
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = w;
          break;
        case "height":
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
      root.style.setProperty("--viewer-pad", `${viewerPad}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      root.style.setProperty(
        "--image-filter",
        grayscale ? "grayscale(1)" : "none",
      );
      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const enlargedOverlay = viewerRef.current?.querySelector(
        ".enlarge",
      ) as HTMLElement;
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();
        enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
        enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
        enlargedOverlay.style.width = `${frameR.width}px`;
        enlargedOverlay.style.height = `${frameR.height}px`;
      }
    };

    // 1. Synchronous initial measurement on mount to prevent layout shift
    const initialRect = root.getBoundingClientRect();
    if (initialRect.width > 0 && initialRect.height > 0) {
      measureAndApply(initialRect.width, initialRect.height);
    }

    // 2. Mark data-ready in next RAF so CSS transitions only activate after stable layout
    requestAnimationFrame(() => {
      root.setAttribute("data-ready", "true");
    });

    // 3. Debounced observer for subsequent window resizing
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver((entries) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const cr = entries[0].contentRect;
        const w = Math.max(1, cr.width);
        const h = Math.max(1, cr.height);
        measureAndApply(w, h);
      }, 50);
    });
    ro.observe(root);

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    applyTransform,
  ]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform],
  );

  const openItemFromElement = useCallback((el: HTMLElement) => {
    if (openingRef.current) return;
    openingRef.current = true;
    openStartedAtRef.current = performance.now();
    lockScroll();

    const parent = el.parentElement as HTMLElement;
    focusedElRef.current = el;
    el.setAttribute("data-focused", "true");

    const rawSrc =
      parent.dataset.src ||
      (el.querySelector("img") as HTMLImageElement)?.dataset.rawSrc ||
      (el.querySelector("img") as HTMLImageElement)?.src ||
      "";
    const rawAlt =
      parent.dataset.alt ||
      (el.querySelector("img") as HTMLImageElement)?.alt ||
      "";

    const offsetX = getDataNumber(parent, "offsetX", 0);
    const offsetY = getDataNumber(parent, "offsetY", 0);
    const sizeX = getDataNumber(parent, "sizeX", 2);
    const sizeY = getDataNumber(parent, "sizeY", 2);
    const parentRot = computeItemBaseRotation(
      offsetX,
      offsetY,
      sizeX,
      sizeY,
      segments,
    );

    let rotY = -(
      (normalizeAngle(parentRot.rotateY) +
        normalizeAngle(rotationRef.current.y)) %
      360
    );
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - rotationRef.current.x;

    parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
    parent.style.setProperty("--rot-x-delta", `${rotX}deg`);

    const refDiv = document.createElement("div");
    refDiv.className = "item__image item__image--reference opacity-0";
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);
    void refDiv.offsetHeight;

    const tileR = refDiv.getBoundingClientRect();
    const mainR = mainRef.current?.getBoundingClientRect();
    const frameR = frameRef.current?.getBoundingClientRect();

    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
      openingRef.current = false;
      focusedElRef.current = null;
      parent.removeChild(refDiv);
      unlockScroll();
      return;
    }

    originalTilePositionRef.current = {
      left: tileR.left,
      top: tileR.top,
      width: tileR.width,
      height: tileR.height,
    };
    el.style.visibility = "hidden";

    const overlay = document.createElement("div");
    overlay.className = "enlarge";
    overlay.style.cssText = `position:absolute; left:${frameR.left - mainR.left}px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${frameR.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 30px 100px rgba(0,0,0,0.6); cursor: default;`;

    // Glassmorphism close button
    const closeBtn = document.createElement("button");
    closeBtn.onclick = () => window.__closeDomeGalleryItem?.();
    closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
    closeBtn.style.cssText = `position:absolute; top:24px; right:24px; width:44px; height:44px; background:rgba(0,0,0,0.6); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; cursor:pointer; z-index:40; opacity:0; transition:opacity 0.3s ease, transform 0.2s ease; transform:scale(0.9);`;
    closeBtn.onmouseover = () => (closeBtn.style.transform = "scale(1.08)");
    closeBtn.onmouseout = () => (closeBtn.style.transform = "scale(1)");

    const img = document.createElement("img");
    img.src = getOptimizedLightboxUrl(rawSrc);
    img.onerror = () => {
      // Fallback to raw path if next/image route has issue
      img.src = rawSrc;
    };
    img.alt = rawAlt;
    img.style.cssText = `width:100%; height:100%; object-fit:contain; background-color: rgba(6,0,16,0.95); filter:${grayscale ? "grayscale(1)" : "none"}; pointer-events: none;`;

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);

    viewerRef.current!.appendChild(overlay);

    const validSx0 = Math.max(tileR.width / frameR.width, 0.01);
    const validSy0 = Math.max(tileR.height / frameR.height, 0.01);

    overlay.style.transform = `translate(${tileR.left - frameR.left}px, ${tileR.top - frameR.top}px) scale(${validSx0}, ${validSy0})`;

    setTimeout(() => {
      if (!overlay.parentElement) return;
      overlay.style.opacity = "1";
      overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
      closeBtn.style.opacity = "1";
      closeBtn.style.transform = "scale(1)";
      rootRef.current?.setAttribute("data-enlarging", "true");
    }, 16);
  }, [enlargeTransitionMs, grayscale, lockScroll, openedImageBorderRadius, segments, unlockScroll]);

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        const evt = event as PointerEvent;
        const pType = evt.pointerType;
        pointerTypeRef.current =
          pType === "touch" || pType === "pen" ? pType : "mouse";
        if (pointerTypeRef.current === "touch") evt.preventDefault();
        if (pointerTypeRef.current === "touch") lockScroll();
        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        const potential = (evt.target as Element).closest?.(
          ".item__image",
        ) as HTMLElement | null;
        tapTargetRef.current = potential || null;
      },
      onDrag: ({
        event,
        last,
        velocity: velArr = [0, 0],
        direction: dirArr = [0, 0],
        movement,
      }) => {
        if (
          focusedElRef.current ||
          !draggingRef.current ||
          !startPosRef.current
        )
          return;
        const evt = event as PointerEvent;
        if (pointerTypeRef.current === "touch") evt.preventDefault();
        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        if (
          rotationRef.current.x !== nextX ||
          rotationRef.current.y !== nextY
        ) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;
          let isTap = false;
          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x;
            const dy = evt.clientY - startPosRef.current.y;
            if (
              dx * dx + dy * dy <=
              (pointerTypeRef.current === "touch" ? 100 : 36)
            )
              isTap = true;
          }

          let vx = velArr[0] * dirArr[0];
          let vy = velArr[1] * dirArr[1];

          if (
            !isTap &&
            Math.abs(vx) < 0.001 &&
            Math.abs(vy) < 0.001 &&
            Array.isArray(movement)
          ) {
            vx = (movement[0] / dragSensitivity) * 0.02;
            vy = (movement[1] / dragSensitivity) * 0.02;
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005))
            startInertia(vx, vy);

          startPosRef.current = null;
          cancelTapRef.current = !isTap;

          if (isTap && tapTargetRef.current && !focusedElRef.current)
            openItemFromElement(tapTargetRef.current);
          tapTargetRef.current = null;

          if (cancelTapRef.current)
            setTimeout(() => (cancelTapRef.current = false), 120);
          if (pointerTypeRef.current === "touch") unlockScroll();
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } },
  );

  // Scrim & Close handler
  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement as HTMLElement;
      const overlay = viewerRef.current?.querySelector(
        ".enlarge",
      ) as HTMLElement | null;
      if (!overlay) return;

      const refDiv = parent.querySelector(
        ".item__image--reference",
      ) as HTMLElement | null;
      const originalPos = originalTilePositionRef.current;

      if (!originalPos) {
        overlay.remove();
        if (refDiv) refDiv.remove();
        parent.style.setProperty("--rot-y-delta", `0deg`);
        parent.style.setProperty("--rot-x-delta", `0deg`);
        el.style.visibility = "";
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-enlarging");
        openingRef.current = false;
        return;
      }

      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current!.getBoundingClientRect();

      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height,
      };
      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height,
      };

      const animatingOverlay = document.createElement("div");
      animatingOverlay.className = "enlarge-closing";
      animatingOverlay.style.cssText = `position: absolute; left: ${overlayRelativeToRoot.left}px; top: ${overlayRelativeToRoot.top}px; width: ${overlayRelativeToRoot.width}px; height: ${overlayRelativeToRoot.height}px; z-index: 9999; border-radius: ${openedImageBorderRadius}; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,.35); transition: all ${enlargeTransitionMs}ms cubic-bezier(0.22, 1, 0.36, 1); pointer-events: none; margin: 0; transform: none; filter: ${grayscale ? "grayscale(1)" : "none"};`;

      const originalImg = overlay.querySelector("img");
      if (originalImg) {
        const img = originalImg.cloneNode() as HTMLImageElement;
        img.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
        animatingOverlay.appendChild(img);
      }

      overlay.remove();
      rootRef.current!.appendChild(animatingOverlay);
      void animatingOverlay.getBoundingClientRect();

      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + "px";
        animatingOverlay.style.top = originalPosRelativeToRoot.top + "px";
        animatingOverlay.style.width = originalPosRelativeToRoot.width + "px";
        animatingOverlay.style.height = originalPosRelativeToRoot.height + "px";
        animatingOverlay.style.opacity = "0";
      });

      const cleanup = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;
        if (refDiv) refDiv.remove();
        parent.style.transition = "none";
        el.style.transition = "none";
        parent.style.setProperty("--rot-y-delta", `0deg`);
        parent.style.setProperty("--rot-x-delta", `0deg`);
        requestAnimationFrame(() => {
          el.style.visibility = "";
          el.style.opacity = "0";
          focusedElRef.current = null;
          rootRef.current?.removeAttribute("data-enlarging");
          requestAnimationFrame(() => {
            parent.style.transition = "";
            el.style.transition = "opacity 250ms ease-out";
            requestAnimationFrame(() => {
              el.style.opacity = "1";
              setTimeout(() => {
                el.style.transition = "";
                el.style.opacity = "";
                openingRef.current = false;
                if (
                  !draggingRef.current &&
                  rootRef.current?.getAttribute("data-enlarging") !== "true"
                )
                  document.body.classList.remove("dg-scroll-lock");
              }, 250);
            });
          });
        });
      };

      animatingOverlay.addEventListener("transitionend", cleanup, {
        once: true,
      });
    };

    scrim.addEventListener("click", close);
    window.__closeDomeGalleryItem = close;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      scrim.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
      delete window.__closeDomeGalleryItem;
    };
  }, [enlargeTransitionMs, openedImageBorderRadius, grayscale]);

  const cssStyles = `
    .sphere-root {
      --radius: ${minRadius}px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14159);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
      contain: layout paint style;
    }
    .sphere-root * { box-sizing: border-box; }
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
      contain: strict;
    }
    .sphere {
      transform-style: preserve-3d;
      transform: translate3d(0, 0, calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    .sphere-item {
      transform-style: preserve-3d;
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: none;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg)))
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg)))
                 translateZ(var(--radius));
    }
    .sphere-root[data-ready="true"] .sphere-item {
      transition: transform 250ms ease-out;
    }
    .sphere-root[data-enlarging="true"] .scrim {
      opacity: 1 !important;
      pointer-events: all !important;
    }
    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: zoom-in;
      backface-visibility: hidden;
      pointer-events: auto;
      contain: paint;
      transition: transform 200ms ease-out, box-shadow 200ms ease-out;
    }
    .item__image:hover {
      transform: scale(1.06);
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      z-index: 10;
    }
    .item__image--reference {
      position: absolute;
      inset: 10px;
      pointer-events: none;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="sphere-root relative w-full h-full"
        style={
          {
            "--segments-x": segments,
            "--segments-y": segments,
            "--overlay-blur-color": overlayBlurColor,
            "--tile-radius": imageBorderRadius,
            "--enlarge-radius": openedImageBorderRadius,
            "--image-filter": grayscale ? "grayscale(1)" : "none",
          } as CustomCSSProperties
        }
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{ touchAction: "none", WebkitUserSelect: "none" }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={
                    {
                      "--offset-x": it.x,
                      "--offset-y": it.y,
                      "--item-size-x": it.sizeX,
                      "--item-size-y": it.sizeY,
                      top: "-999px",
                      bottom: "-999px",
                      left: "-999px",
                      right: "-999px",
                    } as CustomCSSProperties
                  }
                >
                  <div
                    className="item__image absolute block overflow-hidden cursor-pointer bg-gray-900"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      if (
                        !draggingRef.current &&
                        !movedRef.current &&
                        performance.now() - lastDragEndAt.current >= 80 &&
                        !openingRef.current
                      )
                        openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    onPointerUp={(e) => {
                      if (
                        (e.nativeEvent as PointerEvent).pointerType ===
                          "touch" &&
                        !draggingRef.current &&
                        !movedRef.current &&
                        performance.now() - lastDragEndAt.current >= 80 &&
                        !openingRef.current
                      )
                        openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    style={{
                      inset: "10px",
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getOptimizedThumbUrl(it.src)}
                      data-raw-src={it.src}
                      draggable={false}
                      alt={it.alt}
                      decoding="async"
                      loading={i < 36 ? "eager" : "lazy"}
                      fetchPriority={i < 16 ? "high" : "low"}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = "true";
                          target.src = it.src;
                        } else {
                          target.style.display = "none";
                        }
                      }}
                      className="w-full h-full object-cover pointer-events-none"
                      style={{
                        backfaceVisibility: "hidden",
                        filter: `var(--image-filter, ${grayscale ? "grayscale(1)" : "none"})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`,
            }}
          />
          <div
            className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
            }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
            }}
          />
          <div
            ref={viewerRef}
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            style={{ padding: "var(--viewer-pad)" }}
          >
            <div
              ref={scrimRef}
              className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-300"
              style={{
                background: "rgba(0, 0, 0, 0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            />
            <div
              ref={frameRef}
              className="viewer-frame w-[90vw] max-w-6xl h-[85vh] max-h-[900px] flex will-change-transform"
              style={{
                borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})`,
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
}
