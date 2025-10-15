import { useEffect, useRef } from 'react';

const MOBILE_DEVICE_SCREEN_WIDTH = 690;
const FULL_HD_DEVICE_SCREEN_WIDTH = 1920;

interface CanvasSettings {
  startingX: number;
  startingY: number;
  baseSpeed: number;
  lineGroupsQuantity: number;
  scale: number[];
  canvas: HTMLCanvasElement | null;
  mouseX: number;
  mouseY: number;
  mouseParallaxCoef: number;
  count: number;
  particleSizeY: number;
  particleSizeX: number;
  fatLineQuantity: number;
  fatLineWidth: number;
  fatLineHeight: number;
  floatAmplitude: number;
  canvasWidth?: number;
  canvasHeight?: number;
}

class Particle {
  scale: number;
  speed: number;
  width: number;
  height: number;
  dy: number;
  floatAmplitude: number;
  settings: CanvasSettings;
  x!: number;
  y!: number;
  baseX!: number;
  baseY!: number;
  doPrepareDraw: (ctx: CanvasRenderingContext2D) => void;

  constructor(settings: CanvasSettings) {
    this.scale = settings.scale[Math.floor(Math.random() * settings.scale.length)];
    this.speed = settings.baseSpeed * this.scale;
    this.width = settings.particleSizeX * this.scale;
    this.height = settings.particleSizeY * this.scale;
    this.dy = 0;
    this.floatAmplitude = Math.random() * (settings.floatAmplitude || 0);
    this.settings = settings;
    this.changePosition();
    this.doPrepareDraw = (ctx: CanvasRenderingContext2D) => this.prepareDraw(ctx);
  }

  changePosition() {
    this.x = this.getRandomXCoords();
    this.y = this.getRandomYCoords();
    this.baseX = this.x;
    this.baseY = this.y;
  }

  getRandomXCoords() {
    return Math.floor(Math.random() * ((this.settings.canvasWidth || 0) - this.settings.particleSizeX * 2));
  }

  getRandomYCoords() {
    return Math.floor((this.settings.canvasHeight || 0) / 2 - (this.height * Math.random()));
  }

  float(deltaTime: number) {
    this.dy += this.speed * deltaTime;
    let offsetY = Math.sin(this.dy) * this.floatAmplitude;
    let offsetX = 0;
    offsetY += this.settings.mouseY * this.width * this.settings.mouseParallaxCoef;
    offsetX += this.settings.mouseX * this.width * this.settings.mouseParallaxCoef;
    this.y = this.baseY + offsetY;
    this.x = this.baseX + offsetX;
  }

  prepareDraw(ctx: CanvasRenderingContext2D) {
    this.doPrepareDraw = () => {};
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.doPrepareDraw(ctx);
  }
}

class RectParticle1 extends Particle {
  line1Grd1: CanvasGradient | null = null;
  line1Grd2: CanvasGradient | null = null;
  alphaMultiplier: number = 1;

  prepareDraw(ctx: CanvasRenderingContext2D) {
    this.line1Grd1 = ctx.createLinearGradient(0, 0, this.width, this.height);
    this.line1Grd1.addColorStop(0.04, 'rgba(0,85,144,0.00)');
    this.line1Grd1.addColorStop(0.18, '#0C4B5B');
    this.line1Grd1.addColorStop(0.82, 'rgba(10,76,98,0.69)');
    this.line1Grd1.addColorStop(0.97, 'rgba(0,85,144,0.00)');

    this.line1Grd2 = ctx.createLinearGradient(0, 0, 0, this.height);
    this.line1Grd2.addColorStop(0, '#09C2CE');
    this.line1Grd2.addColorStop(0.02, '#0B6877');
    this.line1Grd2.addColorStop(0.09, 'rgba(12,71,87,0.30)');
    this.line1Grd2.addColorStop(0.17, 'rgba(12,62,78,0.22)');
    this.line1Grd2.addColorStop(0.28, 'rgba(11,47,65,0.10)');
    this.line1Grd2.addColorStop(0.49, 'rgba(11,36,55,0.00)');
    this.line1Grd2.addColorStop(0.72, 'rgba(11,51,69,0.10)');
    this.line1Grd2.addColorStop(0.88, 'rgba(12,75,91,0.30)');
    this.line1Grd2.addColorStop(0.98, '#0B8694');
    this.line1Grd2.addColorStop(1, '#09C2CE');

    this.alphaMultiplier = this.scale < 8 ? 0.6 : 1;
    super.prepareDraw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.setTransform(1, 0, 0, 1, (this.x - this.width), this.y);
    const alpha = ctx.globalAlpha;
    ctx.globalAlpha = alpha * this.alphaMultiplier;
    if (this.line1Grd1) ctx.fillStyle = this.line1Grd1;
    ctx.fillRect(0, 0, this.width, this.height);
    if (this.line1Grd2) ctx.fillStyle = this.line1Grd2;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.globalAlpha = alpha;
  }
}

