"use client";

import {
  Car,
  Clock3,
  CloudSun,
  Coffee,
  Fish,
  Hotel,
  MapPin,
  MapPinned,
  Ship,
  Trees,
  Waves,
} from "lucide-react";
import { useEffect, useState } from "react";

type TimelineState = "done" | "current" | "upcoming";

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [traffic, setTraffic] = useState<"normal" | "heavy">("normal");
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000 * 30);

    return () => clearInterval(timer);
  }, []);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Day 1 itinerary
  const itineraryDay1 = [
    {
      title: "🍴 Hi Life Lunch",
      start: "12:00",
      end: "13:00",
      icon: <Fish size={24} />,
      note: "Hi Life 的 9-square bento 很多人推。",
      detail:
        "與 Pegasus / Ba Sa 形成 Winslow 黃金三角。停好車後步行即可完成午餐與咖啡。",
      map: mapUrl("Hi Life Bainbridge Island"),
    },
    {
      title: "☕ Pegasus Coffee",
      start: "13:00",
      end: "13:20",
      icon: <Coffee size={24} />,
      note: "老字號紅磚咖啡館。",
      detail: "冷萃與拿鐵都很熱門。很適合外帶上車。",
      map: mapUrl("Pegasus Coffee Bainbridge"),
    },
    {
      title: "🌿 Bloedel Reserve",
      start: "14:30",
      end: "16:00",
      icon: <Trees size={24} />,
      note: "2:30 PM 入場光線超美。",
      detail:
        "苔蘚森林與日式庭園非常夢幻。推車友善。離開後寶寶通常會在車上午睡 15–20 分鐘。",
      map: mapUrl("Bloedel Reserve"),
    },
    {
      title: "🇳🇴 Poulsbo Downtown",
      start: "16:30",
      end: "18:00",
      icon: <MapPinned size={24} />,
      note: "Liberty Bay Waterfront Park 散步。",
      detail:
        "有立鐘與紅色電話亭可以拍照。playground 很適合小孩放電。",
      map: mapUrl("Poulsbo Waterfront Park"),
    },
    {
      title: "🍜 Yoko Yoko Ramen",
      start: "18:30",
      end: "20:00",
      icon: <Fish size={24} />,
      note: "已改成 Bremerton 晚餐。",
      detail: "比 JJ's Fish House 更順路。吃完直接回 Fairfield Marriott。",
      map: mapUrl("Yoko Yoko Ramen Bremerton"),
    },
    {
      title: "🏨 Fairfield Bremerton",
      start: "20:00",
      end: "23:00",
      icon: <Hotel size={24} />,
      note: "回旅館休息。",
      detail: "Fairfield by Marriott Inn & Suites Seattle Bremerton。",
      map: mapUrl("Fairfield Inn & Suites Seattle Bremerton"),
    },
  ];

  // Day 2 itinerary
  const itineraryDay2 = [
    {
      title: "☕ Caffe Cocina",
      start: "09:00",
      end: "09:45",
      icon: <Coffee size={24} />,
      note: "Poulsbo 早晨精品咖啡。",
      detail: "買完咖啡可以直接去 Sluys Bakery。",
      map: mapUrl("Caffe Cocina Poulsbo"),
    },
    {
      title: "🥐 Sluys Poulsbo Bakery",
      start: "09:45",
      end: "10:30",
      icon: <Coffee size={24} />,
      note: "Viking Donut 很有名。",
      detail: "百年麵包店。比臉還大的甜甜圈。",
      map: mapUrl("Sluys Poulsbo Bakery"),
    },
    {
      title: "🐋 SEA Discovery Center",
      start: "11:00",
      end: "12:30",
      icon: <Fish size={24} />,
      note: "Touch tank 摸海星。",
      detail: "小朋友通常都會玩到不想離開。",
      map: mapUrl("SEA Discovery Center"),
    },
    {
      title: "🍜 Ba Sa Restaurant",
      start: "13:00",
      end: "14:00",
      icon: <Fish size={24} />,
      note: "如果昨天吃 Hi Life，今天很適合 Ba Sa。",
      detail: "蒜香麵與現代越南料理非常強。",
      map: mapUrl("Ba Sa Restaurant Bainbridge"),
    },
    {
      title: "🏰 Battle Point Park",
      start: "14:00",
      end: "15:30",
      icon: <Trees size={24} />,
      note: "巨大木造城堡 playground。",
      detail: "KidsUp! 遊樂場超適合放電。",
      map: mapUrl("Battle Point Park"),
    },
    {
      title: "🛍 Bainbridge Downtown",
      start: "16:00",
      end: "17:30",
      icon: <MapPinned size={24} />,
      note: "最後散步與補貨。",
      detail: "寶寶通常這時會在推車睡午覺。",
      map: mapUrl("Winslow Bainbridge Island"),
    },
    {
      title: "🚢 Ferry Return",
      start: "17:30",
      end: "19:00",
      icon: <Ship size={24} />,
      note: "抓時間回 Seattle。",
      detail: "若塞車可改 Proper Fish / Pia giant。",
      map: mapUrl("Bainbridge Ferry Terminal"),
    },
  ];

  const itinerary = selectedDay === 1 ? itineraryDay1 : itineraryDay2;

  function getTimelineState(start: string, end: string): TimelineState {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;

    if (currentMinutes > endMin) return "done";
    if (currentMinutes >= startMin && currentMinutes <= endMin) return "current";
    return "upcoming";
  }

  function smartSuggestion() {
    if (traffic === "heavy") {
      return "⚠ Ferry traffic heavy → 建議先吃 Proper Fish 或找 Pia 巨人";
    }
    if (currentMinutes > 12 * 60 + 45) {
      return "💡 現在很適合前往 Bloedel Reserve";
    }
    return "🟢 Ferry 狀況正常";
  }

  return (
    <main className="min-h-screen bg-[#F6F2EB] px-4 pb-40 pt-6">

      {/* HERO */}
      <section className="mb-6">
        <div className="text-4xl font-black tracking-tight">🌲 Island Weekend</div>
        <div className="mt-2 text-zinc-500">Seattle → Bainbridge → Poulsbo → Bremerton</div>
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
          <Clock3 size={16} />
          {now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </div>
      </section>

      {/* DAY SELECTOR */}
      <section className="mb-6">
        <div className="flex rounded-full bg-white p-1 shadow-sm">
          <button
            onClick={() => setSelectedDay(1)}
            className={`flex-1 rounded-full py-3 text-sm font-bold transition ${selectedDay === 1 ? "bg-black text-white" : "text-zinc-500"
              }`}
          >
            SAT • Day 1
          </button>
          <button
            onClick={() => setSelectedDay(2)}
            className={`flex-1 rounded-full py-3 text-sm font-bold transition ${selectedDay === 2 ? "bg-black text-white" : "text-zinc-500"
              }`}
          >
            SUN • Day 2
          </button>
        </div>
      </section>

      {/* WEATHER */}
      <section className="mb-4 rounded-[32px] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-zinc-500">WEATHER</div>
            <div className="mt-2 text-3xl font-black">63°</div>
            <div className="text-zinc-500">Partly Cloudy</div>
          </div>
          <CloudSun size={44} />
        </div>
      </section>

      {/* FERRY */}
      <section className="mb-6 rounded-[32px] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-zinc-500">FERRY STATUS</div>
            <div
              className={`mt-2 text-2xl font-black ${traffic === "heavy" ? "text-red-500" : "text-green-600"
                }`}
            >
              {traffic === "heavy" ? "⚠ Heavy Traffic" : "🟢 Smooth Sailing"}
            </div>
            <div className="mt-2 text-sm text-zinc-500">{smartSuggestion()}</div>
          </div>
          <Ship size={44} />
        </div>
      </section>

      {/* LIVE TIMELINE */}
      <section className="space-y-4">
        <div className="mb-2 text-sm font-bold tracking-wide text-zinc-500">
          LIVE TIMELINE
        </div>

        {itinerary.map((item, i) => {
          const state = getTimelineState(item.start, item.end);

          return (
            <a
              href={item.map}
              target="_blank"
              key={i}
              className={`
                block rounded-[32px] p-5 transition-all shadow-sm
                ${state === "current"
                  ? `
                    scale-[1.03]
                    border border-white/40
                    bg-white/80
                    backdrop-blur-xl
                    shadow-[0_10px_40px_rgba(74,222,128,0.18)]
                  `
                  : ""}
                ${state === "done" ? "bg-white border border-zinc-100" : ""}
                ${state === "upcoming" ? "bg-white" : ""}
              `}
            >
              {state === "current" && (
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  LIVE NOW
                </div>
              )}

              {/* TOP ROW */}
              <div className="flex items-start justify-between gap-4">
                {/* LEFT CONTENT */}
                <div className="flex-1">
                  <div className="text-2xl font-black">{item.title}</div>
                  <div className="mt-1 text-sm text-zinc-500">
                    {item.start} – {item.end}
                  </div>
                  <div className="mt-3 text-zinc-700">{item.note}</div>
                  <div className="mt-2 text-sm leading-relaxed text-zinc-500">{item.detail}</div>
                </div>

                {/* RIGHT ICON */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F6F4EE] text-zinc-700">
                  {item.icon}
                </div>
              </div>

              {/* ROUTE FLOW */}
              <div className="mt-5">
                <div className="mb-4 flex items-center gap-2">
                  {/* START */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                    <MapPin size={16} />
                  </div>
                  {/* ROUTE */}
                  <div className="relative flex flex-1 items-center">
                    <div className="h-[4px] flex-1 rounded-full bg-gradient-to-r from-red-400 via-zinc-300 to-red-400 overflow-hidden">
                      <div
                        className="absolute top-[-4px] h-3 w-3 rounded-full bg-green-500 animate-pulse"
                        style={{ left: "45%" }}
                      />
                    </div>
                  </div>
                  {/* DESTINATION */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                    <MapPinned size={16} />
                  </div>
                </div>

                {/* NAVIGATION */}
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-600">
                    <Waves size={14} />
                    Bainbridge Route
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
                    <Car size={16} />
                    Navigate
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </section>

      {/* NOTES */}
      <section className="mt-8 rounded-[32px] bg-[#EBF3F5] p-5">
        <div className="text-lg font-black">📱 Smart Trip Notes</div>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700">
          <li>• 建議提前下載 WSDOT App 或查看 Vessel Watch 查詢 ferry queue。</li>
          <li>• Ba Sa、Hi Life、Pegasus 都在 Winslow downtown，步行距離不到 3 分鐘。</li>
          <li>• Proper Fish 的 fish & chips 很多人認為是 Bainbridge 天花板。</li>
          <li>• Pia the Peacekeeper 屬於 optional contingency stop，可看小孩體力決定。</li>
          <li>• Poulsbo downtown 的立鐘與紅色電話亭很適合拍照。</li>
          <li>• 若 SEA Discovery Center 玩太久，可直接切換 Sogno di Vino + Fay Bainbridge Park 路線。</li>
        </ul>
      </section>

      {/* FLOATING CONTROLS */}
      <section className="fixed bottom-4 left-4 right-4 rounded-[28px] bg-white/90 p-4 shadow-xl backdrop-blur-xl">
        <div className="mb-3 text-xs font-bold text-zinc-500">LIVE FERRY MODE</div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTraffic("normal")}
            className={`rounded-2xl py-3 font-bold transition ${traffic === "normal" ? "bg-black text-white" : "bg-zinc-200"
              }`}
          >
            Ferry OK
          </button>
          <button
            onClick={() => setTraffic("heavy")}
            className={`rounded-2xl py-3 font-bold transition ${traffic === "heavy" ? "bg-black text-white" : "bg-zinc-200"
              }`}
          >
            Heavy Traffic
          </button>
        </div>
      </section>
    </main>
  );
}

function mapUrl(q: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}