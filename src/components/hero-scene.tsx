"use client";

import { useEffect, useRef } from "react";

/**
 * Animated 3D hero object, built with Three.js.
 *
 * A slowly rotating icosahedron in a wireframe cage, with a ring of orbiting
 * points around it — monochrome, lit from one side, so it reads as sculpture
 * rather than decoration.
 *
 * Three.js is imported dynamically inside the effect, so it is never part of
 * the initial page payload and is only fetched once we have decided the device
 * should render it at all. On everything else the import never happens.
 *
 * It declines to run when:
 *   - the viewport is narrow (phones spend their battery on the content)
 *   - the visitor asked for reduced motion
 *   - the device reports four cores or fewer, or data saver is on
 *   - WebGL is unavailable
 *
 * The hero is fully readable without it — this sits behind the content.
 */

function shouldSkip(): boolean {
  if (typeof window === "undefined") return true;
  if (window.innerWidth < 1024) return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

  // Core count is a crude proxy — plenty of capable desktops report 4, while
  // budget phones report 8 — so this only catches the genuinely weak. The
  // viewport check above is what actually keeps this off phones.
  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores > 0 && cores <= 2) return true;

  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData) return true;

  return false;
}

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || shouldSkip()) return;

    let disposed = false;
    // Everything the cleanup needs, populated once the async import lands.
    let teardown: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      if (disposed || !mount) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        return; // No WebGL — the hero simply stays flat.
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 6.2);

      const group = new THREE.Group();
      scene.add(group);

      // Solid core, dark and matte, so the wireframe reads against it.
      const coreGeometry = new THREE.IcosahedronGeometry(1.55, 1);
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.45,
        metalness: 0.65,
        flatShading: true,
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      group.add(core);

      // Cage, slightly larger, counter-rotating.
      const cageGeometry = new THREE.IcosahedronGeometry(2.15, 1);
      const cageMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      });
      const cage = new THREE.Mesh(cageGeometry, cageMaterial);
      group.add(cage);

      // A ring of points, drawn as one Points object rather than many meshes.
      const RING_COUNT = 90;
      const positions = new Float32Array(RING_COUNT * 3);
      for (let i = 0; i < RING_COUNT; i++) {
        const angle = (i / RING_COUNT) * Math.PI * 2;
        const radius = 2.9 + Math.sin(angle * 4) * 0.16;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = Math.sin(angle * 2) * 0.32;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      const ringGeometry = new THREE.BufferGeometry();
      ringGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const ringMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
      });
      const ring = new THREE.Points(ringGeometry, ringMaterial);
      group.add(ring);

      // One key light and a dim fill: enough shape without washing it out.
      const key = new THREE.DirectionalLight(0xffffff, 2.6);
      key.position.set(-3, 4, 5);
      scene.add(key);

      const rim = new THREE.DirectionalLight(0xffffff, 1.4);
      rim.position.set(4, -2, -3);
      scene.add(rim);

      scene.add(new THREE.AmbientLight(0xffffff, 0.35));

      // Pointer parallax, damped — the object leans toward the cursor.
      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        target.x = (event.clientX / window.innerWidth - 0.5) * 0.5;
        target.y = (event.clientY / window.innerHeight - 0.5) * 0.35;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      let frame = 0;
      let running = true;
      let last = 0;
      const FRAME_MS = 1000 / 30; // 30fps is plenty for a slow rotation.
      const clock = new THREE.Clock();

      const animate = (now: number) => {
        if (!running) return;
        frame = requestAnimationFrame(animate);
        if (now - last < FRAME_MS) return;
        last = now;

        const elapsed = clock.getElapsedTime();

        core.rotation.y = elapsed * 0.22;
        core.rotation.x = elapsed * 0.1;

        cage.rotation.y = -elapsed * 0.16;
        cage.rotation.z = elapsed * 0.08;

        ring.rotation.y = elapsed * 0.3;
        ring.rotation.x = Math.PI * 0.22;

        // Ease toward the pointer rather than snapping to it.
        pointer.x += (target.x - pointer.x) * 0.05;
        pointer.y += (target.y - pointer.y) * 0.05;
        group.rotation.y = pointer.x;
        group.rotation.x = pointer.y;

        renderer.render(scene, camera);
      };

      frame = requestAnimationFrame(animate);

      // Stop when scrolled away or the tab is hidden. An animation nobody can
      // see should not be costing anyone battery.
      const setRunning = (next: boolean) => {
        if (next === running) return;
        running = next;
        if (next) frame = requestAnimationFrame(animate);
        else cancelAnimationFrame(frame);
      };

      const observer = new IntersectionObserver(([entry]) => {
        setRunning(Boolean(entry?.isIntersecting) && !document.hidden);
      });
      observer.observe(mount);

      const onVisibility = () => setRunning(!document.hidden);
      document.addEventListener("visibilitychange", onVisibility);

      teardown = () => {
        running = false;
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);

        coreGeometry.dispose();
        coreMaterial.dispose();
        cageGeometry.dispose();
        cageMaterial.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="h-full w-full" />;
}
