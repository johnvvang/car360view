import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ color }) {
  const model = useGLTF("/free_car_001.gltf"); // Load model from public folder

  useEffect(() => {
    // Assuming the model has a mesh with a material
    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(color); // Set the color to the selected color
      }
    });
  }, [model, color]);

  return <primitive object={model.scene} scale={1} />;
}

export default function App() {
  const [color, setColor] = useState("#FF0000"); // Default color is red

  return (
    <div style={{ height: "100vh", background: "#000" }}>
      <h1 style={{ color: "white", textAlign: "center", padding: "10px" }}>
        My Start Up
      </h1>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Model color={color} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
