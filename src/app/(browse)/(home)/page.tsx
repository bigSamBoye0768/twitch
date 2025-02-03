import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full px-4 h-full overflow-y-auto max-w-screen-2xl py-4 pb-8 mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
