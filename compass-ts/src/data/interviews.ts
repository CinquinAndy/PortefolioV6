import webvtt from "node-webvtt";
import fs from "node:fs/promises";
import path from "node:path";

export type Interview = {
  id: string;
  name: string;
  subtitle: string;
  video: {
    duration: number;
    thumbnail: string;
    sd: string;
    hd: string;
  };
  chapters: { start: number; title: string }[];
};

export function getInterviews(): Interview[] {
  return interviews;
}

export async function getInterview(slug: string) {
  let index = interviews.findIndex(({ id }) => id === slug);

  if (index === -1) {
    return null;
  }

  let interview = interviews[index];

  return {
    ...interview,
    next: index < interviews.length - 1 ? interviews[index + 1] : null,
  };
}

export async function getInterviewTranscript(slug: string) {
  let transcript = await fs.readFile(
    path.join(process.cwd(), "src/data/interviews", `${slug}.vtt`),
    "utf-8",
  );

  return webvtt.parse(transcript).cues.map(({ text, start, end }) => {
    let speaker = text.match(/<v (.*?)>/)?.[1];
    let textWithoutSpeaker = text.replace(/<v (.*?)>/, "").split("\n");
    return {
      start,
      end,
      speaker,
      text: textWithoutSpeaker,
    };
  });
}

