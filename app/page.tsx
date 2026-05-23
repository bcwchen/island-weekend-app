"use client";

import {
  CloudSun,
  Coffee,
  Fish,
  MapPinned,
  Ship,
  Trees,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [traffic, setTraffic] = useState<"normal" | "heavy">("normal");
  const [routeMode, setRouteMode] = useState<"ontime" | "late">("ontime");
  const [kidMode, setKidMode] = useState(true);

  // Navigation 永遠可用，但最佳時間會 highlight
  const isBestTime = traffic === "normal";

  const navLabel = isBestTime
    ? "⭐ Best Time → Navigate"
    : "Navigate";

  const navClass = isBestTime
    ? "bg-yellow-400 text-black animate-pulse"
    : "bg-white text-green-700";

  function getFerryStatus() {
    if (traffic === "heavy") {
      return {
        title: "⚠ Heavy Traffic",
        color: "text-red-500",
        suggestion: "🍴 Go eat first or delay ferry",
      };
    }

    return {
      title: "🟢 Smooth Sailing",
      color: "text-green-600",
      suggestion: "Perfect time to board",
    };
  }

  function getSuggestion() {
    if (traffic === "heavy") {
      return "🍴 Suggested: Eat first (Proper Fish)";
    }

    return "⭐ You can go anytime — smooth travel";
  }

  const ferry = getFerryStatus();

  function mapUrl(q: string) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      q
    )}`;
  }

  return (
    <main className={`min-h-screen px-4 pb-32 pt-6 ${kidMode ? "bg-[#f5f1ea]" : ""}`}>

      {/* HERO */}
      <section className="mb-6">
        <div className="text-4xl font-black tracking-tight">
          🌲 Island Weekend
        </div>

        <div className="mt-2 text-zinc-500">
          Seattle → Bainbridge → Poulsbo
        </div>

        <button
          onClick={() => setKidMode(!kidMode)}
          className="mt-3 text-sm underline"
        >
          Toggle Kid Mode
        </button>
      </section>

      {/* WEATHER */}
      <section className="bg-white/70 backdrop-blur rounded-[28px] p-5 shadow mb-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-zinc-500">WEATHER</div>
            <div className="text-3xl font-black mt-2">63°</div>
            <div className="text-zinc-500">Partly Cloudy</div>
          </div>
          <CloudSun size={40} />
        </div>
      </section>

      {/* FERRY */}
      <section className="bg-white/70 backdrop-blur rounded-[28px] p-5 shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-zinc-500">FERRY STATUS</div>
            <div className={`text-2xl font-black mt-2 ${ferry.color}`}>
              {ferry.title}
            </div>
            <div className="text-zinc-500 text-sm mt-1">
              {ferry.suggestion}
            </div>
          </div>
          <Ship size={40} />
        </div>
      </section>

      {/* NEXT STOP */}
      <section className="bg-[#4B6B5A] text-white rounded-[32px] p-6 mb-6">
        <div className="text-xs tracking-widest opacity-70">
          NEXT STOP
        </div>

        <div className="text-3xl font-black mt-3">
          🍜 Ba Sa Lunch
        </div>

        <div className="mt-2 opacity-80">
          12:30 PM
        </div>

        <a
          href={mapUrl("Ba Sa Restaurant Bainbridge")}
          target="_blank"
          className={`mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold ${navClass}`}
        >
          <MapPinned size={18} />
          {navLabel}
        </a>

        <div className="mt-3 text-sm opacity-80">
          {getSuggestion()}
        </div>
      </section>

      {/* TODAY FLOW */}
      <section className="space-y-4">
        <div className="text-sm font-bold text-zinc-500">
          TODAY FLOW
        </div>

        <Card
          icon={<Coffee />}
          title="Pegasus Coffee"
          subtitle="1:15 PM"
          note="Ivy brick café"
          map={mapUrl("Pegasus Coffee Bainbridge")}
        />

        <Card
          icon={<Trees />}
          title="Bloedel Reserve"
          subtitle="2:30 PM"
          note="Forest + stroller friendly"
          map={mapUrl("Bloedel Reserve")}
        />

        <Card
          icon={<Fish />}
          title="JJ's Fish House"
          subtitle="6:00 PM"
          note="Fish & chips dinner"
          map={mapUrl("JJ's Fish House Poulsbo")}
        />
      </section>

      {/* CONTROLS */}
      <section className="fixed bottom-4 left-4 right-4 bg-white/80 backdrop-blur rounded-[24px] p-4 shadow">

        <div className="text-xs font-bold text-zinc-500 mb-3">
          TRIP CONTROLS
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTraffic("normal")}
            className={`py-3 rounded-xl font-bold ${traffic === "normal"
                ? "bg-black text-white"
                : "bg-zinc-200"
              }`}
          >
            Ferry OK
          </button>

          <button
            onClick={() => setTraffic("heavy")}
            className={`py-3 rounded-xl font-bold ${traffic === "heavy"
                ? "bg-black text-white"
                : "bg-zinc-200"
              }`}
          >
            Heavy Traffic
          </button>
        </div>
      </section>

    </main>
  );
}

function Card({
  icon,
  title,
  subtitle,
  note,
  map,
}: any) {
  return (
    <a
      href={map}
      target="_blank"
      className="block bg-white/70 backdrop-blur rounded-[28px] p-5 shadow"
    >
      <div className="flex gap-4">
        <div>{icon}</div>

        <div>
          <div className="text-xl font-black">{title}</div>
          <div className="text-sm text-zinc-500">{subtitle}</div>
          <div className="mt-2 text-zinc-600">{note}</div>
        </div>
      </div>
    </a>
  );
}