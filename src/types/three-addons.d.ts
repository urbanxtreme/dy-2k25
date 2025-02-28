
declare module 'three/addons/controls/OrbitControls.js' {
  import { Camera, EventDispatcher, Object3D } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(camera: Camera, domElement?: HTMLElement);
    
    enabled: boolean;
    target: Object3D;
    minDistance: number;
    maxDistance: number;
    minZoom: number;
    maxZoom: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    zoomSpeed: number;
    enableRotate: boolean;
    rotateSpeed: number;
    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    autoRotate: boolean;
    autoRotateSpeed: number;
    
    update(): boolean;
    dispose(): void;
  }
}

declare module 'three/addons/loaders/GLTFLoader.js' {
  import { AnimationClip, Camera, Group, Loader, LoadingManager, Object3D, Scene } from 'three';
  
  export interface GLTF {
    animations: AnimationClip[];
    scene: Scene;
    scenes: Scene[];
    cameras: Camera[];
    asset: {
      copyright?: string;
      generator?: string;
      version?: string;
      minVersion?: string;
      extensions?: any;
      extras?: any;
    };
    parser: any;
    userData: any;
  }
  
  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    
    parse(
      data: ArrayBuffer | string,
      path: string,
      onLoad: (gltf: GLTF) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

declare module 'gsap/ScrollTrigger' {
  import { Plugin } from 'gsap/gsap-core';
  
  export interface ScrollTriggerInstance {
    scroll(): number;
    progress: number;
    animation?: gsap.core.Animation;
    trigger: Element;
    start: number;
    end: number;
    kill(reset?: boolean): void;
    refresh(): void;
    disable(): void;
    enable(): void;
  }
  
  export interface ScrollTriggerStatic extends Plugin {
    create(vars: ScrollTriggerVars): ScrollTriggerInstance;
    refresh(safe?: boolean): void;
    update(reset?: boolean): void;
    clearScrollMemory(): void;
    getAll(): ScrollTriggerInstance[];
    kill(reset?: boolean): void;
    disable(reset?: boolean, allowAnimation?: boolean): void;
    enable(reset?: boolean, refresh?: boolean): void;
    isScrolling(): boolean;
    scrollerProxy(target: Element | Window | string, vars?: object): void;
    getVelocity(scrollerOrElement?: Element | Window | string): number;
    defaults(obj: object): void;
    addEventListener(type: string, callback: Function): void;
    removeEventListener(type: string, callback: Function): void;
  }
  
  export interface ScrollTriggerVars {
    trigger?: Element | string;
    start?: string | number | Function;
    end?: string | number | Function;
    scroller?: Element | Window | string;
    scrub?: boolean | number;
    toggleActions?: string;
    toggleClass?: string;
    markers?: boolean;
    onEnter?: Function;
    onLeave?: Function;
    onEnterBack?: Function;
    onLeaveBack?: Function;
    onRefresh?: Function;
    onUpdate?: Function;
    pin?: boolean | Element | string;
    pinSpacing?: boolean | string;
    anticipatePin?: number;
    horizontal?: boolean;
    animation?: gsap.core.Animation;
    once?: boolean;
    snap?: number | Array<number> | Function;
    pinReparent?: boolean;
    id?: string;
    endTrigger?: Element | string;
    invalidateOnRefresh?: boolean;
  }
  
  export const ScrollTrigger: ScrollTriggerStatic;
}
