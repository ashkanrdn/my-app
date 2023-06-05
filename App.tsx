import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Canvas,
  useRender,
  useFrame,
  useUpdate,
  useThree,
  useResource,
  useLoader,
  extend,
} from "@react-three/fiber/native";
import useControls from "r3f-native-orbitcontrols";
import { default as skeleton_joints } from "./joints.json";
import { BufferAttribute, Camera } from "three";
import {
  Sphere,
  Line,
  TransformControls,
  PositionPoint,
  Grid,
  RoundedBox,
  CameraControls,
  GizmoHelper,
  GizmoViewport,
  Bounds,
} from "@react-three/drei/native";

import { Selection, Select, EffectComposer, Outline } from "@react-three/postprocessing";
import { View } from "react-native";

const joint_edges = [
  [9, 10],
  [9, 8],
  [6, 5],
  [12, 11],
  [12, 13],
  [4, 5],
  [4, 0],
  [11, 8],
  [8, 14],
  [8, 7],
  [0, 1],
  [0, 7],
  [3, 2],
  [15, 14],
  [15, 16],
  [1, 2],
];

function Spheres({ coordinates }) {
  const [coords, setCords] = useState();

  const coordinatess = [
    [0.4044077396392822, 0.8153276443481445, 0.78776615858078],
    [0.39452123641967773, 0.8112144470214844, 0.8406501412391663],
    [0.30950140953063965, 0.7628564834594727, 0.39129114151000977],
    [0.5509499311447144, 0.7566909790039062, 0.4103870391845703],
    [0.3839189112186432, 0.8248443603515625, 0.7360175251960754],
    [0.6190571784973145, 0.8072099685668945, 0.5486236810684204],
    [0.681636393070221, 0.9048948287963867, 0.5543670654296875],
    [0.31738758087158203, 0.3864421844482422, 0.1120002269744873],
    [0.2624603509902954, 0.30593323707580566, 0.044455744326114655],
    [0.2680203914642334, 0.3402397632598877, 0.030467361211776733],
    [0.1784922480583191, 0.2216423749923706, 0.024767741560935974],
    [0.19594383239746094, 0.2953226566314697, 0.048930466175079346],
    [0.13135862350463867, 0.3231525421142578, 0.05800223350524902],
    [0.15307405591011047, 0.4093918800354004, 0.05055868625640869],
    [0.3570723533630371, 0.33829617500305176, 0.05155950039625168],
    [0.7547447681427002, 0.3737061023712158, 0.05684661865234375],
    [0.8296939730644226, 0.4940609931945801, 0.05131375789642334],
  ];
  useEffect(() => {
    // Update the document title using the browser API
    setCords(coordinates);
  }),
    [coords];

  return (
    // <>
    //   {coordinates.map((coord, index) => (
    //     <Sphere key={index} args={[0.1, 16, 16]} position={[coord[0], coord[1], coord[2]]} />
    //   ))}
    // </>

    <>
      <group scale={new THREE.Vector3(1.2, 1.2, 1.2)}>
        {coordinates.map((coord, index) => (
          <Sphere key={index} args={[0.01, 16, 16]} position={[coord[0], coord[1], coord[2]]}>
            <meshStandardMaterial emissive='#BFBEBE' emissiveIntensity={1} toneMapped={false} />
          </Sphere>
        ))}
        {joint_edges.map(([startIdx, endIdx], index) => (
          <Line key={index} points={[coordinates[startIdx], coordinates[endIdx]]} color='#D7D7D7' lineWidth={3} />
        ))}
      </group>
    </>
  );
}

export default function App() {
  // const [data, setData] = useState(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const coordinatess = [
    [0.4044077396392822, 0.8153276443481445, 0.78776615858078],
    [0.39452123641967773, 0.8112144470214844, 0.8406501412391663],
    [0.30950140953063965, 0.7628564834594727, 0.39129114151000977],
    [0.5509499311447144, 0.7566909790039062, 0.4103870391845703],
    [0.3839189112186432, 0.8248443603515625, 0.7360175251960754],
    [0.6190571784973145, 0.8072099685668945, 0.5486236810684204],
    [0.681636393070221, 0.9048948287963867, 0.5543670654296875],
    [0.31738758087158203, 0.3864421844482422, 0.1120002269744873],
    [0.2624603509902954, 0.30593323707580566, 0.044455744326114655],
    [0.2680203914642334, 0.3402397632598877, 0.030467361211776733],
    [0.1784922480583191, 0.2216423749923706, 0.024767741560935974],
    [0.19594383239746094, 0.2953226566314697, 0.048930466175079346],
    [0.13135862350463867, 0.3231525421142578, 0.05800223350524902],
    [0.15307405591011047, 0.4093918800354004, 0.05055868625640869],
    [0.3570723533630371, 0.33829617500305176, 0.05155950039625168],
    [0.7547447681427002, 0.3737061023712158, 0.05684661865234375],
    [0.8296939730644226, 0.4940609931945801, 0.05131375789642334],
  ];
  // const [cords, setCords] = useState(coordinates);
  // setCords(coordinates);
  // const coordinates = [
  //   { x: 0, y: 0, z: 0 },
  //   { x: 1, y: 1, z: 1 },
  //   { x: -1, y: -1, z: -1 },
  // ];
  const [OrbitControls, events] = useControls();
  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas camera={{ fov: 35, zoom: 1, near: 1, far: 1000, position: [2, 5, 1] }}>
        <OrbitControls />
        <color attach='background' args={["#7E7E7E"]} />
        <Grid followCamera={true} cellColor={"white"} infiniteGrid={true} />
        <ambientLight color={"red"} intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Bounds fit clip margin={2} damping={0}>
          <Spheres coordinates={coordinatess} />
        </Bounds>
      </Canvas>
    </View>
  );
}
