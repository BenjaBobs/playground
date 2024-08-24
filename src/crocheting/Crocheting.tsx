import { CrochetingRenderer } from "@src/crocheting/CrochetingRenderer";

export function Crocheting() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        height: "99.39%",
      }}
    >
      <CrochetingRenderer />
    </div>
  );
}
