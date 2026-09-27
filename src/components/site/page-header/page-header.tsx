type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="py-10 sm:py-16">
      <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-lg text-pretty text-muted-foreground">{description}</p>
    </header>
  );
}