class RectParticle2 extends Particle {
  line2Grd1: CanvasGradient | null = null;

  prepareDraw(ctx: CanvasRenderingContext2D) {
    this.line2Grd1 = ctx.createLinearGradient(0, 0, 0, this.height);
    this.line2Grd1.addColorStop(0, '#62FFA9');
    this.line2Grd1.addColorStop(1, '#09C2CE');
    super.prepareDraw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.setTransform(1, 0, 0, 1, 1, this.y);
    if (this.line2Grd1) ctx.fillStyle = this.line2Grd1;
    ctx.fillRect((this.x - this.width), 0, this.width, this.height);
  }
}

class RectParticle3 extends Particle {
  line3Grd1: CanvasGradient | null = null;

  prepareDraw(ctx: CanvasRenderingContext2D) {
    this.line3Grd1 = ctx.createLinearGradient(0, 0, 0, this.height);
    this.line3Grd1.addColorStop(0, '#00FFFF');
    this.line3Grd1.addColorStop(0.01, '#0A95A2');
    this.line3Grd1.addColorStop(0.08, '#0B717F');
    this.line3Grd1.addColorStop(0.21, '#0C4757');
    this.line3Grd1.addColorStop(0.26, '#0B2F41');
    this.line3Grd1.addColorStop(0.46, '#0B2437');
    this.line3Grd1.addColorStop(0.67, '#0B3345');
    this.line3Grd1.addColorStop(0.90, '#0C4B5B');
    this.line3Grd1.addColorStop(1, '#09C2CE');
    super.prepareDraw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.setTransform(1, 0, 0, 1, 1, this.y);
    if (this.line3Grd1) ctx.fillStyle = this.line3Grd1;
    ctx.fillRect((this.x - this.width), 0, this.width, this.height);
  }
}

class RectParticle4 extends Particle {
  line4Grd1: CanvasGradient | null = null;

  prepareDraw(ctx: CanvasRenderingContext2D) {
    this.line4Grd1 = ctx.createLinearGradient(0, 0, 0, this.height);
    this.line4Grd1.addColorStop(0, '#09C2CE');
    this.line4Grd1.addColorStop(0.02, '#0C4757');
    this.line4Grd1.addColorStop(0.27, '#0B2F41');
    this.line4Grd1.addColorStop(0.48, '#0B2437');
    this.line4Grd1.addColorStop(0.26, '#0B2F41');
    this.line4Grd1.addColorStop(0.46, '#0B2437');
    this.line4Grd1.addColorStop(0.71, '#0B3345');
    this.line4Grd1.addColorStop(0.90, '#0C4B5B');
    this.line4Grd1.addColorStop(1, '#09C2CE');
    super.prepareDraw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.setTransform(1, 0, 0, 1, 1, this.y);
    if (this.line4Grd1) ctx.fillStyle = this.line4Grd1;
    ctx.fillRect((this.x - this.width), 0, this.width, this.height);
  }
}

const rect5FillStyle = '#72fec5';

class RectParticle5 extends Particle {
  constructor(settings: CanvasSettings) {
    super(settings);
    this.width = settings.fatLineWidth;
    this.height = settings.fatLineHeight;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.setTransform(1, 0, 0, 1, 1, this.y);
    ctx.fillStyle = rect5FillStyle;
    ctx.fillRect(this.x, 0, this.width, this.height);
  }
}

class Canvas {
  settings: CanvasSettings;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  particles: Particle[];
  isPlaying: boolean;
  startTime: number;
  drawTimer: number | null;
  renderingAllowed: boolean;

  constructor(settings: CanvasSettings) {
    this.settings = settings;
    this.canvas = this.settings.canvas!;
    this.context = this.canvas.getContext('2d')!;
    (this.context as any).mozImageSmoothingEnabled = true;
    (this.context as any).webkitImageSmoothingEnabled = true;
    (this.context as any).msImageSmoothingEnabled = true;
    this.context.imageSmoothingEnabled = true;
    (this.context as any).imageSmoothingQuality = 'high';
    this.particles = [];
    this.isPlaying = false;
    this.startTime = 0;
    this.drawTimer = null;
    this.renderingAllowed = false;
    this._doLoading();
  }

