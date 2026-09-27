export type Article = {
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  url: string;
};

/** Articles published elsewhere (dev.to for now), newest first. */
export const articles: Article[] = [
  {
    title: "Compound Components in React: A Design System Superpower",
    description:
      "Compound Components allow developers to build highly flexible and composable APIs in React. How they unlock scalability for design systems.",
    date: "2025-08-03",
    url: "https://dev.to/talissoncosta/compound-components-in-react-a-design-system-superpower-1o0d",
  },
  {
    title: "UI Logic Should Live in Hooks, Not in JSX",
    description:
      "Placing UI logic inside JSX quickly leads to unreadable components. Extracting UI behaviors into custom hooks keeps components clean and declarative.",
    date: "2025-08-03",
    url: "https://dev.to/talissoncosta/ui-logic-should-live-in-hooks-not-in-jsx-9fn",
  },
  {
    title: "Slot-Based APIs in React: Designing Flexible and Composable Components",
    description:
      "Slot-based APIs give consumers control over what gets rendered where. How I approach building flexible slot-driven components for design systems.",
    date: "2025-08-03",
    url: "https://dev.to/talissoncosta/slot-based-apis-in-react-designing-flexible-and-composable-components-7pj",
  },
  {
    title: "From Component to System: How I Built with Design System Thinking",
    description:
      "A page navigation UI with drag and drop, inline add buttons and contextual menus, treated as the foundation of a design system instead of a one-off.",
    date: "2025-07-22",
    url: "https://dev.to/talissoncosta/from-component-to-system-how-i-built-with-design-system-thinking-1im7",
  },
];
