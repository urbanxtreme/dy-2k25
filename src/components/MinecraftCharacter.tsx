
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

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 1.5, 4);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Ground plane
    const planeGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
    const planeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x67C52A 
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Minecraft character - using a cube as placeholder
    // In a real implementation, you would load a GLTF model
    const loader = new GLTFLoader();
    
    // Create a temporary cube while the model loads
    const cubeGeometry = new THREE.BoxGeometry(0.5, 1, 0.25);
    const headGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const limbGeometry = new THREE.BoxGeometry(0.25, 0.5, 0.25);
    
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x3333cc });
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffccaa });
    const limbMaterial = new THREE.MeshStandardMaterial({ color: 0x3333cc });
    
    // Body
    const body = new THREE.Mesh(cubeGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    scene.add(body);
    
    // Head
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.25;
    head.castShadow = true;
    scene.add(head);
    
    // Arms
    const leftArm = new THREE.Mesh(limbGeometry, limbMaterial);
    leftArm.position.set(-0.375, 0.5, 0);
    leftArm.castShadow = true;
    scene.add(leftArm);
    
    const rightArm = new THREE.Mesh(limbGeometry, limbMaterial);
    rightArm.position.set(0.375, 0.5, 0);
    rightArm.castShadow = true;
    scene.add(rightArm);
    
    // Legs
    const leftLeg = new THREE.Mesh(limbGeometry, limbMaterial);
    leftLeg.position.set(-0.125, 0, 0);
    leftLeg.castShadow = true;
    scene.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(limbGeometry, limbMaterial);
    rightLeg.position.set(0.125, 0, 0);
    rightLeg.castShadow = true;
    scene.add(rightLeg);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate character parts
      const time = Date.now() * 0.001;
      
      // Subtle bob
      body.position.y = 0.5 + Math.sin(time * 2) * 0.05;
      head.position.y = 1.25 + Math.sin(time * 2) * 0.05;
      
      // Arm and leg swinging
      leftArm.rotation.x = Math.sin(time * 2) * 0.2;
      rightArm.rotation.x = Math.sin(time * 2 + Math.PI) * 0.2;
      leftLeg.rotation.x = Math.sin(time * 2 + Math.PI) * 0.2;
      rightLeg.rotation.x = Math.sin(time * 2) * 0.2;
      
      // Head movement
      head.rotation.y = Math.sin(time) * 0.1;
      
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
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`} 
      style={{ minHeight: '400px' }}
    ></div>
  );
};

export default MinecraftCharacter;
