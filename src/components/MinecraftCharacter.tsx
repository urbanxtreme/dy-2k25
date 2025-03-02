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
    scene.background = new THREE.Color(0xffffff); // Pure white background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth * 1.1 / containerRef.current.clientHeight * 1.1,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

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
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 8;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    // Create 3D Image
    const create3DImage = (texture: THREE.Texture) => {
      const aspectRatio = texture.image.width / texture.image.height;
      const geometry = new THREE.PlaneGeometry(4 * aspectRatio, 4); // Increased size from 4 to 6
      
      // Create double-sided material
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        roughness: 0.1,
        metalness: 0.1
      });

      const imageMesh = new THREE.Mesh(geometry, material);
      scene.add(imageMesh);
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

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

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`w-full h-full ${className}`}
        style={{ minHeight: "600px", marginTop: "-80px" }} // Increased minHeight and added negative margin
      ></div>

      <div className="absolute bottom-4 right-4 bg-white/80 p-2 text-black text-xs rounded shadow-lg">
        <p>Click & drag to rotate</p>
        <p>Scroll to zoom</p>
      </div>
    </div>
  );
};

export default MinecraftCharacter;