"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// The animation logic is complex, so we'll define the classes outside the component
// to prevent them from being redeclared on every render.

const MOBILE_DEVICE_SCREEN_WIDTH = 690;
const FULL_HD_DEVICE_SCREEN_WIDTH = 1920;

// The rest of your JavaScript classes (Director, Canvas, Particle, etc.) go here.
// I've included them all below with the necessary adaptations for React.

class Director {
  private _el: HTMLElement | null = null;
  private rect: DOMRect | null = null;
  private onMouseMove: (e: MouseEvent) => void;
  private onMouseLeave: () => void;
  private resize: () => void;
  private isMobile = false;
  private isFullHD = false;
  private width = 0;
  private canvasSetings: any;
  private fullHDCanvasSettings: any;
  private desktopCanvasSettings: any;
  private mobileCanvasSettings: any;
  private _canvas: Canvas | null = null;

  constructor(mainEl: HTMLElement, canvasEl: HTMLCanvasElement) {
    this._el = mainEl;
    this.rect = this._el.getBoundingClientRect();

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.resize = this.resize.bind(this);

    this.width = window.innerWidth;

    this.canvasSetings = {
      startingX: 0,
      startingY: 0,
      baseSpeed: 0.0001,
      lineGroupsQuantity: 4,
      scale: [2, 3.1, 3.6, 2.5, 2.2, 3, 2.6, 4, 4.5, 5, 7, 8, 9, 10, 12],
      canvas: canvasEl,
      mouseX: 0,
      mouseY: 0,
      mouseParallaxCoef: 3,
    };

    this.fullHDCanvasSettings = {
      count: 600,
      particleSizeY: 39,
      particleSizeX: 0.48,
      fatLineQuantity: 9,
      fatLineWidth: 15,
      fatLineHeight: 250,
      floatAmplitude: 10,
    };

    this.desktopCanvasSettings = {
      count: 400,
      particleSizeY: 30,
      particleSizeX: 0.4,
      fatLineQuantity: 8,
      fatLineWidth: 13,
      fatLineHeight: 200,
      floatAmplitude: 10,
    };

    this.mobileCanvasSettings = {
      count: 100,
      particleSizeY: 18,
      particleSizeX: 0.4,
      fatLineQuantity: 4,
      fatLineWidth: 7,
      fatLineHeight: 100,
      floatAmplitude: 0,
    };

    this._canvas = new Canvas(this.canvasSetings);
    if (this.updateMobileFlag(this.width)) {
      this.setCanvasSettings();
      this._canvas.setup();
      this.resize();
    } else {
      this._canvas.setCanvasSize();
    }
  }

  resize() {
    this.width = window.innerWidth;
    if (this._canvas) {
      if (this.updateMobileFlag(this.width)) {
        this.setCanvasSettings();
        this._canvas.setup();
      } else {
        this._canvas.setCanvasSize();
      }
      this._canvas.renderOnce();
    }
  }

  setCanvasSettings() {
    if (this.isMobile) {
      Object.assign(this.canvasSetings, this.mobileCanvasSettings);
    } else if (this.isFullHD) {
      Object.assign(this.canvasSetings, this.fullHDCanvasSettings);
    } else {
      Object.assign(this.canvasSetings, this.desktopCanvasSettings);
    }
  }

  updateMobileFlag(width: number) {
    const isMobile = width < MOBILE_DEVICE_SCREEN_WIDTH;
    const isFullHD = width > FULL_HD_DEVICE_SCREEN_WIDTH;
    if (isMobile !== this.isMobile || isFullHD !== this.isFullHD) {
      this.isMobile = isMobile;
      this.isFullHD = isFullHD;
      return true;
    }
    return false;
  }

  addMouseMoveFloat() {
    this._el?.addEventListener('mousemove', this.onMouseMove);
    this._el?.addEventListener('mouseleave', this.onMouseLeave);
  }

  removeMouseEventListener() {
    this._el?.removeEventListener('mousemove', this.onMouseMove);
    this._el?.removeEventListener('mouseleave', this.onMouseLeave);
  }

  onMouseMove(e: MouseEvent) {
    gsap.killTweensOf(this.canvasSetings);
    if (this.rect) {
      gsap.to(this.canvasSetings, {
        duration: 0.5,
        mouseX: (e.clientX - this.rect.left) / this.rect.width - 0.5,
        mouseY: (e.clientY - this.rect.top) / this.rect.height - 0.5,
      });
    }
  }

  onMouseLeave() {
    gsap.to(this.canvasSetings, { duration: 2, mouseX: 0, mouseY: 0, delay: 0.5 });
  }

  activate() {
    window.addEventListener('resize', this.resize);
    if (!this.isMobile && this._canvas) {
      this._canvas.play();
      this.addMouseMoveFloat();
    }
  }

  deactivate() {
    window.removeEventListener('resize', this.resize);
    this._canvas?.pause();
    this.removeMouseEventListener();
  }
}

// ... All other classes (Canvas, Particle, etc.) remain largely the same.
// Just ensure they are defined here, outside the component.
class Canvas {
  private settings: any;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private isPlaying = false;
  private startTime: number | null = null;
  private renderingAllowed = false;

  constructor(settings: any) {
    this.settings = settings;
    this.canvas = this.settings.canvas;
    this.context = this.canvas.getContext('2d')!;
    this.context.imageSmoothingEnabled = true;
    this.context.imageSmoothingQuality = 'high';
    this.animationWorker = this.animationWorker.bind(this);
    this._doLoading();
  }

