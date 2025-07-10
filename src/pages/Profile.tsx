import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [tab, setTab] = useState<"teams" | "tournaments" | "friends">("teams");
  const [teams, setTeams] = useState<any[]>([]);
  const [createdTournaments, setCreatedTournaments] = useState<any[]>([]);
  const [joinedTournaments, setJoinedTournaments] = useState<any[]>([]);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/teams/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTeams(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/tournaments")
      .then((res) => res.json())
      .then((data) => {
        setCreatedTournaments(
          data.filter((t) => String(t.created_by) === String(userId))
        );
        setJoinedTournaments(
          data.filter((t) =>
            Array.isArray(t.teams) &&
            t.teams.some((team) => team.members?.includes(userId))
          )
        );
      });
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#181c2f] py-20 pt-40">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Аватар і заголовок */}
        <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center mb-4 relative">
          <span className="text-7xl text-gray-400">👤</span>
          <button className="absolute bottom-4 right-4 bg-[#23263a] rounded-full p-2 text-white text-xs">
            <span role="img" aria-label="edit">
              📷
            </span>
          </button>
        </div>
        <div className="uppercase text-muted-foreground mb-2">USER</div>
        <h2 className="text-4xl font-extrabold mb-2">{username}</h2>
        <div className="flex items-center gap-2 mb-8">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          <span className="text-muted-foreground">Online</span>
          <span className="mx-2">•</span>
          <span className="text-muted-foreground">Registered 15 days ago</span>
        </div>

        {/* Вкладки */}
        <div className="flex gap-6 mb-8">
          <button
            className={`font-bold text-lg pb-1 border-b-2 transition ${
              tab === "teams"
                ? "border-blue-500 text-white"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
            onClick={() => setTab("teams")}
          >
            Teams
          </button>
          <button
            className={`font-bold text-lg pb-1 border-b-2 transition ${
              tab === "tournaments"
                ? "border-blue-500 text-white"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
            onClick={() => setTab("tournaments")}
          >
            Tournaments
          </button>
          <button
            className={`font-bold text-lg pb-1 border-b-2 transition ${
              tab === "friends"
                ? "border-blue-500 text-white"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
            onClick={() => setTab("friends")}
          >
            Friends
          </button>
        </div>

        {/* Контент вкладок */}
        <div className="w-full flex justify-center">
          {tab === "teams" && (
            // Teams tab content (скріншот 3)
            <div className="flex gap-8 flex-wrap">
              {teams.length === 0 && (
                <div className="text-white">No teams yet.</div>
              )}
              {teams.map((team) => (
                <Link
                  to={`/teams/${team.id}`}
                  key={team.id}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-32 h-32 rounded-full bg-[#23263a] flex items-center justify-center mb-2 group-hover:bg-[#13b7e6] transition">
                    <span className="text-5xl text-[#6c7a96] group-hover:text-white transition">
                      👥
                    </span>
                  </div>
                  <div className="text-white font-semibold group-hover:text-[#13b7e6] transition">
                    {team.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {team.is_captain ? "Captain" : "Member"}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {tab === "tournaments" && (
            // Tournaments tab content (скріншот 2)
            <div className="w-full">
              <h3 className="text-white text-lg font-bold mb-2">
                Створені турніри
              </h3>
              <div className="flex gap-6 flex-wrap mb-8">
                {createdTournaments.length === 0 && (
                  <div className="text-white">Ви ще не створили турнірів.</div>
                )}
                {createdTournaments.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#23263a] rounded-lg overflow-hidden w-72 p-4"
                  >
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {t.format}
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-white text-lg font-bold mb-2">
                Турніри, в яких ви берете участь
              </h3>
              <div className="flex gap-6 flex-wrap">
                {joinedTournaments.length === 0 && (
                  <div className="text-white">Ви ще не берете участь у турнірах.</div>
                )}
                {joinedTournaments.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#23263a] rounded-lg overflow-hidden w-72 p-4"
                  >
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {t.format}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "friends" && (
            // Friends tab content (скріншот 1)
            <div className="flex flex-col items-center">
              <span className="text-5xl text-[#6c7a96] mb-2">👥</span>
              <div className="text-white font-semibold mb-1">No Friends</div>
              <div className="text-muted-foreground mb-4">
                You have not added any friends.
              </div>
              <button className="bg-[#13b7e6] text-white px-6 py-2 rounded font-bold">
                Add friend
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;