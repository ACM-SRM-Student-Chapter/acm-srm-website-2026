# Gallery Performance & 404 Remediation Plan (`plan.md`)

## 1. Executive Summary & Root-Cause Diagnosis
The `/gallery` route (`https://www.acmsrm.in/gallery`) suffers from severe render lag, an "earthquake" layout jump on initial mount, frame drops during drag/scroll inertia, and 40+ console 404 errors caused by six compounded engineering bottlenecks:

1. **404 Network Flood via OCR Filename Typos:** In `RECRUITMENT_IMAGES` (`src/app/gallery/page.tsx`), 11 sequential files (`i2.jpeg`, `i4.jpeg`, `i6.jpeg`, `i7.jpeg`, `i10.jpeg`, `i12.jpeg`, `i15.jpeg`, `i16.jpeg`, `i18.jpeg`, `i20.jpeg`, `i26.jpeg`) were mistyped with a leading digit `1` (`12.jpeg`, `14.jpeg`, `16.jpeg`, `17.jpeg`, `110.jpeg`, `112.jpeg`, `115.jpeg`, `116.jpeg`, `118.jpeg`, `120.jpeg`, `126.jpeg`). Because `buildItems()` cycles through the image pool to populate all dome tiles, each broken path fires multiple failed HTTP requests.
2. **Unsupported `.HEIC` Containers in Web Browsers:** 21 files in `PROMPTWARS_IMAGES` (`IMG_0364.HEIC` through `IMG_4147.HEIC`) use Apple's `.HEIC` format, which Chromium/Gecko browsers cannot decode natively.
3. **Unoptimized 4K Originals Loaded into Tiny 3D Tiles:** `DomeGallery.tsx` renders raw `<img src={it.src} />` tags instead of Next.js optimized thumbnails. This forces the client to download and decode ~170 full-resolution DSLR/smartphone photos (~3–8 MB each = >500 MB of raw bitmap memory) on initial load. Moreover, because `.sphere-item` uses `top: -999px; bottom: -999px; left: -999px; right: -999px; margin: auto;` inside a 3D perspective stage, native `loading="lazy"` fails to defer offscreen tiles and fetches every image immediately.
4. **"Earthquake" Mount Jitter:** `.sphere-root` initializes with `--radius: 520px` while `.sphere-item` has `transition: transform 300ms` active from frame 1. `50ms` later, the debounced `ResizeObserver` computes the real radius (`600px+`), triggering a simultaneous 3D outward explosion of 170 tiles at the exact same moment the outer wrapper animates `y: 40 -> 0`.
5. **GPU Layer & VRAM Explosion:** `segments={34}` creates `34 × 5 = 170` 3D tiles, each with `transform-style: preserve-3d` and `will-change-transform`, generating 340+ separate GPU compositor layers.
6. **Software Compositor Readbacks from `CustomCursor.tsx`:** `mix-blend-difference` on the global cursor forces full-viewport software blending over the 3D CSS stage on every mouse move, while a `useEffect` dependency on `isVisible` re-binds listeners unnecessarily.
7. **Footer Prefetch 404s:** Links to `/terms` and `/privacy` trigger Next.js automatic route prefetch 404s if those routes do not exist yet.

---

## 2. Phase-by-Phase Execution Roadmap

### Phase 1: Asset Sanitization & Disk-to-Code Audit
**Goal:** Eliminate every 404 error, convert unreadable `.HEIC` images to `.jpg`, and guarantee 100% case-sensitive filename parity between `/public/Gallery` and `src/app/gallery/page.tsx` for Linux (Vercel) deployments.

