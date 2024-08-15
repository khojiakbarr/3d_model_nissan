import "./App.css";
import { useMemo, useRef, useState } from "react";
import { Canvas, ReactThreeFiber, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  // const vertices = new Float32Array([
  //   // Har bir nuqtaning x, y, z koordinatalari
  //   0,
  //   1,
  //   0, // Birinchi nuqta (yuqori)
  //   -1,
  //   -1,
  //   0, // Ikkinchi nuqta (chap)
  //   1,
  //   -1,
  //   0, // Uchinchi nuqta (o'ng)
  // ]);
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      // onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Model(props) {
  const { scene } = useGLTF("/models/nissan_skyline_gtr_r35.glb");
  // const light = new ReactThreeFiber.PointLight(0xff0000, 1, 100);
  // light.position.set(50, 50, 50);
  // scene.add(light);
  // const scene =useMemo
  // const gltf = useLoader(GLTFLoader, '/models/monkey.glb')
  return <primitive object={scene} position={[0, 0, 0]} />;
}

function App() {
  return (
    <div className="w-full h-screen bg-slate-400">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color={"white"} />
        <Model />
        <OrbitControls />
      </Canvas>
      {/* <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <OrbitControls />
      </Canvas> */}
    </div>
  );
}

export default App;