  _doLoading() {
    this.renderingAllowed = true;
    // Simulate the TweenLite fade in
    if (this.canvas) {
      this.canvas.style.opacity = '0';
      setTimeout(() => {
        if (this.canvas) this.canvas.style.opacity = '1';
      }, 1000);
    }
    this.renderOnce();
    return Promise.resolve();
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startTime = performance.now();
    this.enqueueAnimation();
  }

  pause() {
    this.isPlaying = false;
  }

  setup() {
    if (!this.canvas) return;
    this.setCanvasSize(false);
    this.particles = [];
    const lineGroupCount = Math.round(this.settings.count / this.settings.lineGroupsQuantity);

    for (let i = 0; i < lineGroupCount; i++) {
      this.particles.push(new RectParticle1(this.settings));
    }
    for (let i = 0; i < lineGroupCount; i++) {
      this.particles.push(new RectParticle2(this.settings));
    }
    for (let i = 0; i < lineGroupCount; i++) {
      this.particles.push(new RectParticle3(this.settings));
    }
    for (let i = 0; i < lineGroupCount; i++) {
      this.particles.push(new RectParticle4(this.settings));
    }
    for (let i = 0; i < this.settings.fatLineQuantity; i++) {
      this.particles.push(new RectParticle5(this.settings));
    }
  }

  renderOnce() {
    if (this.isPlaying || !this.renderingAllowed) return;
    window.requestAnimationFrame(this.drawCanvas.bind(this));
  }

  setCanvasSize(updateParticles = true) {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.parentNode ? (this.canvas.parentNode as HTMLElement).offsetWidth : window.innerWidth;
    this.canvas.height = this.canvas.parentNode ? (this.canvas.parentNode as HTMLElement).offsetHeight : window.innerHeight;
    this.settings.canvasWidth = this.canvas.width;
    this.settings.canvasHeight = this.canvas.height;
    if (updateParticles) {
      this.particles.forEach((p) => {
        p.changePosition();
      });
    }
  }

  animationWorker(timeStamp: number) {
    this.drawCanvas(timeStamp);
    this.enqueueAnimation();
  }

  enqueueAnimation() {
    if (this.isPlaying) window.requestAnimationFrame(this.animationWorker);
  }

  drawCanvas(timeStamp: number) {
    if (!this.renderingAllowed) return;
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const deltaTime = timeStamp - this.startTime;
    this.startTime = timeStamp;
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.float(deltaTime);
      p.draw(this.context);
    }
  }
}

class Director {
  _el: HTMLElement | null = null;
  rect: DOMRect = new DOMRect();
  isMobile: boolean = false;
  isFullHD: boolean = false;
  mobileFlagChanged: boolean = false;
  width: number = window.innerWidth;
  canvasSetings: CanvasSettings;
  _canvas: Canvas | null = null;

  constructor(container: HTMLElement) {
    this._el = container;

    this.canvasSetings = {
      startingX: 0,
      startingY: 0,
      baseSpeed: 0.0001,
      lineGroupsQuantity: 4,
      scale: [2, 3.1, 3.6, 2.5, 2.2, 3, 2.6, 4, 4.5, 5, 7, 8, 9, 10, 12],
      canvas: null,
      mouseX: 0,
      mouseY: 0,
      mouseParallaxCoef: 3,
      count: 400,
      particleSizeY: 30,
      particleSizeX: 0.4,
      fatLineQuantity: 8,
      fatLineWidth: 13,
      fatLineHeight: 200,
      floatAmplitude: 10,
    };
  }

  _setup() {
    if (!this._el) return;
    this.rect = this._el.getBoundingClientRect();
    this.isMobile = false;
    this.isFullHD = false;
    this.mobileFlagChanged = false;
    this.width = window.innerWidth;

    if (this.updateMobileFlag(this.width)) {
      this.setCanvasSettings();
      if (this._canvas) {
        this._canvas.setup();
        this.resize();
      }
    } else {
      if (this._canvas) this._canvas.setCanvasSize();
    }
  }

  resize() {
    this.width = window.innerWidth;
    if (this.updateMobileFlag(this.width)) {
      this.setCanvasSettings();
      if (this._canvas) {
        this._canvas.setup();
      }
    } else {
      if (this._canvas) this._canvas.setCanvasSize();
    }
    if (this._canvas) this._canvas.renderOnce();
  }

