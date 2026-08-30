import { cn } from "@/lib/utils";

/**
 * Interface mockups.
 *
 * These illustrate what each system looks like — built as markup rather than
 * image files, so they stay sharp at any size, cost no network request, never
 * shift the layout, and can be edited when the product changes.
 *
 * The sample rows are generic on purpose: no invented business names, no
 * results presented as if they were a customer's. They show the shape of the
 * interface, nothing more. Each is labelled with role="img" so a screen reader
 * hears one description rather than a list of fake menu items.
 *
 * To use real screenshots instead, replace a component's body with next/image;
 * the frames around them still apply.
 */

export function BrowserFrame({
  url,
  className,
  children,
}: {
  url: string;
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

/* -------------------------------------------------- restaurant: ordering */

const orderLines = [
  { name: "Paneer tikka", price: "₹280", note: "Starter · half plate" },
  { name: "Butter chicken", price: "₹380", note: "Main · medium", qty: "× 2" },
  { name: "Dal makhani", price: "₹260", note: "Main" },
];

export function OrderingMockup({ className }: { className?: string }) {
  return (
    <PhoneFrame className={className}>
      <div
        role="img"
        aria-label="Mockup of the online ordering screen: a menu with three dishes, a subtotal with GST, and a place-order button"
      >
        <div className="bg-carbon-600 px-4 pb-5 pt-6 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-carbon-200">
            Pickup · ready 6:40pm
          </p>
          <p className="mt-1 text-lg font-bold">Your menu</p>
        </div>

        <div className="space-y-2.5 px-3 py-4">
          {orderLines.map((line, index) => (
            <div
              key={line.name}
              className={cn(
                "flex items-start gap-2.5 rounded-lg border p-2.5",
                index === 1 ? "border-carbon-300 bg-carbon-50" : "border-line bg-white",
              )}
            >
              <div className="h-8 w-8 shrink-0 rounded-md bg-gradient-to-br from-chrome-200 to-carbon-200" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink-900">{line.name}</p>
                <p className="truncate text-[11px] text-ink-500">{line.note}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-bold text-ink-900">{line.price}</p>
                {line.qty ? (
                  <p className="text-[10px] font-semibold text-carbon-700">{line.qty}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-line px-3 pb-4 pt-3">
          <div className="flex items-center justify-between text-[12px] text-ink-600">
            <span>Subtotal</span>
            <span>₹1,300</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[12px] text-ink-600">
            <span>GST</span>
            <span>₹65</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between border-t border-line pt-1.5 text-[13px]">
            <span className="text-ink-600">Total</span>
            <span className="font-bold text-ink-900">₹1,365</span>
          </div>
          <p className="mt-1 text-[10px] text-steel-700">Ordered direct · no platform commission</p>
          <div className="mt-3 rounded-full bg-carbon-600 py-2.5 text-center text-[13px] font-semibold text-white">
            Place order
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ------------------------------------------------------- gym: timetable */

const classes = [
  { time: "06:30", name: "Strength", coach: "Coach A", state: "12 of 16" },
  { time: "09:00", name: "Conditioning", coach: "Coach B", state: "Full · 3 waiting" },
  { time: "17:30", name: "Olympic lifting", coach: "Coach A", state: "8 of 12" },
  { time: "19:00", name: "Open gym", coach: "—", state: "5 of 20" },
];

export function ClassScheduleMockup({ className }: { className?: string }) {
  return (
    <BrowserFrame url="app.bizwisetech.com/timetable" className={className}>
      <div
        role="img"
        aria-label="Mockup of the gym class timetable: four classes with coach, capacity and a full class showing a waitlist"
        className="bg-white p-4 sm:p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-ink-900">Today&rsquo;s timetable</p>
            <p className="text-xs text-ink-500">4 classes · 2 coaches</p>
          </div>
          <span className="rounded-full bg-steel-100 px-2.5 py-1 text-[11px] font-semibold text-steel-700">
            Waitlist on
          </span>
        </div>

        <div className="mt-4 space-y-1.5">
          {classes.map((item, index) => (
            <div
              key={item.time}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5",
                index === 1 ? "border-carbon-300 bg-carbon-50" : "border-line bg-white",
              )}
            >
              <span className="w-11 shrink-0 text-[12px] font-bold text-ink-900">{item.time}</span>
              {/* Capacity sits with the class name rather than at the far right
                  edge. In the hero the phone overlaps that edge, and this is
                  the detail worth seeing — a class that is full with people
                  waiting is the whole argument for the waitlist. */}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold text-ink-900">
                  {item.name}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5">
                  <span className="truncate text-[11px] text-ink-500">{item.coach}</span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                      index === 1 ? "bg-carbon-600 text-white" : "bg-ink-100 text-ink-700",
                    )}
                  >
                    {item.state}
                  </span>
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2.5">
          <p className="text-[11px] text-ink-600">
            <span className="font-semibold text-ink-900">Place opened at 09:00</span> · next member
            notified automatically
          </p>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ------------------------------------------------------ gym: memberships */

const memberships = [
  { plan: "Monthly unlimited", status: "Active", tone: "sage" },
  { plan: "10-class pack", status: "3 left", tone: "ink" },
  { plan: "Monthly unlimited", status: "Payment failed", tone: "clay" },
];

export function MembershipMockup({ className }: { className?: string }) {
  return (
    <BrowserFrame url="app.bizwisetech.com/members" className={className}>
      <div
        role="img"
        aria-label="Mockup of the membership screen: plans with their status, including a failed payment flagged for retry"
        className="bg-white p-4 sm:p-5"
      >
        <p className="text-sm font-bold text-ink-900">Memberships</p>

        <div className="mt-3 space-y-1.5">
          {memberships.map((row, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5"
            >
              <span className="h-7 w-7 shrink-0 rounded-full bg-ink-100" />
              <span className="min-w-0 flex-1">
                <span className="block h-2 w-16 rounded bg-ink-200" />
                <span className="mt-1.5 block truncate text-[11px] text-ink-500">{row.plan}</span>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold",
                  row.tone === "sage" && "bg-steel-100 text-steel-700",
                  row.tone === "ink" && "bg-ink-100 text-ink-700",
                  row.tone === "clay" && "bg-carbon-100 text-carbon-800",
                )}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-carbon-50 px-3 py-2.5">
          <p className="text-[11px] text-ink-700">
            <span className="font-semibold text-ink-900">1 payment needs attention.</span> Retry
            scheduled, member notified.
          </p>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ---------------------------------------------------------- dashboard */

const bars = [38, 52, 44, 68, 84, 61, 96];

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <BrowserFrame url="app.bizwisetech.com/dashboard" className={className}>
      <div
        role="img"
        aria-label="Mockup of the reporting dashboard: three summary tiles, a seven-day bar chart and two alerts"
        className="bg-white p-4 sm:p-5"
      >
        <div className="grid grid-cols-3 gap-2">
          {["Today", "This week", "Repeat"].map((label) => (
            <div key={label} className="rounded-lg border border-line p-2.5">
              <p className="text-[10px] font-medium text-ink-500">{label}</p>
              <p className="mt-1.5 h-3 w-12 rounded bg-ink-200" />
              <p className="mt-1.5 h-2 w-8 rounded bg-steel-500/40" />
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-line p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-ink-800">Last 7 days</p>
            <p className="text-[10px] text-ink-500">Compared with the week before</p>
          </div>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {bars.map((height, index) => (
              <div key={index} className="flex-1">
                <div
                  className={cn(
                    "rounded-t",
                    index === bars.length - 1 ? "bg-carbon-600" : "bg-carbon-200",
                  )}
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2 rounded-lg bg-chrome-50 px-2.5 py-2 text-[11px]">
            <span className="font-semibold text-ink-900">Low stock</span>
            <span className="text-ink-600">2 items below par</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-carbon-50 px-2.5 py-2 text-[11px]">
            <span className="font-semibold text-ink-900">Rota</span>
            <span className="text-ink-600">Saturday needs one more</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/** Pick a mockup by name, so content files can choose their own artwork. */
export function Mockup({
  kind,
  className,
}: {
  kind: "ordering" | "classes" | "membership" | "dashboard";
  className?: string;
}) {
  switch (kind) {
    case "ordering":
      return <OrderingMockup className={className} />;
    case "classes":
      return <ClassScheduleMockup className={className} />;
    case "membership":
      return <MembershipMockup className={className} />;
    case "dashboard":
      return <DashboardMockup className={className} />;
  }
}
