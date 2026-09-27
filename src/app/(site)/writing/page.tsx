import type { Metadata } from "next";
import { articles } from "@/lib/writing";

export const metadata: Metadata = { title: "Writing" };

const dateFormat = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function WritingPage() {
  return (
    <>
      <section className="py-10 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Writing</h1>
        <p className="mt-4 max-w-lg text-neutral-500 text-pretty">Notes on component APIs and design systems.</p>
      </section>

      <ul className="flex max-w-2xl flex-col gap-8">
        {articles.map(({ title, description, date, url }) => (
          <li key={url}>
            <time dateTime={date} className="text-sm text-neutral-500 tabular-nums">
              {dateFormat.format(new Date(date))}
            </time>
            <h2 className="mt-1 font-medium">
              <a href={url} target="_blank" rel="noreferrer" className="hover:underline">
                {title}
                <span aria-hidden className="text-neutral-400"> ↗</span>
              </a>
            </h2>
            <p className="mt-1 text-sm text-neutral-500 text-pretty">{description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
