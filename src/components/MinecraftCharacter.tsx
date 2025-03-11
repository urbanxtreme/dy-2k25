
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface MinecraftCharacterProps {
  className?: string;
}

const MinecraftCharacter = ({ className = '' }: MinecraftCharacterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x99ccff);
    
    // Add fog for depth
    scene.fog = new THREE.FogExp2(0x99ccff, 0.05);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 1.8, 4);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 6;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Lighting
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
    sunLight.position.set(10, 10, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    scene.add(sunLight);
    
    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffaa, 0.3);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight);
    
    // Point light for character highlighting
    const characterLight = new THREE.PointLight(0xffffff, 0.5, 10);
    characterLight.position.set(0, 2, 0);
    scene.add(characterLight);

    // Ground plane - create a more interesting ground with texture
    const groundSize = 20;
    const planeGeometry = new THREE.PlaneGeometry(groundSize, groundSize, 32, 32);
    
    // Create grass texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw grass texture
      ctx.fillStyle = '#67C52A'; // Grass base color
      ctx.fillRect(0, 0, 64, 64);
      
      // Add some darker patches
      ctx.fillStyle = '#5CAF26';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * 64;
        const y = Math.random() * 64;
        const size = 4 + Math.random() * 8;
        ctx.fillRect(x, y, size, size);
      }
      
      // Add some lighter patches
      ctx.fillStyle = '#7AD43A';
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * 64;
        const y = Math.random() * 64;
        const size = 3 + Math.random() * 6;
        ctx.fillRect(x, y, size, size);
      }
    }
    
    const grassTexture = new THREE.CanvasTexture(canvas);
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(10, 10);
    
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      map: grassTexture,
      roughness: 0.8,
      metalness: 0.1
    });
    
    const plane = new THREE.Mesh(planeGeometry, groundMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Minecraft character - using cubes for blocky style
    // Helper function to create a textured cube
    const createTexturedCube = (width: number, height: number, depth: number, color: number, x: number, y: number, z: number) => {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      
      // Create a canvas for texture
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Main color
        ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        ctx.fillRect(0, 0, 128, 128);
        
        // Add some pixel noise for texture
        for (let i = 0; i < 200; i++) {
          const x = Math.floor(Math.random() * 128);
          const y = Math.floor(Math.random() * 128);
          const size = 1 + Math.floor(Math.random() * 2);
          const brightness = 0.8 + Math.random() * 0.4; // Slightly darker or lighter
          
          const r = parseInt(color.toString(16).padStart(6, '0').substr(0, 2), 16);
          const g = parseInt(color.toString(16).padStart(6, '0').substr(2, 2), 16);
          const b = parseInt(color.toString(16).padStart(6, '0').substr(4, 2), 16);
          
          const newR = Math.floor(r * brightness).toString(16).padStart(2, '0');
          const newG = Math.floor(g * brightness).toString(16).padStart(2, '0');
          const newB = Math.floor(b * brightness).toString(16).padStart(2, '0');
          
          ctx.fillStyle = `#${newR}${newG}${newB}`;
          ctx.fillRect(x, y, size, size);
        }
        
        // Add pixel border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, 128, 128);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      
      const material = new THREE.MeshStandardMaterial({ 
        map: texture,
        roughness: 0.7,
        metalness: 0.1
      });
      
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      cube.castShadow = true;
      cube.receiveShadow = true;
      
      return cube;
    };
    
    // Create character parts
    // Body
    const body = createTexturedCube(0.5, 0.7, 0.25, 0x3333cc, 0, 0.5, 0);
    scene.add(body);
    
    // Head
    const head = createTexturedCube(0.5, 0.5, 0.5, 0xffccaa, 0, 1.15, 0);
    scene.add(head);
    
    // Create face
    const faceCanvas = document.createElement('canvas');
    faceCanvas.width = 256;
    faceCanvas.height = 256;
    const faceCtx = faceCanvas.getContext('2d');
    
    if (faceCtx) {
      // Face background
      faceCtx.fillStyle = '#FFCCAA';
      faceCtx.fillRect(0, 0, 256, 256);
      
      // Eyes
      faceCtx.fillStyle = '#3333CC';
      faceCtx.fillRect(70, 100, 30, 30);
      faceCtx.fillRect(156, 100, 30, 30);
      
      // Mouth
      faceCtx.fillStyle = '#CC5555';
      faceCtx.fillRect(100, 160, 56, 20);
    }
    
    const faceTexture = new THREE.CanvasTexture(faceCanvas);
    faceTexture.magFilter = THREE.NearestFilter;
    faceTexture.minFilter = THREE.NearestFilter;
    
    // Apply face texture to front face
    const faceMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.7 }), // Right
      new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.7 }), // Left
      new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.7 }), // Top
      new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.7 }), // Bottom
      new THREE.MeshStandardMaterial({ map: faceTexture, roughness: 0.7 }), // Front
      new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.7 }), // Back
    ];
    
    const headWithFace = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      faceMaterials
    );
    headWithFace.position.set(0, 1.15, 0);
    headWithFace.castShadow = true;
    scene.add(headWithFace);
    scene.remove(head); // Remove the original head
    
    // Arms
    const leftArm = createTexturedCube(0.2, 0.6, 0.2, 0x3333cc, -0.35, 0.5, 0);
    scene.add(leftArm);
    
    const rightArm = createTexturedCube(0.2, 0.6, 0.2, 0x3333cc, 0.35, 0.5, 0);
    scene.add(rightArm);
    
    // Legs
    const leftLeg = createTexturedCube(0.2, 0.6, 0.2, 0x222299, -0.15, 0, 0);
    scene.add(leftLeg);
    
    const rightLeg = createTexturedCube(0.2, 0.6, 0.2, 0x222299, 0.15, 0, 0);
    scene.add(rightLeg);
    
    // Optional: Add a pickaxe or sword
    const handle = createTexturedCube(0.1, 0.5, 0.1, 0x8B5A2B, 0.5, 0.6, 0.2);
    scene.add(handle);
    
    const axeHead = createTexturedCube(0.2, 0.2, 0.1, 0xC8C8C8, 0.65, 0.8, 0.2);
    scene.add(axeHead);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate character parts
      const time = Date.now() * 0.001;
      
      // Subtle bob
      body.position.y = 0.5 + Math.sin(time * 2) * 0.05;
      headWithFace.position.y = 1.15 + Math.sin(time * 2) * 0.05;
      
      // Arm and leg swinging
      leftArm.position.y = 0.5 + Math.sin(time * 2) * 0.05;
      rightArm.position.y = 0.5 + Math.sin(time * 2) * 0.05;
      leftLeg.position.y = 0 + Math.sin(time * 2) * 0.05;
      rightLeg.position.y = 0 + Math.sin(time * 2) * 0.05;
      
      leftArm.rotation.x = Math.sin(time * 2) * 0.2;
      rightArm.rotation.x = Math.sin(time * 2 + Math.PI) * 0.2;
      leftLeg.rotation.x = Math.sin(time * 2 + Math.PI) * 0.2;
      rightLeg.rotation.x = Math.sin(time * 2) * 0.2;
      
      // Head movement
      headWithFace.rotation.y = Math.sin(time) * 0.1;
      
      // Pickaxe movement
      handle.position.y = 0.6 + Math.sin(time * 2) * 0.05;
      axeHead.position.y = 0.8 + Math.sin(time * 2) * 0.05;
      handle.rotation.z = Math.sin(time * 2) * 0.1;
      axeHead.rotation.z = Math.sin(time * 2) * 0.1;
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
    };
  }, []);
  
  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`w-full h-full ${className} rounded border-4 border-minecraft-stone shadow-lg`} 
        style={{ minHeight: '400px' }}
      ></div>
      
      <div className="absolute bottom-4 right-4 bg-minecraft-dirt/80 p-2 text-white text-xs rounded shadow">
        <p>Click & drag to rotate</p>
        <p>Scroll to zoom</p>
      </div>
    </div>
  );
};

export default MinecraftCharacter;