  _doLoading() {
    this.renderingAllowed = true;
    gsap.fromTo(this.canvas, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5, delay: 1 });
    this.renderOnce();
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
    this.setCanvasSize(false);
    this.particles = [];
    const lineGroupCount = Math.round(this.settings.count / this.settings.lineGroupsQuantity);
    for (let i = 0; i < lineGroupCount; i++) this.particles.push(new RectParticle1(this.settings));
    for (let i = 0; i < lineGroupCount; i++) this.particles.push(new RectParticle2(this.settings));
    for (let i = 0; i < lineGroupCount; i++) this.particles.push(new RectParticle3(this.settings));
    for (let i = 0; i < lineGroupCount; i++) this.particles.push(new RectParticle4(this.settings));
    for (let i = 0; i < this.settings.fatLineQuantity; i++) this.particles.push(new RectParticle5(this.settings));
  }

  renderOnce() {
    if (this.isPlaying || !this.renderingAllowed) return;
    window.requestAnimationFrame(this.drawCanvas.bind(this));
  }

  setCanvasSize(updateParticles = true) {
    if (!this.canvas.parentNode) return;
    this.canvas.width = (this.canvas.parentNode as HTMLElement).offsetWidth;
    this.canvas.height = (this.canvas.parentNode as HTMLElement).offsetHeight;
    this.settings.canvasWidth = this.canvas.width;
    this.settings.canvasHeight = this.canvas.height;
    if (updateParticles) this.particles.forEach(p => p.changePosition());
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
    const deltaTime = this.startTime ? timeStamp - this.startTime : 0;
    this.startTime = timeStamp;
    this.particles.forEach(p => {
      p.float(deltaTime);
      p.draw(this.context);
    });
  }
}

class Particle {
  protected scale: number;
  protected speed: number;
  protected width: number;
  protected height: number;
  protected dy: number;
  protected floatAmplitude: number;
  protected settings: any;
  protected x = 0;
  protected y = 0;
  protected baseX = 0;
  protected baseY = 0;
  private doPrepareDraw: (context: CanvasRenderingContext2D) => void;
  constructor(settings: any) {
    this.scale = settings.scale[Math.floor(Math.random() * settings.scale.length)];
    this.speed = settings.baseSpeed * this.scale;
    this.width = settings.particleSizeX * this.scale;
    this.height = settings.particleSizeY * this.scale;
    this.dy = 0;
    this.floatAmplitude = Math.random() * (settings.floatAmplitude || 0);
    this.settings = settings;
    this.changePosition();
    this.doPrepareDraw = context => this.prepareDraw(context);
  }
  changePosition() {
    this.x = this.getRandomXCoords();
    this.y = this.getRandomYCoords();
    this.baseX = this.x;
    this.baseY = this.y;
  }
  getRandomXCoords() {
    return Math.floor(Math.random() * (this.settings.canvasWidth - this.settings.particleSizeX * 2));
  }
  getRandomYCoords() {
    return Math.floor((this.settings.canvasHeight / 2) - (this.height * Math.random()));
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
  private line1Grd1: CanvasGradient | null = null;
  private line1Grd2: CanvasGradient | null = null;
  private alphaMultiplier = 1;
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
  private line2Grd1: CanvasGradient | null = null;
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
  private line3Grd1: CanvasGradient | null = null;
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
  private line4Grd1: CanvasGradient | null = null;
  prepareDraw(ctx: CanvasRenderingContext2D) {
    this.line4Grd1 = ctx.createLinearGradient(0, 0, 0, this.height);
    this.line4Grd1.addColorStop(0, '#09C2CE');
    this.line4Grd1.addColorStop(0.02, '#0C4757');
    this.line4Grd1.addColorStop(0.27, '#0B2F41');
    this.line4Grd1.addColorStop(0.48, '#0B2437');
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
class RectParticle5 extends Particle {
  constructor(settings: any) {
    super(settings);
    this.width = settings.fatLineWidth;
    this.height = settings.fatLineHeight;
  }
  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.setTransform(1, 0, 0, 1, 1, this.y);
    ctx.fillStyle = '#72fec5';
    ctx.fillRect(this.x, 0, this.width, this.height);
  }
}


export default function ParticleAnimation() {
  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // This handles adding the 'loaded' class to the image, triggering the fade-in animation
  const handleImageLoad = () => {
    imgRef.current?.classList.add('loaded');
  };

  useEffect(() => {
    // Ensure all DOM elements are available before starting the animation
    if (!mainRef.current || !canvasRef.current) {
      return;
    }

    // Initialize the animation controller
    const director = new Director(mainRef.current, canvasRef.current);
    director.activate();

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      director.deactivate();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div ref={mainRef} className="canvas-wrap">
      <canvas ref={canvasRef} id="canvas"></canvas>
      <div className="shadow-left"></div>
      <div className="shadow-right"></div>
      <div className="shadow-bottom"></div>
      <div className="shadow-top"></div>
      <img 
        ref={imgRef}
        id="img" 
        src="https://s3-us-west-1.amazonaws.com/zajno-storage0/ringba-shot/radial.svg" 
        alt="canvas-light"
        onLoad={handleImageLoad}
      />
    </div>
  );
}