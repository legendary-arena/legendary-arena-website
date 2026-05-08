import { LegendaryArenaLogo } from "./components/LegendaryArenaLogo";

export default function App() {
  return (
    <div className="size-full overflow-auto bg-zinc-50">
      <div className="max-w-5xl mx-auto p-12 flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">
            Legendary Arena Logo
          </h1>
          <div className="text-sm opacity-70 leading-relaxed max-w-2xl">
            A skill-first, heroic mark built on converging
            geometry. The hexagonal arena represents
            deterministic systems, while the six converging
            lines to the central apex symbolize mastery paths.
            Upward pillars with sharp terminals reinforce player
            agency and earned standing. The bold wordmark with
            tier indicators anchors the visual identity.
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-sm uppercase tracking-wider opacity-60">
              Primary Logo – Light Background
            </h2>
            <div className="bg-white p-12 rounded-lg border border-zinc-200">
              <LegendaryArenaLogo />
            </div>
            <p className="text-xs opacity-50">
              legendary-arena-logo.svg
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm uppercase tracking-wider opacity-60">
              Primary Logo – Dark Background
            </h2>
            <div className="bg-zinc-900 p-12 rounded-lg border border-zinc-700">
              <LegendaryArenaLogo className="[&_path]:!stroke-white [&_rect]:!fill-white [&_circle]:!fill-white [&_text]:!fill-white" />
            </div>
            <p className="text-xs opacity-50">
              legendary-arena-logo-dark.svg
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-sm uppercase tracking-wider opacity-60">
                Icon Only – 140×140
              </h2>
              <div className="bg-white p-8 rounded-lg border border-zinc-200 flex items-center justify-center">
                <img
                  src="/legendary-arena-icon.svg"
                  alt="Legendary Arena Icon"
                  className="w-32 h-32"
                />
              </div>
              <p className="text-xs opacity-50">
                legendary-arena-icon.svg (for favicon, app icon)
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-sm uppercase tracking-wider opacity-60">
                Reduced Size – 200×100
              </h2>
              <div className="bg-white p-8 rounded-lg border border-zinc-200 flex items-center justify-center">
                <LegendaryArenaLogo width={200} height={100} />
              </div>
              <p className="text-xs opacity-50">
                Scalable for headers and compact layouts
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-zinc-200 pt-8">
          <h3 className="font-semibold">Design Rationale</h3>
          <ul className="text-sm opacity-70 space-y-2 leading-relaxed">
            <li>
              <strong>Hexagonal boundary:</strong> Symmetry and
              grid-aligned construction reflect deterministic,
              knowable systems
            </li>
            <li>
              <strong>Converging lines:</strong> Six paths
              meeting at a central apex represent skill mastery
              and player agency
            </li>
            <li>
              <strong>Upward pillars:</strong> Strong verticals
              with sharp terminals create forward thrust and
              heroic weight
            </li>
            <li>
              <strong>Low ornament:</strong> No sparkle, glow,
              or loot aesthetics — clean geometry only
            </li>
            <li>
              <strong>Tier marks:</strong> Three squares below
              the wordmark suggest progression through earned
              standing
            </li>
            <li>
              <strong>Bold letterforms:</strong> Wide tracking
              and strong weight contrast support "assemble ·
              fight · master · become"
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 border-t border-zinc-200 pt-8">
          <h3 className="font-semibold">Files Generated</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded border border-zinc-200">
              <p className="font-mono text-xs mb-1">
                legendary-arena-logo.svg
              </p>
              <p className="text-xs opacity-60">
                Full logo, dark marks
              </p>
            </div>
            <div className="bg-white p-4 rounded border border-zinc-200">
              <p className="font-mono text-xs mb-1">
                legendary-arena-logo-dark.svg
              </p>
              <p className="text-xs opacity-60">
                Full logo, white marks
              </p>
            </div>
            <div className="bg-white p-4 rounded border border-zinc-200">
              <p className="font-mono text-xs mb-1">
                legendary-arena-icon.svg
              </p>
              <p className="text-xs opacity-60">
                Icon only, 140×140
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}