import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createStarTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.22, 'rgba(245,208,254,0.95)');
  grad.addColorStop(0.5, 'rgba(192,132,252,0.45)');
  grad.addColorStop(1, 'rgba(168,85,247,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function GalaxyBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(renderer.domElement);

    const starTexture = createStarTexture();
    const count = 1100;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#f5d0fe'),
      new THREE.Color('#e879f9'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#fde68a'),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.18,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    let targetX = 0;
    let targetY = 0;
    const onPointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.55;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.42;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let frame = 0;
    let t = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.015;
      stars.rotation.y += 0.0006;
      stars.rotation.x += 0.00018;
      material.opacity = 0.8 + Math.sin(t) * 0.14;
      camera.position.x += (targetX - camera.position.x) * 0.035;
      camera.position.y += (-targetY - camera.position.y) * 0.035;
      renderer?.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      starTexture.dispose();
      renderer?.dispose();
      if (renderer?.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 opacity-90" aria-hidden="true" />;
}
