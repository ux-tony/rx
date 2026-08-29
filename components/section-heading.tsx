type SectionHeadingProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  fullWidth?: boolean;
};

export function SectionHeading({ eyebrow, title, description, fullWidth = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading${fullWidth ? " section-heading-wide" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
}
