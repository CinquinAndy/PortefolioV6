export type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  video: {
    thumbnail: string;
    duration: number;
    url: string;
  } | null;
};

export function getModules(): Module[] {
  return lessons;
}

export async function getLesson(
  slug: string,
): Promise<(Lesson & { module: Module; next: Lesson | null }) | null> {
  let module = lessons.find(({ lessons }) =>
    lessons.some(({ id }) => id === slug),
  );

  if (!module) {
    return null;
  }

  let index = module.lessons.findIndex(({ id }) => id === slug);

  return {
    ...module.lessons[index],
    module,
    next: index < module.lessons.length - 1 ? module.lessons[index + 1] : null,
  };
}

export async function getLessonContent(slug: string) {
  return (await import(`@/data/lessons/${slug}.mdx`)).default;
}

const lessons = [
  {
    id: "orientation",
    title: "Orientation: Understanding Where You Are",
    description:
      "You need to know where you're starting from, before you can pretend to decide where you're going.",
    lessons: [
      {
        id: "landscape-of-choice",
        title: "The Landscape of Choice",
        description:
          "A practical map for navigating the illusion that you actually have any agency at all.",
        video: {
          duration: 876,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-01.png",
          url: "https://assets.tailwindcss.com/templates/compass/landscape-of-choice.mp4",
        },
      },
      {
        id: "paradox-of-agency",
        title: "The Paradox of Agency",
        description:
          "Explore whether you're living your life or just reacting to everyone else's.",
        video: null,
      },
      {
        id: "liberation-from-regret",
        title: "Liberation from Regret",
        description:
          "If no alternative choice was ever possible, regret becomes logically unnecessary.",
        video: {
          duration: 947,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-02.png",
          url: "https://assets.tailwindcss.com/templates/compass/liberation-from-regret.mp4",
        },
      },
      {
        id: "recognizing-patterns",
        title: "Recognizing Patterns",
        description:
          "Failures weren't freely chosen but were inevitable given your circumstances.",
        video: null,
      },
      {
        id: "values-and-goals",
        title: "Values and Goals",
        description:
          "Identify patterns in your interests and abilities that reveal your predetermined direction.",
        video: {
          duration: 1328,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-04.png",
          url: "https://assets.tailwindcss.com/templates/compass/values-and-goals.mp4",
        },
      },
    ],
  },
  {
    id: "direction",
    title: "Direction: Choosing a Path",
    description:
      "Experience the sensation of choice without the burden of true responsibility.",
    lessons: [
      {
        id: "mapping-causal-factors",
        title: "Mapping the Causal Factors",
        description:
          "The causes acting on you can give you insight into where they might take you.",
        video: {
          duration: 892,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-03.png",
          url: "https://assets.tailwindcss.com/templates/compass/mapping-causal-factors.mp4",
        },
      },
      {
        id: "reframing-uncertainty",
        title: "Reframing Uncertainty as Agency",
        description:
          "If you squint, not being able to predict the future looks sort of like free will.",
        video: null,
      },
      {
        id: "decision-paralysis",
        title: "Overcoming Decision Paralysis",
        description:
          "You can't be paralysed by choices you don't actually have.",
        video: null,
      },
      {
        id: "path-of-least-resistance",
        title: "Perceiving the Path of Least Resistance",
        description:
          "Recognizing which direction requires the least psychological struggle.",
        video: {
          duration: 1147,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-01.png",
          url: "https://assets.tailwindcss.com/templates/compass/path-of-least-resistance.mp4",
        },
      },
      {
        id: "surrendering-outcome",
        title: "Surrendering to the Outcome",
        description:
          "Accepting that whatever path you choose has no bearing on where you'll go.",
        video: {
          duration: 1423,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-05.png",
          url: "https://assets.tailwindcss.com/templates/compass/surrendering-outcome.mp4",
        },
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation: Steering Through the Inevitable",
    description:
      "Techniques for aligning with your inevitable trajectory while avoiding nihilism.",
    lessons: [
      {
        id: "widening-field-of-view",
        title: "Widening Your Field of View",
        description:
          "The universe can be cruel and it's important to see that coming.",
        video: {
          duration: 934,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-02.png",
          url: "https://assets.tailwindcss.com/templates/compass/widening-field-of-view.mp4",
        },
      },
      {
        id: "dealing-with-coincidence",
        title: "Dealing with Coincidence",
        description:
          "If something does go the way you intended, realize that this was purely coincidental.",
        video: null,
      },
      {
        id: "forgiving-others",
        title: "Forgiving Others",
        description:
          "When actions are beyond one's control, punishment is illogical.",
        video: null,
      },
      {
        id: "anxiety-messages",
        title: "What Anxiety Is Trying to Tell You",
        description:
          "A lack of control can make you anxious, but realize this has no bearing on outcomes.",
        video: null,
      },
      {
        id: "maintaining-self",
        title: "Maintaining a Sense of Self",
        description:
          "Who you think you are has been assigned to you by circumstance.",
        video: null,
      },
    ],
  },
  {
    id: "destination",
    title: "Destination: Arriving Where You Must",
    description:
      "How to be content with the inconsequential destiny you've been given.",
    lessons: [
      {
        id: "reframing-achievement",
        title: "Reframing Achievement and Failure",
        description:
          "Pride and regret are just psychological coping mechanisms.",
        video: null,
      },
      {
        id: "surrendering-to-success",
        title: "Surrendering to Success",
        description:
          "Achievements reveal capabilities that were always present rather than self development.",
        video: {
          duration: 1247,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-02.png",
          url: "https://assets.tailwindcss.com/templates/compass/surrendering-to-success.mp4",
        },
      },
      {
        id: "giving-credit",
        title: "Giving Credit Where it's Due",
        description:
          "Recognize the broader system that produced your achievement.",
        video: {
          duration: 967,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-04.png",
          url: "https://assets.tailwindcss.com/templates/compass/giving-credit.mp4",
        },
      },
      {
        id: "unburden-accountability",
        title: "Unburden Yourself from Accountability",
        description:
          "When things haven't gone your way, it literally couldn't have been your fault.",
        video: {
          duration: 1123,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-05.png",
          url: "https://assets.tailwindcss.com/templates/compass/unburden-accountability.mp4",
        },
      },
      {
        id: "writing-autobiography",
        title: "Exercise: Writing your autobiography",
        description: "A way to come to grips with your inconsequence.",
        video: {
          duration: 1486,
          thumbnail:
            "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-01.png",
          url: "https://assets.tailwindcss.com/templates/compass/writing-autobiography.mp4",
        },
      },
    ],
  },
];
