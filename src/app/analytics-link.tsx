"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type EventParams = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (command: "event", eventName: string, params: EventParams) => void;
  }
}

export function trackEvent(eventName: string, eventParams: EventParams) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(["event", eventName, eventParams]);
}

type AnalyticsLinkProps = {
  href: string;
  children: ReactNode;
  eventName: string;
  eventParams: EventParams;
  className?: string;
  target?: string;
  rel?: string;
  scroll?: boolean;
  ariaCurrent?: "page";
  ariaLabel?: string;
};

export default function AnalyticsLink({
  href,
  children,
  eventName,
  eventParams,
  className,
  target,
  rel,
  scroll,
  ariaCurrent,
  ariaLabel,
}: AnalyticsLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      scroll={scroll}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </Link>
  );
}
