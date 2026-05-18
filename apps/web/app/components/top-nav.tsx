"use client";

export function TopNav() {
  return (
    <header className="flex shrink-0 items-center justify-between bg-canvas-night px-5">
      <div
        className="text-2xl font-bold tracking-tighter"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        <span className="text-on-dark">Code</span>
        <span className="text-primary">Run</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-md border border-hairline bg-canvas-night-soft px-4 py-2 text-[16px] font-medium text-on-dark hover:bg-canvas-night">
          로그인
        </button>
        <button className="rounded-md bg-primary px-4 py-2 text-[16px] font-medium text-on-primary hover:bg-primary-deep">
          회원가입
        </button>
      </div>
    </header>
  );
}
