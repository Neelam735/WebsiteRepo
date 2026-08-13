import type { Block } from "@/content/posts";

/**
 * Renders a post's structured blocks. Keeping the renderer explicit (rather
 * than dropping in raw HTML) means no post can inject markup, and every block
 * type gets styled deliberately.
 */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} className="pt-4 text-2xl font-bold sm:text-[28px]">
                {block.text}
              </h2>
            );

          case "p":
            return (
              <p key={index} className="text-[17px] leading-[1.75] text-ink-700">
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={index} className="space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[17px] leading-[1.7] text-ink-700">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-clay-400 py-1 pl-5 text-[19px] font-medium italic leading-relaxed text-ink-800"
              >
                “{block.text}”
              </blockquote>
            );

          case "callout":
            return (
              <aside
                key={index}
                className="rounded-card border border-honey-200 bg-honey-50 p-5 sm:p-6"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-honey-900">
                  {block.title}
                </p>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-700">{block.text}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
