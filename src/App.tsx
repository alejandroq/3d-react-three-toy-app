// good demo for aligning text, etc with elements: https://threejsfundamentals.org/threejs/lessons/threejs-align-html-elements-to-3d.html
// does not use @react-three, but could be translated.
import React, { PropsWithChildren, useState } from 'react';

// demo: https://codesandbox.io/s/rrppl0y8l4?file=/src/App.js
import { Canvas, ThreeEvent } from '@react-three/fiber';

// storybook: https://drei.pmnd.rs/?path=/story/shaders-stars--stars-st
import { OrbitControls, Stars, Line } from '@react-three/drei';

// use-cannon package can be used for physics

import './App.css';

function App() {
  return (
    <div className="App">
      <Dialog message="absolutely positioned" />
      <Boxes />
    </div>
  );
}

export default App;

interface BoxProps {
  position: [number, number, number];
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}
function Box({ position, onClick }: BoxProps) {
  const [hover, setHover] = useState(false);
  return (
    <mesh 
      position={position}
      onClick={onClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={hover ? "hotpink" : "orange"} />
    </mesh>
  )
}

interface DialogProps {
  message: string;
}
// frosted glass appearence: https://webdesign.tutsplus.com/tutorials/how-to-create-a-frosted-glass-effect-in-css--cms-32535
function Dialog({ message }: PropsWithChildren<DialogProps>) {
  return (
    <div style={{
      zIndex: 999,
      position: "absolute",
      padding: "1vh 5vw",
      backgroundColor: "rgba(255, 255, 255, .25)",
      backdropFilter: "blur(5px)",
      borderRadius: "5px",
      color: "white"
    }}>
      <p>{message}</p>
    </div>
  )
}

function Boxes() {
  return (
    <Canvas className="App-header">
      {/* @ts-ignore */}
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      {/* @ts-ignore */}
      <Line 
        points={[
          [0, 2, 0],
          [0, -2, 0],
          [2, 0, 0],
          [0, 0, 2],
        ]}
        lineWidth={1}
        dashed={false}
        color="pink"
      />
      <Box position={[0, 2, 0]} />
      <Box position={[0, -2, 0]} />
      <Box position={[2, 0, 0]} />
      <Box position={[0, 0, 2]} />
    </Canvas>
  )
}
