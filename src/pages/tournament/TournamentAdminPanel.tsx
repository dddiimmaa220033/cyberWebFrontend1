import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

interface Team {
  id: string;
  name: string;
  avatar: string;
}

interface Tournament {
  id: string;
  name: string;
  status: string;
  bannerUrl: string;
  format: string;
  description: string;
  rules: string;
  players_per_team: number;
  prize_pool?: string;
  start_date: string;
  registration_start?: string;
  registration_end?: string;
  ready_start?: string;
  ready_end?: string;
  teams?: Team[];
  max_teams?: number;
  created_at: string; // ДОДАЙ ЦЕЙ РЯДОК
  created_by: string; // username або id організатора
}

function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || payload.user_id || null;
  } catch {
    return null;
  }
}
const userId = String(getUserIdFromToken());

const TournamentAdminPanel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);

  // Таймер до старту
  const [timeLeft, setTimeLeft] = useState<string>("");

  const username = localStorage.getItem("username");
  // const userId = localStorage.getItem("user_id");

  useEffect(() => {
    // Замініть на свій API-запит
    fetch(`http://localhost:3000/tournaments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTournament(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!tournament || !tournament.start_date) return;
    const interval = setInterval(() => {
      // Час початку турніру
      const start = new Date(tournament.start_date).getTime();
      // Поточний час
      const now = new Date().getTime();
      // Рахуємо від поточного часу до старту
      let diff = Math.max(0, start - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [tournament]);

  if (loading) {
    return <div className="text-center text-white pt-32">Завантаження...</div>;
  }

  if (!tournament) {
    return <div className="text-center text-red-500 pt-32">Турнір не знайдено</div>;
  }

  return (
    <div className="min-h-screen bg-esports-gray pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Верхній блок з банером і таймером */}
        <div className="relative h-56 w-full mb-8 rounded-xl overflow-hidden flex items-end">
          <img
            src={tournament.bannerUrl}
            alt={tournament.name}
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end w-full justify-between p-8">
            <div>
              <h1 className="text-4xl font-bold text-white">{tournament.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="bg-cyan-600 text-white px-3 py-1 rounded">{tournament.status}</span>
                <span className="text-white">
                  {new Date(tournament.start_date).toLocaleString("uk-UA", {
                    weekday: "short",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="text-gray-400 mt-1 text-sm">
                Приблизно через {timeLeft}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-sm">
                <span className="font-semibold">Почнеться через</span> <span className="font-mono">{timeLeft}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Плашка з підтвердженням готовності */}
        <div className="mb-6">
          <div className="bg-cyan-700/90 rounded-lg p-3 flex flex-col md:flex-row items-center gap-4">
            <span className="text-white text-sm flex-1">
              <span className="inline-flex items-center gap-2">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline-block"><circle cx="12" cy="12" r="10" fill="#fff" fillOpacity="0.2"/><path d="M12 8v4l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Чекаємо, коли відкриється вікно підтвердження (це відбудеться {new Date("2025-07-07T17:15:00").toLocaleString("uk-UA")}).
              </span>
            </span>
            <div className="flex gap-2">
              <Button variant="secondary">Редагування</Button>
              <Button variant="outline" disabled>Підтвердити готовність</Button>
            </div>
          </div>
        </div>
        {/* Далі Tabs як було */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Огляд</TabsTrigger>
            <TabsTrigger value="bracket">Сітка</TabsTrigger>
            <TabsTrigger value="matches">Матчі</TabsTrigger>
            <TabsTrigger value="teams">Команди</TabsTrigger>
            {String(tournament?.created_by) === userId && (
              <TabsTrigger value="settings">Налаштування</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Ліва частина: Формат + Інформація */}
              <div className="md:col-span-2 space-y-6">
                {/* Формат */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Приклад картки формату */}
                  <div className="p-4 bg-[#23263a] rounded-lg">
                    <div className="font-bold text-white mb-2">Формат</div>
                    <div className="text-gray-300">{tournament.format}</div>
                  </div>
                  <div className="p-4 bg-[#23263a] rounded-lg">
                    <div className="font-bold text-white mb-2">Розмір команди</div>
                    <div className="text-gray-300">{tournament.players_per_team} на {tournament.players_per_team}</div>
                  </div>
                  {/* Додай інші картки формату за потреби */}
                </div>
                {/* Інформація */}
                <div>
                  <div className="font-bold text-white mb-2">Інформація</div>
                  <div className="text-white font-semibold">{tournament.description}</div>
                  <div className="mt-4">
                    <div className="font-bold text-white mb-2">Правила</div>
                    <div className="text-gray-300 whitespace-pre-line">{tournament.rules}</div>
                  </div>
                </div>
              </div>
              {/* Права частина: Гравці + Графік */}
              <div className="space-y-6">
                {/* Гравці */}
                <div className="p-4 bg-[#23263a] rounded-lg">
                  <div className="font-bold text-white mb-2">Гравці</div>
                  <div className="flex items-center justify-between mb-2 text-xs text-gray-400">
                    <div>Учасників <span className="text-white font-bold">{tournament.teams?.length || 0}</span></div>
                    <div>Готово <span className="text-white font-bold">0</span></div>
                    <div>Slots <span className="text-white font-bold">{tournament.max_teams || 16}</span></div>
                  </div>
                  <div className="border-b border-gray-700 mb-2" />
                  <div className="flex items-center space-x-[-10px] mb-1">
                    {(tournament.teams || []).slice(0, 4).map((team, idx) => (
                      <img
                        key={team.id}
                        src={team.avatar}
                        alt={team.name}
                        className="w-8 h-8 rounded-full border-2 border-[#23263a] z-10"
                        style={{ marginLeft: idx === 0 ? 0 : -10 }}
                      />
                    ))}
                    {(tournament.teams?.length || 0) > 4 && (
                      <span className="ml-2 text-xs text-gray-400">
                        + ещё {tournament.teams.length - 4} учасн.
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {(tournament.teams || []).slice(0, 2).map((team) => team.name).join(", ")}
                    {tournament.teams && tournament.teams.length > 2 && (
                      <> и ещё {tournament.teams.length - 2} учасн. зарегистрированы</>
                    )}
                  </div>
                </div>
                {/* Графік */}
                <div className="p-4 bg-[#23263a] rounded-lg">
                  <div className="font-bold text-white mb-2">Графік</div>
                  <div className="space-y-4">
                    {/* Вікно готовності відкривається */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-[#181a23] text-white text-xs font-bold px-2 py-1 rounded">
                          {tournament.ready_start
                            ? new Date(tournament.ready_start).toLocaleString("uk-UA", { month: "2-digit" })
                            : "--"}
                          <br />
                          {tournament.ready_start
                            ? new Date(tournament.ready_start).toLocaleString("uk-UA", { day: "2-digit" })
                            : "--"}
                        </div>
                        <div className="h-full w-px bg-gray-700 flex-1" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">
                          {tournament.ready_start
                            ? new Date(tournament.ready_start).toLocaleString("uk-UA", {
                                weekday: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                timeZone: "Europe/Kyiv"
                              })
                            : "--"}
                        </div>
                        <div className="font-semibold text-white">Вікно готовності відкривається</div>
                        <div className="text-xs text-gray-400">
                          Підтвердіть готовність і підтвердьте, що можете грати.
                        </div>
                      </div>
                    </div>
                    {/* Реєстрація закрита */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-[#181a23] text-white text-xs font-bold px-2 py-1 rounded">
                          {tournament.registration_end
                            ? new Date(tournament.registration_end).toLocaleString("uk-UA", { month: "2-digit" })
                            : "--"}
                          <br />
                          {tournament.registration_end
                            ? new Date(tournament.registration_end).toLocaleString("uk-UA", { day: "2-digit" })
                            : "--"}
                        </div>
                        <div className="h-full w-px bg-gray-700 flex-1" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">
                          {tournament.registration_end
                            ? new Date(tournament.registration_end).toLocaleString("uk-UA", {
                                weekday: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                timeZone: "Europe/Kyiv"
                              })
                            : "--"}
                        </div>
                        <div className="font-semibold text-white">Реєстрація закрита</div>
                        <div className="text-xs text-gray-400">
                          Більше не можна зареєструватися.
                        </div>
                      </div>
                    </div>
                    {/* Вікно готовності закривається */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-[#181a23] text-white text-xs font-bold px-2 py-1 rounded">
                          {tournament.ready_end
                            ? new Date(tournament.ready_end).toLocaleString("uk-UA", { month: "2-digit" })
                            : "--"}
                          <br />
                          {tournament.ready_end
                            ? new Date(tournament.ready_end).toLocaleString("uk-UA", { day: "2-digit" })
                            : "--"}
                        </div>
                        <div className="h-full w-px bg-gray-700 flex-1" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">
                          {tournament.ready_end
                            ? new Date(tournament.ready_end).toLocaleString("uk-UA", {
                                weekday: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                timeZone: "Europe/Kyiv"
                              })
                            : "--"}
                        </div>
                        <div className="font-semibold text-white">Вікно готовності закривається</div>
                        <div className="text-xs text-gray-400">
                          Більше не можна підтвердити готовність.
                        </div>
                      </div>
                    </div>
                    {/* Старт */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-[#181a23] text-white text-xs font-bold px-2 py-1 rounded">
                          {tournament.start_date
                            ? new Date(tournament.start_date).toLocaleString("uk-UA", { month: "2-digit" })
                            : "--"}
                          <br />
                          {tournament.start_date
                            ? new Date(tournament.start_date).toLocaleString("uk-UA", { day: "2-digit" })
                            : "--"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">
                          {tournament.start_date
                            ? new Date(tournament.start_date).toLocaleString("uk-UA", {
                                weekday: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                timeZone: "Europe/Kyiv"
                              })
                            : "--"}
                        </div>
                        <div className="font-semibold text-white">Старт</div>
                        <div className="text-xs text-gray-400">Початок змагання</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          {/* Інші вкладки можна реалізувати за потреби */}
          <TabsContent value="bracket">
            <div className="bg-[#23263a] rounded-lg p-4 min-h-[120px] text-muted-foreground">
              Тут буде сітка турніру
            </div>
          </TabsContent>
          <TabsContent value="matches">
            <div className="bg-[#23263a] rounded-lg p-4 min-h-[120px] text-muted-foreground">
              Тут буде список матчів
            </div>
          </TabsContent>
          <TabsContent value="teams">
            <div className="bg-[#23263a] rounded-lg p-4 min-h-[120px] text-muted-foreground">
              Тут буде керування командами
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="bg-[#23263a] rounded-lg p-4 min-h-[120px] text-muted-foreground">
              Тут будуть налаштування турніру
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentAdminPanel;