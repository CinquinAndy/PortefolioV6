import { Book, Bookshelf } from "@/components/bookshelf";
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { ContentLink } from "@/components/content-link";
import { PageSection } from "@/components/page-section";
import { VideoCard } from "@/components/video-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Compass",
  description:
    "A collection of resources that can help you navigate uncertainty and make choices aligned with your values and goals.",
};

export default function Page() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Resources</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Resources
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        A collection of resources that can help you navigate uncertainty and
        make choices aligned with your values and goals.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Writing</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Learn to separate signal from noise, and instincts from impulses.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            <ContentLink
              type="article"
              title="The Illusion of Choice"
              description="How Modern Neuroscience Supports Determinism."
              href="#"
            />
            <ContentLink
              type="article"
              title="Beyond Free Will: A Brief History of Deterministic Philosophy"
              description="Tracing deterministic thought from ancient stoics to modern neuroscience."
              href="#"
            />
            <ContentLink
              type="article"
              title="Your Life Story Was Written Before You Were Born"
              description="How to fend off Nihilism when you have no agency."
              href="#"
            />
            <ContentLink
              type="article"
              title="5 Ways Your 'Free Will' is Actually Making You Miserable"
              description="How belief in choice creates unnecessary suffering in everyday life."
              href="#"
            />
            <ContentLink
              type="article"
              title="The Accountability Myth: Why Self-Blame Makes No Logical Sense"
              description="Examining the logical inconsistencies in holding yourself responsible."
              href="#"
            />
          </div>
        </PageSection>

        <PageSection title={<h2>Podcasts</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Compelling conversations from the forefathers of determinism and
            free will.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            <VideoCard
              title="Thus Spoke the Podcast: EP 272"
              subtitle="Friedrich Nietzsche"
              url="#"
              target="_blank"
              thumbnailUrl="https://assets.tailwindcss.com/templates/compass/nietzsche-thumbnail.png"
              duration={3720}
            />
            <VideoCard
              title="Monads & Mics with Mark Zuckerberg"
              subtitle="Gottfried Wilhelm Leibniz"
              url="#"
              target="_blank"
              thumbnailUrl="https://assets.tailwindcss.com/templates/compass/liebniz-thumbnail.png"
              duration={4454}
            />
            <VideoCard
              title="The John Locke Show"
              subtitle="Tabula Rasa Media"
              url="#"
              target="_blank"
              thumbnailUrl="https://assets.tailwindcss.com/templates/compass/locke-thumbnail.png"
              duration={5040}
            />
          </div>
        </PageSection>

        <PageSection title={<h2>Books</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            A carefully curated collection of books that explore the
            intersection of choice, purpose, and personal growth.
          </p>
          <Bookshelf className="mt-8">
            <Book
              title="I Was Always Going to Write This Book"
              author="Nora Flich"
              imageUrl="https://assets.tailwindcss.com/templates/compass/i-was-always-going-to-write-this-book.png"
              imageWidth={1024}
              imageHeight={1280}
              href="#"
            />
            <Book
              title="Preordained and Prosperous"
              author="Skylar Vonn"
              imageUrl="https://assets.tailwindcss.com/templates/compass/preordained-and-prosperous.png"
              imageWidth={1024}
              imageHeight={1536}
              href="#"
            />
            <Book
              title="Yes, But Why Did I Think That?"
              author="J. Ellington Splice, PhD"
              imageUrl="https://assets.tailwindcss.com/templates/compass/yes-but-why-did-i-think-that.png"
              imageWidth={1024}
              imageHeight={1425}
              href="#"
            />
            <Book
              title="The Responsibility Loophole"
              author="Dr. Frida Noone, PhD"
              imageUrl="https://assets.tailwindcss.com/templates/compass/the-responsiblity-loophole.png"
              imageWidth={1024}
              imageHeight={1356}
              href="#"
            />
            <Book
              title="The Path and the Passenger"
              author="Eleanor Vann"
              imageUrl="https://assets.tailwindcss.com/templates/compass/the-path-and-the-passenger.png"
              imageWidth={1024}
              imageHeight={1536}
              href="#"
            />
          </Bookshelf>
        </PageSection>

        <PageSection title={<h2>Tools</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Things I use to calm my mind and make decisions.
          </p>
          <div className="@container">
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 @2xl:grid-cols-2">
              <ContentLink
                type="tool"
                title="Deterministic Coin"
                description="A coin with heads on both sides."
                href="#"
              />
              <ContentLink
                type="tool"
                title="Magic 8-Ball"
                description={`Every answer is just the shrugging emoji.`}
                href="#"
              />
              <ContentLink
                type="tool"
                title="BetterHelp"
                description="Sometimes you just need to talk to someone."
                href="#"
              />
              <ContentLink
                type="tool"
                title="Post-it Notes"
                description="I use the green ones for my good ideas."
                href="#"
              />
              <ContentLink
                type="tool"
                title="The Mobius Decision Tree"
                description="A decision-making flowchart that always leads back to the same outcome."
                href="#"
              />
            </div>
          </div>
        </PageSection>
      </div>
    </CenteredPageLayout>
  );
}
