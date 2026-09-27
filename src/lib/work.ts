export type Job = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

/** Work history, most recent first. */
export const work: Job[] = [
  {
    company: "Flagsmith",
    // TODO(talisson): confirm role title and start date.
    role: "Frontend Design Engineer",
    period: "Present",
    summary: "Frontend and UI for an open-source feature flag platform.",
  },
  {
    company: "Calendly",
    role: "Frontend Design Engineer",
    // TODO(talisson): confirm end date.
    period: "2022 – 2025",
    summary: "Led the UI design system used across every frontend team: 30+ accessible React components, Storybook, CI and DX.",
  },
  {
    company: "Hugo (acquired by Calendly)",
    role: "Senior Software Engineer",
    period: "2021 – 2022",
    summary: "Shipped product features with React, Node.js and PostgreSQL; integrations with ClickUp and Microsoft Teams.",
  },
  {
    company: "Grupo MContigo",
    role: "Fullstack Developer",
    period: "2020 – 2021",
    summary: "Scaled Next.js products serving 100M+ monthly visits.",
  },
  {
    company: "Adireto",
    role: "Team Lead & Fullstack Developer",
    period: "2020 – 2021",
    summary: "Led a team of three and built a testing culture that cut production bugs.",
  },
  {
    company: "Amplisoftware",
    role: "Team Lead & Fullstack Developer",
    period: "2015 – 2020",
    summary: "React, Node.js and React Native apps, including a real-time chat platform.",
  },
];