const interviews = [
  {
    id: "annie-king",
    name: "Annie King",
    subtitle: "If the universe already has a plan, why don't you?",
    intro: `Annie King, author of "The Inevitable You: How to Embrace Your Path and Succeed with Relentless Precision", shares her revolutionary approach to life planning through her unique "Legacy Tracker" system and the art of scheduled spontaneity.`,
    video: {
      duration: 2570,
      thumbnail:
        "https://assets.tailwindcss.com/templates/compass/annie-king-video-thumbnail.png",
      sd: "https://assets.tailwindcss.com/templates/compass/annie-king-720p.mp4",
      hd: "https://assets.tailwindcss.com/templates/compass/annie-king-1080p.mp4",
    },
    chapters: [
      { start: 0, title: "Intro – Meet Annie King" },
      { start: 20, title: "Growing Up in an Ultra-Organized Household" },
      { start: 70, title: "The Future Planners Club: A Legacy of Planning" },
      { start: 465, title: "The 'Legacy Tracker': A Six-Hour Update Cycle" },
      { start: 500, title: "Trello Time and Time Management Philosophy" },
      {
        start: 520,
        title: "Scheduling Spontaneity: The Art of Planned Inspiration",
      },
      { start: 2220, title: "Planning for the unexpected" },
      { start: 2540, title: "Final Thoughts: Planning as a Lifestyle" },
      { start: 2570, title: "Outro – Signing Off" },
    ],
  },
  {
    id: "nolan-grayson",
    name: "Dr. Nolan Grayson",
    subtitle: "Is Quantum Nirvana the key to true freedom?",
    intro: `Dr. Nolan Grayson explores quantum determinism, the illusion of free will, and his theory of Quantum Nirvana—achieving true freedom across parallel universes.`,
    video: {
      duration: 3480,
      thumbnail:
        "https://assets.tailwindcss.com/templates/compass/nolan-grayson-video-thumbnail.png",
      sd: "https://assets.tailwindcss.com/templates/compass/nolan-grayson-720p.mp4",
      hd: "https://assets.tailwindcss.com/templates/compass/nolan-grayson-1080p.mp4",
    },
    chapters: [
      { start: 0, title: "Intro – Meet Dr. Nolan Grayson" },
      { start: 192, title: "What Is Quantum Determinism?" },
      {
        start: 500,
        title: "The 'Superposition Trap' and Its Impact on Free Will",
      },
      {
        start: 825,
        title:
          "Multiverse Realities: How Every Choice Spreads Across Infinite Worlds",
      },
      { start: 1170, title: "Entanglement and the Illusion of Choice" },
      {
        start: 1510,
        title: "Quantum Lock-In: Are You Stuck in a Predetermined Path?",
      },
      {
        start: 1800,
        title: "How Quantum Noise Could Be the Key to True Freedom",
      },
      {
        start: 2140,
        title:
          "Dr. Grayson's Theory of Quantum Nirvana: Achieving Free Will Across Universes",
      },
      {
        start: 2475,
        title:
          "How to Hack the Multiverse: Practical Tips for Quantum Alignment",
      },
      {
        start: 2845,
        title:
          "Lightning Round: Favorite Thought Experiments, Books, and Routines",
      },
      {
        start: 3130,
        title: "Final Thoughts – The Future of Free Will in Quantum Mechanics",
      },
      { start: 3450, title: "Outro – Signing Off" },
    ],
  },
  {
    id: "eleanor-vann",
    name: "Eleanor Vann",
    subtitle: "The Passenger and the Path.",
    intro: `Eleanor Vann, author of "The Path and the Passenger: A Drifter's Guide to Getting Lost", shares her revolutionary approach to travel through her unique philosophy of planned spontaneity and the art of embracing detours.`,
    video: {
      duration: 3610,
      thumbnail:
        "https://assets.tailwindcss.com/templates/compass/eleanor-vann-video-thumbnail.png",
      sd: "https://assets.tailwindcss.com/templates/compass/eleanor-vann-720p.mp4",
      hd: "https://assets.tailwindcss.com/templates/compass/eleanor-vann-1080p.mp4",
    },
    chapters: [
      { start: 0, title: "Intro – Meet Eleanor Vann" },
      { start: 200, title: "The Accidental Journey: From Spain to Belgium" },
      { start: 478, title: "The First Drift: Writing Stories on Napkins" },
      { start: 795, title: "The Philosophy of Plan-Free Travel" },
      {
        start: 1208,
        title: "Unexpected Adventures: Weddings, Protests, and Folk Concerts",
      },
      { start: 1725, title: "The Art of Random Destinations" },
      { start: 2118, title: "Embracing the Unexpected: When Plans Go Awry" },
      {
        start: 3155,
        title: "The Freedom of Letting Go: Why Control Limits Experience",
      },
      { start: 3530, title: "Outro – Signing Off" },
    ],
  },
  {
    id: "sophia-reid",
    name: "Sophia Reid",
    subtitle: "Are we destined by design?",
    intro: `Sophia Reid, host of the popular podcast "Soul Mates: Destined by Design", shares her revolutionary approach to finding love through her unique "Love Lattice" theory and the art of breadcrumb tracking.`,
    video: {
      duration: 2940,
      thumbnail:
        "https://assets.tailwindcss.com/templates/compass/sophia-reid-video-thumbnail.png",
      sd: "https://assets.tailwindcss.com/templates/compass/sophia-reid-720p.mp4",
      hd: "https://assets.tailwindcss.com/templates/compass/sophia-reid-1080p.mp4",
    },
    chapters: [
      { start: 0, title: "Intro – Meet Sophia Reid" },
      {
        start: 462,
        title: "The Waffle House Miracle: A Viral Moment of Destiny",
      },
      {
        start: 1194,
        title: "The Love Lattice: Understanding Breadcrumb Tracking",
      },
      {
        start: 1967,
        title: "The Loop of Serendipity: When Breadcrumbs Are Missed",
      },
      { start: 2909, title: "Outro – Signing Off" },
    ],
  },
  {
    id: "mick-larson",
    name: "Mick Larson",
    subtitle: "How to jailbreak reality and hack your fate.",
    intro: `Mick Larson, known as The Free Will Hacker, shares his radical approach to breaking free from life's default settings through his unique "Reality Reboot" technique and the art of disrupting deterministic patterns.`,
    video: {
      duration: 3630,
      thumbnail:
        "https://assets.tailwindcss.com/templates/compass/mick-larson-video-thumbnail.png",
      sd: "https://assets.tailwindcss.com/templates/compass/mick-larson-720p.mp4",
      hd: "https://assets.tailwindcss.com/templates/compass/mick-larson-1080p.mp4",
    },
    chapters: [
      { start: 0, title: "Intro – Meet Mick, The Free Will Hacker" },
      {
        start: 83,
        title: "The System of Determinism: Factory Settings of Fate",
      },
      { start: 582, title: "The Jailbreak Technique: Hacking Your Fate" },
      {
        start: 1215,
        title: "When Jailbreaking Fails: Troubleshooting Freedom",
      },
      { start: 1982, title: "Breaking the Cycle of Uncertainty" },
      { start: 2648, title: "Final Thoughts on Hacking Reality" },
      { start: 3599, title: "Outro – Signing Off" },
    ],
  },
  {
    id: "tom-harris",
    name: "Tom Harris",
    subtitle: "Turning the tables on Tom.",
    intro: `Tom Harris, the host of the Compass Podcast, shares his journey from questioning karate moves to embracing determinism, offering a unique perspective on free will, neuroscience, and the art of accepting life's predetermined path.`,
    video: {
      duration: 4210,
      thumbnail:
        "https://assets.tailwindcss.com/templates/compass/tom-harris-interview-video-thumbnail.png",
      sd: "https://assets.tailwindcss.com/templates/compass/tom-harris-interview-720p.mp4",
      hd: "https://assets.tailwindcss.com/templates/compass/tom-harris-interview-1080p.mp4",
    },
    chapters: [
      { start: 0, title: "Intro – Meet Tom Harris" },
      {
        start: 312,
        title: "Early Years: Rocks, Existential Dread, and Karate",
      },
      {
        start: 748,
        title: "College Life: Late Night Ramen and Philosophical Readings",
      },
      {
        start: 1247,
        title: "The Discovery of Exercise: Kettlebells and Existential Crises",
      },
      { start: 1679, title: "Meditation Journey: From Zafu to Deep Practice" },
      {
        start: 2141,
        title: "Neuroscience Insights: The Brain's Decision-Making Process",
      },
      { start: 2533, title: "The Latte Moment: Questioning Free Will" },
      {
        start: 3018,
        title: "Practical Applications: Self-Compassion and Understanding",
      },
      { start: 3424, title: "Audience Q&A: Rapid-Fire Questions" },
      { start: 3598, title: "Outro – Signing Off" },
    ],
  },
];
