import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from "ogl";

import "./CircularGallery.css";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Other utility functions and classes remain the same
// (lerp, autoBind, createTextTexture, Title, Media, App)
// ... [keeping all the original code]

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(
  gl,
  text,
  font = "bold 30px monospace",
  color = "black"
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  gl: any;
  plane: any;
  renderer: any;
  text: any;
  textColor: string;
  font: string;
  mesh: any;
  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = "#545050",
    font = "30px sans-serif",
  }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  extra: number;
  geometry: any;
  gl: any;
  image: any;
  index: any;
  length: any;
  renderer: any;
  scene: any;
  screen: any;
  text: any;
  viewport: any;
  bend: any;
  textColor: any;
  borderRadius: number;
  font: any;
  program: Program;
  plane: any;
  title: Title;
  x: any;
  speed: number;
  isBefore: boolean;
  isAfter: boolean;
  widthTotal: any;
  scale: number;
  padding: number;
  width: any;
  id: number;
  onClickCallback: Function | null;
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
    onClickCallback = null,
    id = index,
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.id = id;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.onClickCallback = onClickCallback;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        // Rounded box SDF for UV space
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          // Apply rounded corners (assumes vUv in [0,1])
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [
        img.naturalWidth,
        img.naturalHeight,
      ];
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    // Further reduced animation speed factor
    this.speed = (scroll.current - scroll.last) * 0.01; // Reduced from 0.02 to 0.01
    this.program.uniforms.uTime.value += 0.001; // Reduced from 0.002 to 0.001
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({ screen = this.screen, viewport = this.viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [
          this.viewport.width,
          this.viewport.height,
        ];
      }
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y =
      (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
  // Check if a point (screen coordinates) is inside this media item
  hitTest(x, y) {
    // Convert screen coordinates to clip space
    const clipX = (x / this.screen.width) * 2 - 1;
    const clipY = -((y / this.screen.height) * 2 - 1);

    // Get plane world position
    const planePos = this.plane.position;

    // Calculate boundaries in clip space
    const halfWidth = this.plane.scale.x / 2;
    const halfHeight = this.plane.scale.y / 2;

    // Apply rotation to make hit test work with curved items
    const cos = Math.cos(-this.plane.rotation.z);
    const sin = Math.sin(-this.plane.rotation.z);

    // Translate point to plane's local space
    const localX = (clipX - planePos.x) * cos - (clipY - planePos.y) * sin;
    const localY = (clipX - planePos.x) * sin + (clipY - planePos.y) * cos;

    // Simple AABB test
    return Math.abs(localX) < halfWidth && Math.abs(localY) < halfHeight;
  }
}

class App {
  container: any;
  scroll: { ease: number; current: number; target: number; last: number };
  onCheckDebounce: (...args: any[]) => void;
  renderer: Renderer;
  gl: any;
  camera: Camera;
  scene: Transform;
  planeGeometry: Plane;
  mediasImages: any;
  medias: any;
  screen: any;
  viewport: any;
  isDown: boolean;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  moveX: number;
  moveY: number;
  isDragging: boolean;
  moveThreshold: number;
  clickThreshold: number;
  raf: number;
  boundOnResize: any;
  boundOnWheel: any;
  boundOnTouchDown: any;
  boundOnTouchMove: any;
  boundOnTouchUp: any;
  boundOnClick: any;
  onClickCallback: Function | null;
  constructor(
    container,
    {
      items = [],
      bend = 1,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 30px DM Sans",
      onImageClick = null,
    } = { items: [], bend: 1 }
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    // Slow down the scrolling by reducing the ease factor
    this.scroll = { ease: 0.03, current: 0, target: 0, last: 0 }; // Reduced from 0.05 to 0.03
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.onClickCallback = onImageClick;

    // Initialize movement tracking variables
    this.startX = 0;
    this.startY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.isDragging = false;
    this.moveThreshold = 10; // Minimum movement to be considered a drag
    this.clickThreshold = 5; // Maximum movement to be considered a click

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({ alpha: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const defaultItems = [
      {
        image: "/images/daksha/Frame 326.png",
        text: "MX. DY",
        id: 1,
      },
      {
        image: "/images/daksha/Frame 323.png",
        text: "LA COUTURE",
        id: 2,
      },
      {
        image: "/images/daksha/Frame 322.png",
        text: "BAILAMO",
        id: 3,
      },
      {
        image: "/images/daksha/Frame 324.png",
        text: "EUPHONY",
        id: 4,
      },
      {
        image: "/images/daksha/Frame 330.png",
        text: "BLOOMER",
        id: 5,
      },
      {
        image: "/images/daksha/Frame 316.png",
        text: "BEAT THE SPOT",
        id: 6,
      },
      {
        image: "/images/daksha/Frame 329.png",
        text: "GROOVE",
        id: 7,
      },
      {
        image: "/images/daksha/Frame 320.png",
        text: "EL DUETO",
        id: 8,
      },
      {
        image: "/images/daksha/Frame 317.png",
        text: "ONE MIC STAND",
        id: 9,
      },
      {
        image: "/images/daksha/Frame 313.png",
        text: "JAM",
        id: 10,
      },
      {
        image: "/images/daksha/Frame 328.png",
        text: "CAMPUS AMBASSADOR",
        id: 11,
      },
      {
        image: "/images/esports/Frame 321.png",
        text: "BGMI",
        id: 12,

      },
      {
        image: "/images/esports/Insta 38.png",
        text: "VALORANT",
        id: 13,
        
      },

      {
        image: "/images/esports/Insta 39.png",
        text: "CODM",
        id: 14,
        
      },
      {
        image: "/images/esports/Frame 319.png",
        text: "E-FOOTBALL",
        id: 15,
        
      },   
      {
        image: "/images/esports/Frame 318.png",
        text: "FREEFIRE",
        id: 16,
        
      },
     ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        id: data.id || index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
        onClickCallback: this.onClickCallback,
      });
    });
  }
  onTouchDown(e) {
    this.isDown = true;
    this.isDragging = false;
    this.scroll.target = this.scroll.current;

    // Store both x and y coordinates
    this.startX = this.lastX = e.touches ? e.touches[0].clientX : e.clientX;
    this.startY = this.lastY = e.touches ? e.touches[0].clientY : e.clientY;
    this.moveX = 0;
    this.moveY = 0;
  }
  onTouchMove(e) {
    if (!this.isDown) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    // Calculate total movement in both directions
    this.moveX = this.startX - x;
    this.moveY = this.startY - y;

    // Only consider horizontal movement if it's greater than vertical movement
    // And only start dragging after passing the threshold
    if (
      Math.abs(this.moveX) > Math.abs(this.moveY) &&
      Math.abs(this.moveX) > this.moveThreshold
    ) {
      this.isDragging = true;

      // Further reduce sensitivity
      const sensitivity = 0.015; // Reduced from 0.025 to 0.015
      const distance = (this.lastX - x) * sensitivity;
      this.scroll.target = this.scroll.current + distance;
      this.lastX = x;
      this.lastY = y;
    }
  }
  onTouchUp(e) {
    this.isDown = false;

    // Handle click event if movement was minimal (below threshold)
    if (
      !this.isDragging &&
      Math.abs(this.moveX) < this.clickThreshold &&
      Math.abs(this.moveY) < this.clickThreshold
    ) {
      this.onClick(e);
    }

    this.isDragging = false;
    this.onCheck();
  }
  onClick(e) {
    if (!this.onClickCallback) return;

    const x = e.touches ? e.changedTouches[0].clientX : e.clientX;
    const y = e.touches ? e.changedTouches[0].clientY : e.clientY;

    // Find which media item was clicked
    for (const media of this.medias) {
      if (media.hitTest(x, y)) {
        // Call the callback with the media item's ID
        this.onClickCallback(media.id, media.text, media.image);
        break;
      }
    }
  }
  onWheel(e) {
    // Only respond to horizontal wheel events or when shift key is pressed
    if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Determine direction and use a smaller multiplier for smoother scrolling
      const delta =
        (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 0.3; // Reduced from 0.5 to 0.3
      this.scroll.target += delta;
      this.onCheckDebounce();
    }
  }
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
  }
  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnClick = this.onClick.bind(this);

    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("mousewheel", this.boundOnWheel, {
      passive: false,
    });
    window.addEventListener("wheel", this.boundOnWheel, { passive: false });
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown, {
      passive: true,
    });
    window.addEventListener("touchmove", this.boundOnTouchMove, {
      passive: true,
    });
    window.addEventListener("touchend", this.boundOnTouchUp);
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("mousewheel", this.boundOnWheel);
    window.removeEventListener("wheel", this.boundOnWheel);
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (
      this.renderer &&
      this.renderer.gl &&
      this.renderer.gl.canvas.parentNode
    ) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px DM Sans",
  onImageClick = null,
}) {
  const containerRef = useRef(null);
  const navigate = useNavigate(); // Use the useNavigate hook

  // Handle image click to navigate to EventRegistration
  const handleImageClick = (id, text, image) => {
    // If there's a custom onImageClick handler, call it first
    if (onImageClick) {
      onImageClick(id, text, image);
    }
    // Navigate to EventRegistration with the event ID
    navigate(`/event-registration/${id}`, { 
      state: { 
        eventId: id, 
        eventName: text, 
        eventImage: image 
      } 
    });
  };

  useEffect(() => {
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      onImageClick: handleImageClick, // Use our navigation handler
    });
    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, onImageClick, navigate]);

  return <div className="circular-gallery" ref={containerRef} />;
}