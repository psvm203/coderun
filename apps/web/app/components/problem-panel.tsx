const TABS = ["문제", "해설", "제출 기록", "토론"] as const;

export function ProblemPanel() {
  return (
    <section className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-hairline-dark bg-canvas-night-soft">
      <div className="flex h-13 shrink-0 items-center gap-1.5 border-b border-hairline-dark px-3 text-[16px]">
        {TABS.map((tab, i) => (
          <div key={tab} className="flex h-full items-center gap-1.5">
            {i > 0 && (
              <div aria-hidden className="h-4 w-px bg-hairline-dark-strong" />
            )}
            <button
              className={
                i === 0
                  ? "relative h-full px-4 font-bold text-on-dark after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary"
                  : "h-full px-4 font-bold text-ink-mute hover:text-on-dark"
              }
            >
              {tab}
            </button>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6 text-[18px] leading-[1.6] text-on-dark/90">
        <p className="text-ink-mute">불러오는 중...</p>
      </div>
    </section>
  );
}
