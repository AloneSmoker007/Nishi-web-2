import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createStarTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.2, 'rgba(250,232,255,0.95)');
  grad.addColorStop(0.48, 'rgba(216,180,254,0.48)');
  grad.addColorStop(1, 'rgba(168,85,247,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createNebulaTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(192,132,252,0.5)');
  grad.addColorStop(0.4, 'rgba(147,51,234,0.25)');
  grad.addColorStop(1, 'rgba(91,33,182,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function GalaxyBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
        failIfMajorPerformanceCaveat: true,
      });
    } catch {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.className = 'nishi-star-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    el.appendChild(renderer.domElement);

    const starTexture = createStarTexture();
    const nebulaTexture = createNebulaTexture();
    const count = window.innerWidth < 640 ? 460 : 820;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = ['#ffffff', '#f5d0fe', '#e9d5ff', '#c084fc', '#fbcfe8', '#fde68a'].map(
      (color) => new THREE.Color(color)
    );

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: window.innerWidth < 640 ? 0.14 : 0.17,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Nebula clouds — soft purple wisps drifting in the background
    const nebulaCount = window.innerWidth < 640 ? 6 : 10;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    const nebulaPalette = ['#7c3aed', '#a855f7', '#c026d3', '#6d28d9'].map((c) => new THREE.Color(c));
    for (let i = 0; i < nebulaCount; i++) {
      nebulaPositions[i * 3] = (Math.random() - 0.5) * 18;
      nebulaPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      nebulaPositions[i * 3 + 2] = -4 - Math.random() * 3;
      const c = nebulaPalette[Math.floor(Math.random() * nebulaPalette.length)];
      nebulaColors[i * 3] = c.r;
      nebulaColors[i * 3 + 1] = c.g;
      nebulaColors[i * 3 + 2] = c.b;
    }
    const nebulaGeo = new THREE.BufferGeometry();
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
    const nebulaMat = new THREE.PointsMaterial({
      size: 3.2,
      map: nebulaTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const nebula = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebula);

    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let elapsed = 0;
    let disposed = false;

    const onPointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.32;
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.24;
    };

    const render = () => {
      if (disposed || document.hidden) return;
      if (!reducedMotion) {
        elapsed += 0.012;
        stars.rotation.y += 0.00028;
        stars.rotation.x += 0.0001;
        nebula.rotation.y -= 0.00012;
        nebula.rotation.x += 0.00006;
        material.opacity = 0.75 + Math.sin(elapsed) * 0.1;
        nebulaMat.opacity = 0.15 + Math.sin(elapsed * 0.7) * 0.04;
        camera.position.x += (targetX - camera.position.x) * 0.025;
        camera.position.y += (-targetY - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);
      }
      renderer?.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        render();
      }
    };

    const onResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    if (!reducedMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      geometry.dispose();
      material.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      starTexture.dispose();
      nebulaTexture.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div ref={mountRef} className="nishi-galaxy-background" aria-hidden="true">
      <div className="nishi-aurora nishi-aurora-one" />
      <div className="nishi-aurora nishi-aurora-two" />
      <div className="nishi-aurora nishi-aurora-three" />
      <div className="nishi-moon-halo">
        <div className="nishi-moon" />
      </div>
    </div>
  );
}
