import type { Job } from '@/lib/work';

export function WorkList({ jobs }: { jobs: Job[] }) {
  return (
    <ul className="flex flex-col gap-6">
      {jobs.map(({ company, role, period, summary }) => (
        <li key={company} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
          <span className="text-sm text-muted-foreground tabular-nums">{period}</span>
          <div>
            <p className="font-medium">
              {company} <span className="font-normal text-muted-foreground">· {role}</span>
            </p>
            <p className="mt-1 text-sm text-pretty text-muted-foreground">{summary}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
