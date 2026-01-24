type LightDarkIconProps = {
  className?: string;
  size?: number;
};

export function LightDarkIcon({ className = '', size = 18 }: LightDarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.9375 9C15.9375 12.8315 12.8315 15.9375 9 15.9375C5.16853 15.9375 2.0625 12.8315 2.0625 9C2.0625 5.16853 5.16853 2.0625 9 2.0625C12.8315 2.0625 15.9375 5.16853 15.9375 9Z"
        stroke="var(--icon-strong)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 2.25V15.75"
        stroke="var(--icon-strong)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 2.625V15.375"
        stroke="var(--icon-strong)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 3.75V14.25"
        stroke="var(--icon-strong)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