1. **Convert `.HEIC` to `.jpg`:**
   Run in `/Users/mdnm18/College Clubs/ACM/acm-srmist-web/public/Gallery/PromptWars`:
   ```bash
   for f in *.HEIC *.heic; do
     [ -e "$f" ] || continue
     sips -s format jpeg "$f" --out "${f\%.*}.jpg" && rm "$f"
   done
2. Verify All Asset Paths on Disk:
Run a verification script checking every file in public/Gallery/Recruitment, public/Gallery/PromptWars, public/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI, and public/Gallery/Team_Moments against the arrays in src/app/gallery/page.tsx:
Fix the 11 1x.jpeg → ix.jpeg typos (12.jpeg → i2.jpeg, 14.jpeg → i4.jpeg, 16.jpeg → i6.jpeg, 17.jpeg → i7.jpeg, 110.jpeg → i10.jpeg, 112.jpeg → i12.jpeg, 115.jpeg → i15.jpeg, 116.jpeg → i16.jpeg, 118.jpeg → i18.jpeg, 120.jpeg → i20.jpeg, 126.jpeg → i26.jpeg).
Verify whether fdhf].jpeg exists literally on disk or should be corrected/removed.
Update all .HEIC references in PROMPTWARS_IMAGES to .jpg.
Eliminate /terms & /privacy 404 Prefetch Errors:
Locate <Link href="/terms"> and <Link href="/privacy"> in the global Footer/Navbar components and either add prefetch={false} or create placeholder legal pages (src/app/terms/page.tsx and src/app/privacy/page.tsx).
Phase 2: Two-Tier Image Optimization Pipeline (DomeGallery.tsx)
Goal: Cut initial network payload by >95% (from ~500 MB down to ~3.5 MB) and prevent main-thread image decode stalls.
Thumbnail Pipeline for 3D Sphere Tiles:
Create helper getOptimizedThumbUrl(src: string) that transforms local /Gallery/... paths into Next.js Image Optimization URLs:
/_next/image?url=${encodeURIComponent(decodeURIComponent(src))}&w=384&q=60
Each tile downloads a ~15–25 KB WebP image instead of a multi-megabyte camera original.
High-Resolution Pipeline for Lightbox Enlargement:
Store the original it.src in data-src on .sphere-item.
When openItemFromElement triggers on tap/click, load /_next/image?url=${encodeURIComponent(decodeURIComponent(rawSrc))}&w=1200&q=80 inside the .enlarge overlay so full-screen inspection remains razor-sharp without freezing the browser.
Resilient Fallback Handler:
Add an onError handler on tile <img> elements: if /_next/image fails (e.g., on unconfigured external URLs), fall back once to it.src; if it.src also fails, hide the broken icon cleanly (target.style.display = "none") so zero broken-image icons ever appear.
Priority Loading Partitioning:
Set loading={i < 36 ? "eager" : "lazy"} and fetchPriority={i < 16 ? "high" : "low"} with decoding="async" so the front-facing hemisphere paints immediately while back-facing tiles load asynchronously.
Phase 3: Eliminating the "Earthquake" Mount Jitter (DomeGallery.tsx & page.tsx)
Goal: Achieve an instantaneous, rock-solid first paint with zero radius snapping or vertical container collisions.
Synchronous Initial Radius Measurement:
Extract measureAndApplySize(w, h) inside DomeGallery.tsx and call it synchronously inside useEffect via root.getBoundingClientRect() before the first browser paint completes, setting --radius directly to the computed value (minRadius fallback in initial CSS instead of hardcoded 520px).
Gated CSS Transitions (data-ready):
Keep transition: transform disabled on .sphere-item until requestAnimationFrame(() => setIsReady(true)) fires after initial geometry lock. This completely eliminates the 170-tile outward "earthquake" snap on mount.
Remove Competing Outer Transform Animations:
In src/app/gallery/page.tsx, remove initial={{ opacity: 0, y: 40 }} from the DomeGallery wrapper container so the 3D perspective origin does not shift vertically while the sphere initializes.
Phase 4: GPU Compositor & Scroll/Drag Physics Tuning (DomeGallery.tsx)
Goal: Lock frame rates at 60–120 FPS during drag, inertia spin, and page scrolling.
Reduce Tile Count & Compositor Layer Overhead:
Change segments from 34 to 28 (28 × 5 = 140 tiles instead of 170 tiles) and adjust xCols start offset dynamically (-Math.floor(seg) - 1) so the sphere stays seamlessly closed with 18% fewer DOM nodes.
Remove transform-style: preserve-3d and will-change-transform from .item__image (keep preserve-3d and will-change: transform strictly on .sphere).
Add CSS containment (contain: layout paint style on .sphere-root, contain: strict on .stage, and contain: paint on .item__image) so browser layout/paint recalculations inside the sphere never leak to the rest of the page.
Hardware-Accelerated Transform Strings:
Replace translateZ(...) with translate3d(0, 0, calc(var(--radius) * -1)) and round rotation angles to 2 decimal places (xDeg.toFixed(2)) inside applyTransform to prevent sub-pixel style recalculation churn during inertia RAF loops.
Phase 5: Global Cursor & Page-Level Optimization (CustomCursor.tsx & page.tsx)
Goal: Eliminate full-screen software blending penalties across the entire site, especially over the 3D gallery.
Refactor src/components/ui/CustomCursor.tsx:
Remove mix-blend-difference (which forces Chromium/Safari to read back pixels from the 3D stage on every mouse move) and replace it with a lightweight translucent GPU-composited ring (border border-acm-electric/70 bg-acm-electric/10).
Replace useState(isVisible) with useMotionValue(0) (cursorOpacity) and isVisibleRef so mousemove never triggers React state updates or re-binds useEffect listeners.
Pass { passive: true } to window.addEventListener("mousemove", ...).
Clean Up src/app/gallery/page.tsx:
Remove unnecessary will-change-transform attributes from static header typography and filter wrappers so GPU memory is reserved exclusively for the 3D sphere.
3. Verification Checklist
[ ] Zero 404 errors in Browser DevTools Console on /gallery.
[ ] Zero .HEIC files remaining in public/Gallery/PromptWars; all 21 converted to .jpg and visible in the dome.
[ ] Network tab shows /_next/image?...&w=384&q=60 WebP thumbnails (~15–25 KB each) on initial load instead of multi-MB originals.
[ ] Zero visual jump / "earthquake" shake when /gallery first renders or when switching filter tabs (ALL, PromptWars, RECRUITMENT DRIVE 2026, SYMPOSIUM ON RESPONSIBLE AI, Team Moments).
[ ] Smooth 60fps+ drag, inertia spin, and vertical page scrolling with no main-thread long tasks (>50ms) in Performance profiler.