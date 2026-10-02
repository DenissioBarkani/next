import { ArrowRight } from "lucide-react";
import Link, { type LinkProps } from "next/link";

type ArrowLinkProps = LinkProps & {
  readonly children: React.ReactNode;
  readonly className?: string;
};

export function ArrowLink({ children, className, ...props }: ArrowLinkProps) {
  return (
    <Link {...props} className={className ? `arrow-link ${className}` : "arrow-link"}>
      {children}
      <ArrowRight aria-hidden="true" size={17} />
    </Link>
  );
}
