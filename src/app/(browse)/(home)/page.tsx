import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/nextjs";
import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full h-full max-w-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
