type TelegramIconProps = {
  className?: string;
};

export function TelegramIcon({ className }: TelegramIconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M21.7 4.34 18.54 19.3c-.24 1.06-.87 1.32-1.77.82l-4.9-3.62-2.36 2.27c-.26.26-.48.48-.98.48l.35-5 9.1-8.23c.4-.35-.08-.55-.61-.2l-11.25 7.08-4.85-1.52c-1.05-.33-1.07-1.05.22-1.56L20.1 3.7c.88-.33 1.65.2 1.36 1.64Z"
        fill="currentColor"
      />
    </svg>
  );
}
