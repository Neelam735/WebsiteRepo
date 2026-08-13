import { cn } from "@/lib/utils";

/**
 * Product mockups.
 *
 * These are the "screenshots" — built as markup rather than image files, so
 * they are sharp at any size, cost no network request, never shift the
 * layout, and stay editable when the product changes. Each is decorative and
 * labelled with role="img", so screen readers hear one description instead of
 * reading out fake menu items.
 *
 * Swap for real screenshots by replacing a component's body with next/image;
 * the surrounding frames still apply.
 */

export function BrowserFrame({
  url = "yourbusiness.com",
  className,
  children,
}: {
  url?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-ink-200/70 bg-white shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-ink-50 px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
        </div>
        <div className="ml-2 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-ink-500 ring-1 ring-ink-200">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[260px] rounded-[2rem] border-[6px] border-ink-900 bg-ink-900 shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink-700" />
      <div className="overflow-hidden rounded-[1.6rem] bg-white">{children}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- ordering */

const menuItems = [
  { name: "Margherita", price: "$14", note: "San Marzano, fior di latte" },
  { name: "Diavola", price: "$17", note: "Spicy salami, chilli honey" },
  { name: "Funghi", price: "$16", note: "Wild mushroom, taleggio" },
];

export function OrderingMockup({ className }: { className?: string }) {
  return (
    <PhoneFrame className={className}>
      <div role="img" aria-label="Mockup of an online ordering screen with a pizza menu and a running order total">
        <div className="bg-clay-600 px-4 pb-5 pt-6 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-clay-200">
            Pickup · ready 6:40pm
          </p>
          <p className="mt-1 text-lg font-bold">Casa Lucía</p>
        </div>

        <div className="space-y-2.5 px-3 py-4">
          {menuItems.map((item, index) => (
            <div
              key={item.name}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-2.5",
                index === 1 ? "border-clay-300 bg-clay-50" : "border-line bg-white",
              )}
            >
              <div className="h-9 w-9 shrink-0 rounded-md bg-gradient-to-br from-honey-200 to-clay-200" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink-900">{item.name}</p>
                <p className="truncate text-[11px] text-ink-500">{item.note}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-bold text-ink-900">{item.price}</p>
                {index === 1 ? (
                  <p className="text-[10px] font-semibold text-clay-700">× 2</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-line px-3 pb-4 pt-3">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-ink-600">Total</span>
            <span className="font-bold text-ink-900">$34.00</span>
          </div>
          <p className="mt-1 text-[10px] text-sage-700">No service fee · 0% commission</p>
          <div className="mt-3 rounded-full bg-clay-600 py-2.5 text-center text-[13px] font-semibold text-white">
            Place order
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ----------------------------------------------------------------- booking */

const slots = ["9:00", "10:30", "12:00", "1:30", "3:00", "4:30"];
const bookedSlots = new Set(["10:30", "3:00"]);

export function BookingMockup({ className }: { className?: string }) {
  return (
    <BrowserFrame url="june-and-co.com/book" className={className}>
      <div
        role="img"
        aria-label="Mockup of a salon booking calendar showing available appointment times and a booking summary"
        className="bg-white p-4 sm:p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-ink-900">Colour & cut with Ana</p>
            <p className="text-xs text-ink-500">90 minutes · $180 · 20% deposit</p>
          </div>
          <span className="rounded-full bg-sage-100 px-2.5 py-1 text-[11px] font-semibold text-sage-700">
            6 slots left
          </span>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <div key={index} className="text-center text-[10px] font-semibold text-ink-400">
              {day}
            </div>
          ))}
          {Array.from({ length: 14 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "rounded-md py-1.5 text-center text-[11px] font-medium",
                index === 9
                  ? "bg-clay-600 font-bold text-white"
                  : index < 3
                    ? "text-ink-300"
                    : "bg-ink-50 text-ink-700",
              )}
            >
              {index + 3}
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {slots.map((slot) => {
            const booked = bookedSlots.has(slot);
            return (
              <div
                key={slot}
                className={cn(
                  "rounded-md border py-1.5 text-center text-[11px] font-semibold",
                  booked
                    ? "border-line bg-ink-50 text-ink-300 line-through"
                    : slot === "1:30"
                      ? "border-clay-600 bg-clay-50 text-clay-700"
                      : "border-ink-200 bg-white text-ink-700",
                )}
              >
                {slot}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2.5">
          <div className="text-[11px] text-ink-600">
            <span className="font-semibold text-ink-900">Thu 12, 1:30pm</span> · reminder sent 24h before
          </div>
          <div className="rounded-full bg-clay-600 px-3 py-1.5 text-[11px] font-semibold text-white">
            Confirm
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ----------------------------------------------------------------- website */

export function WebsiteMockup({ className }: { className?: string }) {
  return (
    <BrowserFrame url="northlanecoffee.com" className={className}>
      <div
        role="img"
        aria-label="Mockup of a cafe website home page with a hero image, opening hours and an order-ahead button"
        className="bg-white"
      >
        <div className="relative h-32 bg-gradient-to-br from-ink-800 via-clay-800 to-clay-600 sm:h-40">
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-honey-300">
              Open until 4pm
            </p>
            <p className="mt-1 text-lg font-bold leading-tight text-white sm:text-xl">
              Coffee, and a proper lunch.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-clay-700">
                Order ahead
              </span>
              <span className="rounded-full px-3 py-1 text-[10px] font-semibold text-white ring-1 ring-white/40">
                See menu
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4">
          {["Breakfast", "Lunch", "Coffee"].map((label) => (
            <div key={label} className="rounded-lg border border-line p-2">
              <div className="h-8 rounded bg-gradient-to-br from-honey-100 to-ink-100" />
              <p className="mt-1.5 text-[11px] font-semibold text-ink-800">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[10px] text-ink-500">
          <span>218 North Lane</span>
          <span className="font-semibold text-sage-700">★ 4.9 · 312 Google reviews</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* --------------------------------------------------------------- dashboard */

const bars = [38, 52, 44, 68, 84, 61, 96];

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <BrowserFrame url="app.storefrontstudio.com" className={className}>
      <div
        role="img"
        aria-label="Mockup of a business dashboard showing weekly orders, revenue and a bar chart of the last seven days"
        className="bg-white p-4 sm:p-5"
      >
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Orders", value: "412", change: "+18%" },
            { label: "Revenue", value: "$9.4k", change: "+11%" },
            { label: "Repeat", value: "63%", change: "+6%" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-line p-2.5">
              <p className="text-[10px] font-medium text-ink-500">{stat.label}</p>
              <p className="mt-0.5 text-base font-bold text-ink-900">{stat.value}</p>
              <p className="text-[10px] font-semibold text-sage-700">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-line p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-ink-800">Last 7 days</p>
            <p className="text-[10px] text-ink-500">Orders per day</p>
          </div>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {bars.map((height, index) => (
              <div key={index} className="flex-1">
                <div
                  className={cn(
                    "rounded-t",
                    index === bars.length - 1 ? "bg-clay-600" : "bg-clay-200",
                  )}
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          {[
            ["Low stock", "Oat milk — 4 left", "honey"],
            ["Rota", "Saturday needs 1 more", "clay"],
          ].map(([label, detail, tone]) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px]",
                tone === "honey" ? "bg-honey-50" : "bg-clay-50",
              )}
            >
              <span className="font-semibold text-ink-900">{label}</span>
              <span className="text-ink-600">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ----------------------------------------------------------------- support */

export function SupportMockup({ className }: { className?: string }) {
  return (
    <BrowserFrame url="status.storefrontstudio.com" className={className}>
      <div
        role="img"
        aria-label="Mockup of a site status panel showing uptime, backups and recent support requests"
        className="bg-white p-4 sm:p-5"
      >
        <div className="flex items-center gap-2 rounded-lg bg-sage-100 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-sage-500" />
          <p className="text-[12px] font-semibold text-sage-700">All systems operational</p>
          <p className="ml-auto text-[11px] text-sage-700">99.98% · 90 days</p>
        </div>

        <div className="mt-3 flex gap-0.5">
          {Array.from({ length: 40 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-8 flex-1 rounded-sm",
                index === 27 ? "bg-honey-400" : "bg-sage-500/70",
              )}
            />
          ))}
        </div>

        <div className="mt-4 space-y-2">
          {[
            ["Backup completed", "2 hours ago"],
            ["Menu prices updated", "Yesterday"],
            ["Security patches applied", "3 days ago"],
          ].map(([label, when]) => (
            <div key={label} className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-ink-800">{label}</span>
              <span className="text-ink-500">{when}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

/** Pick a mockup by name — lets content files choose their own artwork. */
export function Mockup({
  kind,
  className,
}: {
  kind: "ordering" | "booking" | "website" | "dashboard" | "support";
  className?: string;
}) {
  switch (kind) {
    case "ordering":
      return <OrderingMockup className={className} />;
    case "booking":
      return <BookingMockup className={className} />;
    case "website":
      return <WebsiteMockup className={className} />;
    case "dashboard":
      return <DashboardMockup className={className} />;
    case "support":
      return <SupportMockup className={className} />;
  }
}
