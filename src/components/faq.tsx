/**
 * FAQ list built on <details>/<summary>.
 *
 * Native disclosure: keyboard accessible, works without JavaScript, and
 * searchable by the browser's find-in-page in modern engines. No state, no
 * client component, no bundle cost.
 */
export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
            <h3 className="text-[17px] font-semibold text-ink-900 group-hover:text-carbon-700">
              {item.question}
            </h3>
            <span
              aria-hidden="true"
              className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition-transform duration-200 group-open:rotate-45"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                <path
                  d="M8 3.5v9M3.5 8h9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl pr-10 text-[15px] leading-relaxed text-ink-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
