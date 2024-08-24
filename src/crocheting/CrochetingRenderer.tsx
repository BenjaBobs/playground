import { useRefsPopulatedEffect } from "@src/common/hooks/useRefsPopulatedEffect";
import { CrochetingData } from "@src/crocheting/CrochetingData";
import React, { useReducer } from "react";

export function CrochetingRenderer(props: { data?: CrochetingData }) {
  const rerender = useReducer((x) => x + 1, 0)[1];
  const svgRef = React.useRef<SVGSVGElement>(null);
  const patternData = React.useRef<CrochetingData>(
    props.data ?? new CrochetingData()
  ).current!;
  const viewData = React.useRef({
    offsetX: 0,
    offsetY: 0,
    scrollSpeed: 0.4,
    zoom: 50,
    zoomSpeed: 0.01,
    hoveredCell: null as { x: number; y: number } | null,
  }).current;

  useRefsPopulatedEffect(() => {
    const svg = svgRef.current!;

    function getCellFromEvent(event: { clientX: number; clientY: number }) {
      const rect = svg.getClientRects()[0];

      const cellX = Math.floor(
        (event.clientX - viewData.offsetX - rect.x) / viewData.zoom
      );
      const cellY = Math.floor(
        (event.clientY - viewData.offsetY - rect.y) / viewData.zoom
      );

      return { x: cellX, y: cellY };
    }

    const handleZoom = (event: WheelEvent) => {
      if (event.shiftKey) {
        viewData.zoom -= event.deltaY * viewData.zoomSpeed;
      } else {
        viewData.offsetX -= event.deltaX * viewData.scrollSpeed;
        viewData.offsetY -= event.deltaY * viewData.scrollSpeed;
      }

      viewData.hoveredCell = getCellFromEvent(event);

      rerender();
    };

    const handleMousePosition = (event: MouseEvent) => {
      if (event.type === "mouseleave") {
        viewData.hoveredCell = null;
      } else {
        viewData.hoveredCell = getCellFromEvent(event);
      }

      console.log(viewData.hoveredCell);

      rerender();
    };

    const handleClick = (event: MouseEvent) => {
      const clickedCell = getCellFromEvent(event);

      patternData.toggleCell(clickedCell.x, clickedCell.y);
      rerender();
    };

    svg.addEventListener("click", handleClick);
    svg.addEventListener("wheel", handleZoom);
    svg.addEventListener("mousemove", handleMousePosition);
    svg.addEventListener("mouseleave", handleMousePosition);

    return () => {
      svg.removeEventListener("click", handleClick);
      svg.removeEventListener("wheel", handleZoom);
      svg.removeEventListener("mousemove", handleMousePosition);
      svg.removeEventListener("mouseleave", handleMousePosition);
    };
  }, [svgRef]);

  function fitToView() {
    const rect = patternData.getBoundingRectangle();
    const svg = svgRef.current!;

    rect.minX -= 1;
    rect.minY -= 1;
    rect.maxX += 1;
    rect.maxY += 1;

    viewData.zoom = Math.min(
      svg.clientWidth / (rect.maxX - rect.minX),
      svg.clientHeight / (rect.maxY - rect.minY)
    );

    viewData.offsetX = rect.minX * viewData.zoom;
    viewData.offsetY = rect.minY * viewData.zoom;

    rerender();
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ position: "absolute", right: 10, top: 40 }}>
        <button onClick={fitToView}>fit to view</button>
      </div>
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "100%",
          backgroundSize: `${viewData.zoom}px ${viewData.zoom}px`,
          backgroundPositionX: `${viewData.offsetX}px`,
          backgroundPositionY: `${viewData.offsetY}px`,
          backgroundImage: `linear-gradient(to right, grey 1px, transparent 1px),linear-gradient(to bottom, grey 1px, transparent 1px)`,
        }}
      >
        {patternData.getCells().map((cell) => (
          <g key={"" + cell.x + cell.y}>
            <rect
              x={cell.x * viewData.zoom + viewData.offsetX}
              y={cell.y * viewData.zoom + viewData.offsetY}
              width={viewData.zoom}
              height={viewData.zoom}
              fill={cell.color}
            ></rect>
            <text
              x={cell.x * viewData.zoom + viewData.offsetX + viewData.zoom / 2}
              y={cell.y * viewData.zoom + viewData.offsetY + viewData.zoom / 2}
              width={viewData.zoom}
              height={viewData.zoom}
              fontSize={viewData.zoom}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {cell.content}
            </text>
          </g>
        ))}
        {viewData.hoveredCell && (
          <rect
            style={{ opacity: 0.1 }}
            x={viewData.hoveredCell.x * viewData.zoom + viewData.offsetX}
            y={viewData.hoveredCell.y * viewData.zoom + viewData.offsetY}
            width={viewData.zoom}
            height={viewData.zoom}
          ></rect>
        )}
      </svg>
    </div>
  );
}
