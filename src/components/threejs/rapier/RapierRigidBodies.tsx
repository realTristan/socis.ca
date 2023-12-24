import {
  InstancedRigidBodies,
  type InstancedRigidBodyProps,
} from "@react-three/rapier";
import { generateSphereInstances } from "./generateSphereInstances";
import { grayMaterial, numberOfSphereInstances } from "./constants";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export function RapierRigidBodies() {
  const instances: InstancedRigidBodyProps[] = generateSphereInstances(
    numberOfSphereInstances,
  );

  // Store reference
  const ref = useRef<any>();

  // For each frame
  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.forEach((sphere: any) => {
      sphere.applyImpulse(
        new Vector3()
          .copy(sphere.translation())
          .normalize()
          .multiplyScalar(-400 * delta),
      );
    });
  });

  // InstancedRigidBodies is multiple rigid bodies
  return (
    <InstancedRigidBodies
      ref={ref}
      linearDamping={0.65}
      angularDamping={0.95}
      instances={instances}
    >
      <instancedMesh
        args={[undefined, undefined, numberOfSphereInstances]}
        material={grayMaterial}
        castShadow
      >
        <sphereGeometry args={[0.7, 32, 32]} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
