import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { VideoCard } from "@/components/video-card";
import { getInterviews } from "@/data/interviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interviews - Compass",
  description: "Explore interviews with industry experts and thought leaders.",
};

export default async function InterviewsPage() {
  let interviews = await getInterviews();

  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Interviews</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Interviews
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-700 dark:text-gray-400">
        Explore interviews with industry experts and thought leaders.
      </p>
      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 pb-32 sm:grid-cols-2 xl:grid-cols-3">
        {interviews.map((interview) => (
          <VideoCard
            key={interview.id}
            url={`/interviews/${interview.id}`}
            thumbnailUrl={interview.video.thumbnail}
            videoUrl={interview.video.sd}
            duration={interview.video.duration}
            title={interview.name}
            subtitle={interview.subtitle}
          />
        ))}
      </div>
    </CenteredPageLayout>
  );
}
