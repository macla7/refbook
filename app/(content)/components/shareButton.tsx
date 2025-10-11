import React, { useEffect, useRef, useState } from "react";

/**
 * ShareButton
 * - Uses Web Share API when available
 * - Falls back to an accessible custom share sheet (modal) with common targets
 * - Zero external deps; style with Tailwind classes
 *
 * Props:
 *   url:   string (required)
 *   title: string (optional)
 *   text:  string (optional)
 */

type ShareButtonProps = {
  url: string;
  title?: string;
  text?: string;
};

type ShareTarget = {
  name: string;
  href?: string;
  onClick?: () => void;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export default function ShareButton({
  url,
  title = "Check this out",
  text = "",
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const canWebShare =
    typeof navigator !== "undefined" && !!(navigator as any).share;
  const shareData = { url, title, text };

  async function onNativeShare() {
    try {
      await (navigator as any).share(shareData);
    } catch (err) {
      // If user cancels, ignore. For other errors, open fallback.
      if ((err as any)?.name !== "AbortError") setOpen(true);
    }
  }

  function openSheet() {
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }

  function closeSheet() {
    setOpen(false);
    setCopied(false);
    // restore focus to the launching control for good a11y
    if (
      lastActiveRef.current &&
      typeof lastActiveRef.current.focus === "function"
    ) {
      lastActiveRef.current.focus();
    }
  }

  // Close on ESC and trap focus inside the modal when open
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeSheet();
      }
      if (e.key === "Tab") {
        // naive focus trap (good enough for small sheets)
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement> | undefined;
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (_) {
      // Best-effort fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      // avoid TS deprecation typing by calling via any
      (document as any).execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  // Encode helpers for query params
  const enc = encodeURIComponent;
  const targets: ShareTarget[] = [
    {
      name: "Copy link",
      href: undefined,
      onClick: copyLink,
      icon: CopyIcon,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${enc(text ? `${text} ${url}` : url)}`,
      icon: WhatsAppIcon,
    },
    {
      name: "Messenger",
      href: `https://www.facebook.com/dialog/send?link=${enc(
        url
      )}&app_id=87741124305&redirect_uri=${enc(url)}`,
      icon: MessengerIcon,
    },
    {
      name: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${enc(
        text || title
      )}&url=${enc(url)}`,
      icon: TwitterXIcon,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      icon: FacebookIcon,
    },
    {
      name: "Email",
      href: `mailto:?subject=${enc(title)}&body=${enc(
        text ? `${text}\n\n${url}` : url
      )}`,
      icon: MailIcon,
    },
    {
      name: "SMS",
      // iOS prefers sms:&body=, many Androids accept sms:?body=
      href: `sms:&body=${enc(text ? `${text} ${url}` : url)}`,
      icon: SmsIcon,
    },
  ];

  return (
    <div className="inline-block">
      <button
        type="button"
        onClick={canWebShare ? onNativeShare : openSheet}
        className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <ShareIcon className="h-4 w-4" />
        Share
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center"
          aria-hidden={!open}
        >
          <div className="absolute inset-0 bg-black/40" onClick={closeSheet} />

          {/* Sheet */}
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Share"
            className="relative z-10 w-full max-w-md rounded-t-3xl md:rounded-3xl bg-white p-4 shadow-xl md:p-6"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-base font-semibold">Share</h2>
              <button
                onClick={closeSheet}
                className="rounded-full p-2 hover:bg-gray-100 focus:outline-none focus-visible:ring"
              >
                <CloseIcon className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-600 line-clamp-2">{title}</p>

            <div className="grid grid-cols-4 gap-3">
              {targets.map((t) => (
                <ShareTile key={t.name} {...t} />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border p-2">
              <code className="block w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-600">
                {url}
              </code>
              <button
                onClick={copyLink}
                className="shrink-0 rounded-lg border px-2 py-1 text-xs hover:bg-gray-50 focus:outline-none focus-visible:ring"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShareTile({
  name,
  href,
  onClick,
  icon: Icon,
}: {
  name: string;
  href?: string;
  onClick?: () => void;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
  const common =
    "flex flex-col items-center gap-2 rounded-2xl border p-3 text-center text-xs hover:bg-gray-50 focus:outline-none focus-visible:ring";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={common}
      >
        <Icon className="h-6 w-6" />
        <span>{name}</span>
      </a>
    );
  }
  return (
    <button onClick={onClick} className={common}>
      <Icon className="h-6 w-6" />
      <span>{name}</span>
    </button>
  );
}

/* ---------------- Icons (inline SVG, no deps) ---------------- */
function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v14" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M.5 23.5 3 17.8A10 10 0 1 1 17.7 21L12 23.5z" />
    </svg>
  );
}

function MessengerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.5 2 2 6 2 10.8c0 2.7 1.4 5.1 3.6 6.7V22l3.3-1.8c1 .3 2 .4 3.1.4 5.5 0 10-4.5 10-9.8C22 6 17.5 2 12 2z" />
    </svg>
  );
}

function TwitterXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 3h5l5.5 7.5L18 3h3l-7 9 7 9h-5l-5.5-7.5L6 21H3l7-9z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.6V12h2.8V9.5c0-2.8 1.6-4.4 4.1-4.4 1.2 0 2.4.2 2.4.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6V12h3l-.5 2.9h-2.5v7A10 10 0 0 0 22 12" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function SmsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}
