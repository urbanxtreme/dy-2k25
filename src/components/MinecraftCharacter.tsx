import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface MinecraftCharacterProps {
  className?: string;
}

const MinecraftCharacter = ({ className = "" }: MinecraftCharacterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Sky Background
    const skyColor = new THREE.Color(0x87CEEB);
    const groundColor = new THREE.Color(0x228B22);
    scene.background = skyColor;
    scene.fog = new THREE.Fog(skyColor, 5, 15);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 8, 25);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Create 3D Image Frame
    const create3DImage = (texture: THREE.Texture) => {
      const aspectRatio = texture.image.width / texture.image.height;
      const depth = 0.2;
      
      // Create box geometry with image on front/back
      const geometry = new THREE.BoxGeometry(3 * aspectRatio, 3, depth);
      
      // Brighter materials
      const frontMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        emissive: 0x444444,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide
      });

      const edgeMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        emissive: 0x888888,
        emissiveIntensity: 0.3
      });

      const materials = [
        edgeMaterial, // Right
        edgeMaterial, // Left
        edgeMaterial, // Top
        edgeMaterial, // Bottom
        frontMaterial, // Front
        frontMaterial // Back
      ];

      const imageFrame = new THREE.Mesh(geometry, materials);
      imageFrame.castShadow = true;
      imageFrame.receiveShadow = true;
      imageFrame.position.set(0, 1.5, 0);
      scene.add(imageFrame);
    };

    // Load image texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/images/DY25.png", (texture) => {
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      create3DImage(texture);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create grassy ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundTexture = new THREE.CanvasTexture(createGrassTexture());
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(10, 10);

    const groundMaterial = new THREE.MeshStandardMaterial({
      map: groundTexture,
      roughness: 0.9,
      metalness: 0.1
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Add clouds
    const cloudGeometry = new THREE.SphereGeometry(1, 32, 32);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });

    for(let i = 0; i < 5; i++) {
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloud.position.set(
        Math.random() * 15 - 7.5,
        5 + Math.random() * 3,
        Math.random() * 15 - 7.5
      );
      cloud.scale.set(0.5 + Math.random(), 0.2, 0.5 + Math.random());
      scene.add(cloud);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  // Helper function to create grass texture
  const createGrassTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Base grass color
      ctx.fillStyle = '#2d5a27';
      ctx.fillRect(0, 0, 256, 256);

      // Add grass blades
      ctx.strokeStyle = '#3c6b32';
      ctx.lineWidth = 2;
      for(let i = 0; i < 100; i++) {
        ctx.beginPath();
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        ctx.moveTo(x, y);
        ctx.lineTo(x + (Math.random() - 0.5) * 10, y - 10);
        ctx.stroke();
      }
    }
    return canvas;
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`w-full h-full ${className} rounded border-4 border-minecraft-stone shadow-lg`}
        style={{ minHeight: "400px" }}
      ></div>

      <div className="absolute bottom-4 right-4 bg-minecraft-dirt/80 p-2 text-white text-xs rounded shadow">
        <p>Click & drag to rotate</p>
        <p>Scroll to zoom</p>
      </div>
    </div>
  );
};

export default MinecraftCharacter;