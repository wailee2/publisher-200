// components/ui/PillButton.tsx
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "pill-primary" | "pill-white" | "primary" | "secondary";

const variantClasses: Record<Variant, string> = {
  "pill-primary": "btn-pill-primary",
  "pill-white": "btn-pill-white",
  primary: "btn-primary",
  secondary: "btn-secondary",
};

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  onClick?: () => void;
}

interface NativeButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
  loading?: boolean;
  loadingText?: string;
}

type PillButtonProps = LinkButtonProps | NativeButtonProps;

function isLinkProps(props: PillButtonProps): props is LinkButtonProps {
  return typeof (props as LinkButtonProps).href === "string";
}

// Two overlapping arrows: on hover, the current one exits up-right
// while a second one enters from the bottom-left, in the same spot.
// ease-[cubic-bezier(0.16,1,0.3,1)] = fast start, slow settle ("expo-out").
function AnimatedArrow() {
  return (
    <span className="btn-pill-icon relative overflow-hidden">
      <ArrowUpRight
        className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:-translate-y-6"
        strokeWidth={2}
      />
      <ArrowUpRight
        className="size-5 absolute -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
        strokeWidth={2}
      />
    </span>
  );
}

export function PillButton(props: PillButtonProps) {
  const { variant = "pill-primary", children, className = "", showIcon = true } = props;
  const classes = `${variantClasses[variant]} group ${className}`.trim();
  const icon = showIcon ? <AnimatedArrow /> : null;

  if (isLinkProps(props)) {
    const { href, onClick } = props;
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  const { loading, loadingText, disabled, type = "button", ...rest } = props;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${classes} disabled:opacity-60`}
      {...rest}
    >
      {loading && loadingText ? loadingText : children}
      {icon}
    </button>
  );
}