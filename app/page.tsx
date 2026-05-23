"use client";

import {
  Car,
  Coffee,
  Fish,
  Hotel,
  MapPinned,
  Ship,
  Trees
} from "lucide-react";
import { useEffect, useState } from "react";

type TimelineState = "done" | "current" | "upcoming";

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [traffic, setTraffic] = useState<"normal" | "heavy">("normal");
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  /* ---------------- DAY 1 ---------------- */
  const itineraryDay1 = [
    {
      title: "🍴 Hi Life Lunch",
      start: "12:00",
      end: "13:00",
      icon: <Fish size={24} />,
      note: "Hi Life 九宮格很紅",
      detail:
        "Winslow 三角區核心：Hi Life / Ba Sa / Pegasus 3 分鐘內走完",
      map: mapUrl("Hi Life Bainbridge"),
    },
    {
      title: "☕ Pegasus Coffee",
      start: "13:00",
      end: "13:20",
      icon: <Coffee size={24} />,
      note: "紅磚咖啡館",
      detail: "冷萃很強，適合外帶",
      map: mapUrl("Pegasus Coffee Bainbridge"),
    },
    {
      title: "🌿 Bloedel Reserve",
      start: "14:30",
      end: "16:00",
      icon: <Trees size={24} />,
      note: "2:30 PM 光線最好",
      detail: "苔蘚森林 + 日式庭園",
      map: mapUrl("Bloedel Reserve"),
    },
    {
      title: "🇳🇴 Poulsbo Downtown",
      start: "16:30",
      end: "18:00",
      icon: <MapPinned size={24} />,
      note: "立鐘 + 紅色電話亭",
      detail: "Liberty Bay waterfront + playground",
      map: mapUrl("Poulsbo Waterfront Park"),
    },
    {
      title: "🍜 Yoko Yoko Ramen",
      start: "18:30",
      end: "20:00",
      icon: <Fish size={24} />,
      note: "改成 Bremerton 晚餐",
      detail: "吃完直接回 Fairfield Marriott",
      map: mapUrl("Yoko Yoko Ramen Bremerton"),
    },
    {
      title: "🏨 Fairfield Inn & Suites",
      start: "20:00",
      end: "23:00",
      icon: <Hotel size={24} />,
      note: "Bremerton check-in & rest",
      detail:
        "Fairfield by Marriott Inn & Suites Seattle Bremerton。今晚正式結束 island loop。",
      map: mapUrl(
        "Fairfield Inn & Suites Seattle Bremerton"
      ),
    },
  ];

  /* ---------------- DAY 2 ---------------- */
  const itineraryDay2 = [
    {
      title: "☕ Caffe Cocina",
      start: "09:00",
      end: "09:45",
      icon: <Coffee size={24} />,
      note: "Poulsbo morning coffee",
      detail: "老街咖啡，步行開始一天",
      map: mapUrl("Caffe Cocina Poulsbo"),
    },
    {
      title: "🥐 Sluys Bakery",
      start: "09:45",
      end: "10:30",
      icon: <Coffee size={24} />,
      note: "Viking donut",
      detail: "超大甜甜圈 + 百年烘焙坊",
      map: mapUrl("Sluys Poulsbo Bakery"),
    },
    {
      title: "🐚 SEA Discovery Center",
      start: "11:00",
      end: "12:30",
      icon: <Fish size={24} />,
      note: "touch tank",
      detail: "摸海星海膽海葵",
      map: mapUrl("SEA Discovery Center"),
    },
    {
      title: "🍜 Ba Sa Restaurant",
      start: "13:00",
      end: "14:00",
      icon: <Fish size={24} />,
      note: "越南料理",
      detail: "Winslow 三角區之一",
      map: mapUrl("Ba Sa Bainbridge"),
    },
    {
      title: "🏰 Battle Point Park",
      start: "14:00",
      end: "15:30",
      icon: <Trees size={24} />,
      note: "巨大木造遊樂場",
      detail: "KidsUp! 城堡 playground",
      map: mapUrl("Battle Point Park"),
    },
    {
      title: "🚢 Ferry Return",
      start: "17:30",
      end: "19:00",
      icon: <Ship size={24} />,
      note: "回 Seattle",
      detail: "塞車可改吃 Proper Fish / Pia 巨人",
      map: mapUrl("Bainbridge Ferry Terminal"),
    },
  ];

  const itinerary =
    selectedDay === 1 ? itineraryDay1 : itineraryDay2;

  function getState(start: string, end: string): TimelineState {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const s = sh * 60 + sm;
    const e = eh * 60 + em;

    if (currentMinutes > e) return "done";
    if (currentMinutes >= s) return "current";
    return "upcoming";
  }

  function mapUrl(q: string) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      q
    )}`;
  }

  return (
    <main className="min-h-screen bg-[#F6F2EB] px-4 py-6">

      {/* HEADER */}
      <div className="text-3xl font-black">🌲 Island Trip</div>
      <div className="text-zinc-500">
        Seattle → Bainbridge → Poulsbo → Bremerton
      </div>

      {/* DAY SWITCH */}
      <div className="mt-5 flex rounded-full bg-white p-1 shadow-sm">
        <button
          onClick={() => setSelectedDay(1)}
          className={`flex-1 rounded-full py-2 font-bold ${selectedDay === 1 ? "bg-black text-white" : ""
            }`}
        >
          Day 1
        </button>
        <button
          onClick={() => setSelectedDay(2)}
          className={`flex-1 rounded-full py-2 font-bold ${selectedDay === 2 ? "bg-black text-white" : ""
            }`}
        >
          Day 2
        </button>
      </div>

      {/* LIST */}
      <div className="mt-6 space-y-4">
        {itinerary.map((item, i) => {
          const state = getState(item.start, item.end);

          return (
            <a
              key={i}
              href={item.map}
              target="_blank"
              className={`
                block rounded-3xl bg-white p-5 shadow-sm transition
                ${state === "current" ? "scale-[1.02] shadow-lg" : ""}
              `}
            >

              {/* TOP */}
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xl font-black">
                    {item.title}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {item.start} - {item.end}
                  </div>
                  <div className="mt-2 text-sm">{item.note}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {item.detail}
                  </div>
                </div>

                {/* ICON RIGHT */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F4EE]">
                  {item.icon}
                </div>
              </div>

              {/* ROUTE */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="flex-1 border-t border-dashed" />
                <div className="h-2 w-2 rounded-full bg-red-500" />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-zinc-500">
                  Tap to open map
                </div>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <Car size={16} />
                  Navigate
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* FERRY CONTROL */}
      <div className="fixed bottom-4 left-4 right-4 rounded-2xl bg-white p-3 shadow-xl">
        <div className="mb-2 text-xs text-zinc-500">
          Ferry Status
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setTraffic("normal")}
            className={`rounded-xl py-2 ${traffic === "normal"
              ? "bg-black text-white"
              : "bg-zinc-100"
              }`}
          >
            OK
          </button>
          <button
            onClick={() => setTraffic("heavy")}
            className={`rounded-xl py-2 ${traffic === "heavy"
              ? "bg-black text-white"
              : "bg-zinc-100"
              }`}
          >
            Heavy
          </button>
        </div>
      </div>

    </main>
  );
}