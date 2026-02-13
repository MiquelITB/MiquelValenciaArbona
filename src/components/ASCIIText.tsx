import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;
void main() {
    vUv = uv;
    float time = uTime * 5.;
    float waveFactor = uEnableWaves;
    vec3 transformed = position;
    transformed.x += sin(time + position.y) * 0.5 * waveFactor;
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;
    transformed.z += sin(time + position.x) * waveFactor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;
void main() {
    float time = uTime;
    vec2 pos = vUv;
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`;

const mathMap = (n: number, start: number, stop: number, start2: number, stop2: number) =>
  ((n - start) / (stop - start)) * (stop2 - start2) + start2;

const PX_RATIO = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

class AsciiFilter {
  renderer: THREE.WebGLRenderer;
  domElement: HTMLDivElement;
  pre: HTMLPreElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  deg: number;
  invert: boolean;
  fontSize: number;
  fontFamily: string;
  charset: string;
  width = 0;
  height = 0;
  cols = 0;
  rows = 0;
  center = { x: 0, y: 0 };
  mouse = { x: 0, y: 0 };

  constructor(renderer: THREE.WebGLRenderer, opts: { fontSize?: number; fontFamily?: string; charset?: string; invert?: boolean } = {}) {
    this.renderer = renderer;
    this.domElement = document.createElement('div');
    this.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%';
    this.pre = document.createElement('pre');
    this.domElement.appendChild(this.pre);
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.domElement.appendChild(this.canvas);
    this.deg = 0;
    this.invert = opts.invert ?? true;
    this.fontSize = opts.fontSize ?? 12;
    this.fontFamily = opts.fontFamily ?? "'Courier New', monospace";
    this.charset = opts.charset ?? ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
    this.context.imageSmoothingEnabled = false;
    this._onMouseMove = this._onMouseMove.bind(this);
    document.addEventListener('mousemove', this._onMouseMove);
  }

  _onMouseMove(e: MouseEvent) {
    this.mouse = { x: e.clientX * PX_RATIO, y: e.clientY * PX_RATIO };
  }

  setSize(w: number, h: number) {
    this.width = w; this.height = h;
    this.renderer.setSize(w, h);
    this.reset();
    this.center = { x: w / 2, y: h / 2 };
    this.mouse = { x: this.center.x, y: this.center.y };
  }

  reset() {
    this.context.font = `${this.fontSize}px ${this.fontFamily}`;
    const charWidth = this.context.measureText('A').width;
    this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)));
    this.rows = Math.floor(this.height / this.fontSize);
    this.canvas.width = this.cols;
    this.canvas.height = this.rows;
    Object.assign(this.pre.style, {
      fontFamily: this.fontFamily, fontSize: `${this.fontSize}px`, margin: '0', padding: '0',
      lineHeight: '1em', position: 'absolute', left: '0', top: '0', zIndex: '9',
      backgroundAttachment: 'fixed', mixBlendMode: 'difference'
    });
  }

  render(scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer.render(scene, camera);
    const w = this.canvas.width, h = this.canvas.height;
    this.context.clearRect(0, 0, w, h);
    if (w && h) this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
    this.asciify(w, h);
    this.hue();
  }

  hue() {
    const dx = this.mouse.x - this.center.x;
    const dy = this.mouse.y - this.center.y;
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    this.deg += (deg - this.deg) * 0.075;
    this.domElement.style.filter = `hue-rotate(${this.deg.toFixed(1)}deg)`;
  }

  asciify(w: number, h: number) {
    if (!w || !h) return;
    const imgData = this.context.getImageData(0, 0, w, h).data;
    let str = '';
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (x + y * w) * 4;
        const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];
        if (a === 0) { str += ' '; continue; }
        let gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
        let idx = Math.floor((1 - gray) * (this.charset.length - 1));
        if (this.invert) idx = this.charset.length - idx - 1;
        str += this.charset[idx];
      }
      str += '\n';
    }
    this.pre.innerHTML = str;
  }

  dispose() {
    document.removeEventListener('mousemove', this._onMouseMove);
  }
}

class CanvasTxt {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  txt: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  font: string;

  constructor(txt: string, opts: { fontSize?: number; fontFamily?: string; color?: string } = {}) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.txt = txt;
    this.fontSize = opts.fontSize ?? 200;
    this.fontFamily = opts.fontFamily ?? 'Arial';
    this.color = opts.color ?? '#fdf9f3';
    this.font = `600 ${this.fontSize}px ${this.fontFamily}`;
  }

  resize() {
    this.context.font = this.font;
    const lines = this.txt.split('\n');
    let maxWidth = 0;
    let totalHeight = 0;

    lines.forEach((line) => {
      const m = this.context.measureText(line);
      const width = m.width;
      if (width > maxWidth) maxWidth = width;
      totalHeight += this.fontSize * 1.2; 
    });

    this.canvas.width = Math.ceil(maxWidth) + 100;
    this.canvas.height = Math.ceil(totalHeight) + 100;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.textBaseline = 'top';
    this.context.textAlign = 'center';

    const lines = this.txt.split('\n');
    const lineHeight = this.fontSize * 1.2;

    lines.forEach((line, i) => {
      this.context.fillText(line, this.canvas.width / 2, 20 + i * lineHeight);
    });
  }

  get width() { return this.canvas.width; }
  get height() { return this.canvas.height; }
  get texture() { return this.canvas; }
}

class CanvAscii {
  container: HTMLElement;
  width: number;
  height: number;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  mouse: { x: number; y: number };
  textCanvas!: CanvasTxt;
  texture!: THREE.CanvasTexture;
  geometry!: THREE.PlaneGeometry;
  material!: THREE.ShaderMaterial;
  mesh!: THREE.Mesh;
  renderer!: THREE.WebGLRenderer;
  filter!: AsciiFilter;
  animationFrameId = 0;
  center = { x: 0, y: 0 };
  private textString: string;
  private asciiFontSize: number;
  private textFontSize: number;
  private textColor: string;
  private planeBaseHeight: number;
  private enableWaves: boolean;
  private _onMouseMove: (e: MouseEvent | TouchEvent) => void;

  constructor(
    opts: { text: string; asciiFontSize: number; textFontSize: number; textColor: string; planeBaseHeight: number; enableWaves: boolean },
    container: HTMLElement, w: number, h: number
  ) {
    this.textString = opts.text;
    this.asciiFontSize = opts.asciiFontSize;
    this.textFontSize = opts.textFontSize;
    this.textColor = opts.textColor;
    this.planeBaseHeight = opts.planeBaseHeight;
    this.enableWaves = opts.enableWaves;
    this.container = container;
    this.width = w;
    this.height = h;
    this.camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
    this.camera.position.z = 30;
    this.scene = new THREE.Scene();
    this.mouse = { x: w / 2, y: h / 2 };
    this._onMouseMove = this.onMouseMove.bind(this);
  }

  async init() {
    try {
      await document.fonts.load('600 200px "IBM Plex Mono"');
      await document.fonts.load('500 12px "IBM Plex Mono"');
    } catch { /* continue */ }
    await document.fonts.ready;
    this.setMesh();
    this.setRenderer();
  }

  setMesh() {
    this.textCanvas = new CanvasTxt(this.textString, { fontSize: this.textFontSize, fontFamily: 'IBM Plex Mono', color: this.textColor });
    this.textCanvas.resize();
    this.textCanvas.render();
    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);
    this.texture.minFilter = THREE.NearestFilter;
    const aspect = this.textCanvas.width / this.textCanvas.height;
    const h = this.planeBaseHeight;
    this.geometry = new THREE.PlaneGeometry(h * aspect, h, 36, 36);
    this.material = new THREE.ShaderMaterial({
      vertexShader, fragmentShader, transparent: true,
      uniforms: { uTime: { value: 0 }, mouse: { value: 1.0 }, uTexture: { value: this.texture }, uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 } }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);
    this.filter = new AsciiFilter(this.renderer, { fontFamily: 'IBM Plex Mono', fontSize: this.asciiFontSize, invert: true });
    this.container.appendChild(this.filter.domElement);
    this.setSize(this.width, this.height);
    this.container.addEventListener('mousemove', this._onMouseMove);
    this.container.addEventListener('touchmove', this._onMouseMove);
  }

  setSize(w: number, h: number) {
    this.width = w; this.height = h;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.filter.setSize(w, h);
    this.center = { x: w / 2, y: h / 2 };
  }

  load() { this.animate(); }

  onMouseMove(evt: MouseEvent | TouchEvent) {
    const e = 'touches' in evt ? (evt as TouchEvent).touches[0] : (evt as MouseEvent);
    const bounds = this.container.getBoundingClientRect();
    this.mouse = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  }

  animate() {
    const frame = () => { this.animationFrameId = requestAnimationFrame(frame); this.render(); };
    frame();
  }

  render() {
    const time = Date.now() * 0.001;
    this.textCanvas.render();
    this.texture.needsUpdate = true;
    this.material.uniforms.uTime.value = Math.sin(time);
    this.updateRotation();
    this.filter.render(this.scene, this.camera);
  }

  updateRotation() {
    const x = mathMap(this.mouse.y, 0, this.height, 0.5, -0.5);
    const y = mathMap(this.mouse.x, 0, this.width, -0.5, 0.5);
    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);
    if (this.filter) {
      this.filter.dispose();
      if (this.filter.domElement.parentNode) this.container.removeChild(this.filter.domElement);
    }
    this.container.removeEventListener('mousemove', this._onMouseMove);
    this.container.removeEventListener('touchmove', this._onMouseMove);
    this.scene.traverse(obj => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        m.geometry?.dispose();
        if (m.material && typeof (m.material as THREE.Material).dispose === 'function') (m.material as THREE.Material).dispose();
      }
    });
    this.scene.clear();
    this.renderer?.dispose();
  }
}

interface ASCIITextProps {
  text?: string;
  asciiFontSize?: number;
  textFontSize?: number;
  textColor?: string;
  planeBaseHeight?: number;
  enableWaves?: boolean;
}

export default function ASCIIText({
  text = 'Hello!',
  asciiFontSize = 8,
  textFontSize = 200,
  textColor = '#fdf9f3',
  planeBaseHeight = 8,
  enableWaves = true
}: ASCIITextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<CanvAscii | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;

    const create = async (container: HTMLElement, w: number, h: number) => {
      const inst = new CanvAscii({ text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves }, container, w, h);
      await inst.init();
      return inst;
    };

    const setup = async () => {
      const { width, height } = containerRef.current!.getBoundingClientRect();
      if (width === 0 || height === 0) {
        observer = new IntersectionObserver(async ([entry]) => {
          if (cancelled || !entry.isIntersecting || entry.boundingClientRect.width === 0) return;
          const { width: w, height: h } = entry.boundingClientRect;
          observer!.disconnect(); observer = null;
          if (!cancelled) { asciiRef.current = await create(containerRef.current!, w, h); if (!cancelled) asciiRef.current.load(); }
        }, { threshold: 0.1 });
        observer.observe(containerRef.current!);
        return;
      }
      asciiRef.current = await create(containerRef.current!, width, height);
      if (!cancelled) {
        asciiRef.current.load();
        ro = new ResizeObserver(entries => {
          const { width: w, height: h } = entries[0].contentRect;
          if (w > 0 && h > 0 && asciiRef.current) asciiRef.current.setSize(w, h);
        });
        ro.observe(containerRef.current!);
      }
    };

    setup();
    return () => {
      cancelled = true;
      observer?.disconnect();
      ro?.disconnect();
      asciiRef.current?.dispose();
      asciiRef.current = null;
    };
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);

  return (
    <div ref={containerRef} className="ascii-text-container" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&display=swap');
        .ascii-text-container canvas {
          position: absolute; left: 0; top: 0; width: 100%; height: 100%;
          image-rendering: pixelated;
        }
        .ascii-text-container pre {
          margin: 0; user-select: none; padding: 0; line-height: 1em;
          text-align: left; position: absolute; left: 0; top: 0;
          background-image: radial-gradient(circle, hsl(296, 81%, 46%) 0%, hsl(296, 90%, 65%) 50%, hsl(296, 70%, 80%) 100%);
          background-attachment: fixed;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          z-index: 9; mix-blend-mode: difference;
        }
      `}</style>
    </div>
  );
}