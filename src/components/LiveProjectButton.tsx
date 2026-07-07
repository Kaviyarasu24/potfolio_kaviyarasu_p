interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  className?: string;
  compact?: boolean;
}

const LiveProjectButton = ({
  label = 'Live Project',
  href = '#',
  className = '',
  compact = false,
}: LiveProjectButtonProps) => {
  const isExternal = href.startsWith('http');

  const paddingClass = compact
    ? 'px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs border'
    : 'px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base border-2';

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center justify-center rounded-full border-[#D7E2EA] font-medium uppercase tracking-widest text-[#D7E2EA] whitespace-nowrap transition-all duration-200 hover:bg-[#D7E2EA]/10 hover:scale-[1.03] active:scale-[0.97] ${paddingClass} ${className}`}
    >
      {label}
    </a>
  );
};

export default LiveProjectButton;
