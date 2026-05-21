import { TopNav } from "@/components/top-nav";
import { Workspace } from "@/components/workspace";

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <TopNav />
      <Workspace />
    </div>
  );
}