  setCanvasSettings() {
    if (this.isMobile) {
      Object.assign(this.canvasSetings, {
        count: 100,
        particleSizeY: 18,
        particleSizeX: 0.4,
        fatLineQuantity: 4,
        fatLineWidth: 7,
        fatLineHeight: 100,
        floatAmplitude: 0,
      });
    } else if (this.isFullHD) {
      Object.assign(this.canvasSetings, {
        count: 600,
        particleSizeY: 39,
        particleSizeX: 0.48,
        fatLineQuantity: 9,
        fatLineWidth: 15,
        fatLineHeight: 250,
        floatAmplitude: 10,
      });
    } else {
      Object.assign(this.canvasSetings, {
        count: 400,
        particleSizeY: 30,
        particleSizeX: 0.4,
        fatLineQuantity: 8,
        fatLineWidth: 13,
        fatLineHeight: 200,
        floatAmplitude: 10,
      });
    }
  }

  updateMobileFlag(width: number) {
    const isMobile = width < MOBILE_DEVICE_SCREEN_WIDTH;
    const isFullHD = width > FULL_HD_DEVICE_SCREEN_WIDTH;
    if (isMobile !== this.isMobile) {
      this.isMobile = isMobile;
      return true;
    }
    if (isFullHD !== this.isFullHD) {
      this.isFullHD = isFullHD;
      return true;
    }
    if (!this.isFullHD && !this.isMobile) {
      return true;
    }
    return false;
  }

  addMouseMoveFloat() {
    if (this._el) {
      this._el.addEventListener('mousemove', this.onMouseMove);
      this._el.addEventListener('mouseleave', this.onMouseLeave);
    }
  }

  removeMouseEventListener() {
    if (this._el) {
      this._el.removeEventListener('mousemove', this.onMouseMove);
      this._el.removeEventListener('mouseleave', this.onMouseLeave);
    }
  }

  onMouseMove(e: MouseEvent) {
    // Simplified mouse movement without TweenLite
    if (this._el) {
      const rect = this._el.getBoundingClientRect();
      this.canvasSetings.mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      this.canvasSetings.mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    }
  }

  onMouseLeave() {
    // Simplified mouse leave without TweenLite
    this.canvasSetings.mouseX = 0;
    this.canvasSetings.mouseY = 0;
  }

  _activate() {
    window.addEventListener('resize', this.resize);
    if (!this.isMobile) {
      if (this._canvas) this._canvas.play();
      this.addMouseMoveFloat();
    }
  }

  _deactivate() {
    window.removeEventListener('resize', this.resize);
    if (this._canvas) this._canvas.pause();
    this.removeMouseEventListener();
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvasSetings.canvas = canvas;
    this._canvas = new Canvas(this.canvasSetings);
  }
}

interface ParticleAnimationProps {
  className?: string;
}

export default function ParticleAnimation({ className = '' }: ParticleAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const directorRef = useRef<Director | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Initialize director
    directorRef.current = new Director(containerRef.current);
    directorRef.current.initCanvas(canvasRef.current);
    directorRef.current._setup();
    directorRef.current._activate();

    // Handle image load
    const img = imgRef.current;
    if (img) {
      const handleLoad = () => img.classList.add('loaded');
      img.addEventListener('load', handleLoad);
      return () => {
        img.removeEventListener('load', handleLoad);
        if (directorRef.current) {
          directorRef.current._deactivate();
        }
      };
    }

    return () => {
      if (directorRef.current) {
        directorRef.current._deactivate();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`canvas-wrap ${className}`}>
      <canvas ref={canvasRef} id="canvas" className="absolute inset-0 w-full h-full" />
      <div className="shadow-left absolute top-0 left-0 w-20 h-full z-10 bg-gradient-to-l from-transparent to-[#090118]"></div>
      <div className="shadow-right absolute top-0 right-0 w-20 h-full z-10 bg-gradient-to-r from-transparent to-[#090118]"></div>
      <div className="shadow-bottom absolute bottom-0 left-0 w-full h-20 z-10 bg-gradient-to-t from-transparent to-[#090118]"></div>
      <div className="shadow-top absolute top-0 left-0 w-full h-20 z-10 bg-gradient-to-b from-transparent to-[#090118]"></div>
      <img
        ref={imgRef}
        id="img"
        src="https://s3-us-west-1.amazonaws.com/zajno-storage0/ringba-shot/radial.svg"
        alt="canvas-light"
        className="absolute left-0 top-1/2 w-full h-full z-10 opacity-0 transition-opacity duration-300 delay-300 -translate-y-1/2 loaded:opacity-100"
      />
    </div>
  );
}
