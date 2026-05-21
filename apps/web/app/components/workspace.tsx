"use client";

import { useEffect, useRef, useState } from "react";
import { EditorPanel } from "./editor-panel";
import { ProblemPanel } from "./problem-panel";

const MIN_PCT = 20;
const MAX_PCT = 80;
const HANDLE_PX = 12;
const DEFAULT_PROBLEM_PCT = 50;

export function Workspace() {
  const [problemPct, setProblemPct] = useState(DEFAULT_PROBLEM_PCT);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setProblemPct(Math.min(MAX_PCT, Math.max(MIN_PCT, pct)));
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [dragging]);

  return (
    <div ref={containerRef} className="flex min-h-0 flex-1 p-2">
      <div
        className="min-w-0"
        style={{ width: `calc(${problemPct}% - ${HANDLE_PX / 2}px)` }}
      >
        <ProblemPanel />
      </div>

      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        className="group flex w-3 shrink-0 cursor-col-resize items-center justify-center"
      >
        <div
          className={`h-10 w-0.75 rounded-full bg-hairline-dark transition-opacity ${
            dragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />
      </div>

      <div
        className="min-w-0"
        style={{ width: `calc(${100 - problemPct}% - ${HANDLE_PX / 2}px)` }}
      >
        <EditorPanel onResetLayout={() => setProblemPct(DEFAULT_PROBLEM_PCT)} />
      </div>
    </div>
  );
}
