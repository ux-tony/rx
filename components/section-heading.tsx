type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  fullWidth?: boolean;
};

export function SectionHeading({ eyebrow, title, description, fullWidth = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading${fullWidth ? " section-heading-wide" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
