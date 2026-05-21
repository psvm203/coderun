"use client";

import { useEffect, useRef, useState } from "react";
import type { OnMount } from "@monaco-editor/react";

import { CodeEditor } from "./code-editor";

const MIN_PCT = 20;
const MAX_PCT = 80;
const HANDLE_PX = 12;
const DEFAULT_EDITOR_PCT = 60;

const LANGUAGES = ["python", "cpp", "java", "js"] as const;
type Language = (typeof LANGUAGES)[number];

const LANGUAGE_LABEL: Record<Language, string> = {
  python: "Python",
  cpp: "C++",
  java: "Java",
  js: "JavaScript",
};

const MONACO_LANG: Record<Language, string> = {
  python: "python",
  cpp: "cpp",
  java: "java",
  js: "javascript",
};

export function EditorPanel({ onResetLayout }: { onResetLayout: () => void }) {
  const [language, setLanguage] = useState<Language>("python");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [editorPct, setEditorPct] = useState(DEFAULT_EDITOR_PCT);
  const [consoleDragging, setConsoleDragging] = useState(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === "Backquote") {
        e.preventDefault();
        setConsoleOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!consoleDragging) return;
    const onMove = (e: MouseEvent) => {
      const rect = splitContainerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pct = ((e.clientY - rect.top) / rect.height) * 100;
      setEditorPct(Math.min(MAX_PCT, Math.max(MIN_PCT, pct)));
    };
    const onUp = () => setConsoleDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [consoleDragging]);

  useEffect(() => {
    if (!langMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!langMenuRef.current?.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [langMenuOpen]);

  return (
    <section className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-hairline-dark bg-canvas-night">
      <div className="flex h-13 shrink-0 items-center justify-between border-b border-hairline-dark px-4 text-[16px]">
        <div ref={langMenuRef} className="relative">
          <button
            onClick={() => setLangMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-on-dark hover:bg-canvas-night-soft"
          >
            <span>{LANGUAGE_LABEL[language]}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {langMenuOpen && (
            <div className="absolute top-full left-0 z-10 mt-1 min-w-32 rounded-md border border-hairline-dark bg-canvas-night-soft py-1 shadow-lg">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLanguage(l);
                    setLangMenuOpen(false);
                  }}
                  className={`block w-full px-3 py-1.5 text-left hover:bg-canvas-night-lifted ${
                    l === language
                      ? "font-medium text-on-dark"
                      : "text-ink-mute hover:text-on-dark"
                  }`}
                >
                  {LANGUAGE_LABEL[l]}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-ink-mute">
          <button
            onClick={() => {
              onResetLayout();
              setEditorPct(DEFAULT_EDITOR_PCT);
            }}
            className="rounded-md p-2 hover:bg-canvas-night-soft hover:text-on-dark"
            aria-label="레이아웃 초기화"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="8" height="16" rx="1" />
              <rect x="13" y="4" width="8" height="16" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={splitContainerRef} className="flex min-h-0 flex-1 flex-col">
        <div
          className="min-h-0"
          style={{
            height: consoleOpen
              ? `calc(${editorPct}% - ${HANDLE_PX / 2}px)`
              : "100%",
          }}
        >
          <CodeEditor
            key={language}
            code=""
            language={MONACO_LANG[language]}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>

        {consoleOpen && (
          <>
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setConsoleDragging(true);
              }}
              className="group flex h-3 shrink-0 cursor-row-resize items-center justify-center"
            >
              <div
                className={`h-0.75 w-10 rounded-full bg-hairline-dark transition-opacity ${
                  consoleDragging
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </div>

            <div
              className="flex min-h-0 flex-col"
              style={{
                height: `calc(${100 - editorPct}% - ${HANDLE_PX / 2}px)`,
              }}
            >
              <div className="flex h-13 shrink-0 items-center gap-1.5 border-y border-hairline-dark px-3 text-[16px]">
                <span className="px-4 font-medium text-on-dark">
                  테스트 케이스
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-hairline-dark px-4 py-3">
        <button
          onClick={() => setConsoleOpen((o) => !o)}
          className="flex items-center gap-2 rounded-md px-3 py-1.5 text-[16px] font-medium text-on-dark hover:bg-canvas-night-soft"
        >
          <span>콘솔</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={consoleOpen ? "" : "rotate-180"}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
