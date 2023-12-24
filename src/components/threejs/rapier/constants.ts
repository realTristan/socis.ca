import { MeshLambertMaterial } from "three";

export const grayMaterial = new MeshLambertMaterial({
  color: "#1c1c1c",
  emissive: "#1c1c1c",
});

export const emeraldMaterial = new MeshLambertMaterial({
  color: "#10b981",
  emissive: "#10b981",
});

export const randomMaterial = () => {
  const colors = ["#10b981", "#1c1c1c"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return new MeshLambertMaterial({
    color,
    emissive: color,
  });
};

export const numberOfSphereInstances = 7;
