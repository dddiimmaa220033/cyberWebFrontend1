import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TeamProfile = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // або "accessToken", якщо саме він валідний
    fetch(`http://localhost:3000/teams/${teamId}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setTeam(data));
  }, [teamId]);

  const [tab, setTab] = useState<"overview" | "members" | "statistics">("members");

  if (!team) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#10131c]">
      {/* Header */}
      <div className="container mx-auto pt-40 pb-4">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-[#23263a] flex items-center justify-center">
            <span className="text-6xl text-[#6c7a96]">👥</span>
          </div>
          <div>
            <div className="uppercase text-[#bfc9e0] text-xs font-semibold mb-1">TEAM</div>
            <div className="text-4xl font-extrabold text-white mb-1 tracking-wide">{team.teamName}</div>
            <div className="text-[#bfc9e0] text-sm">{team.members.length} member</div>
          </div>
          <button className="ml-auto bg-[#13b7e6] hover:bg-[#0fa1c7] text-white px-6 py-2 rounded font-bold transition">
            Invite
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto">
        <div className="flex gap-8 border-b border-[#23263a] mb-2 pl-2">
          <button
            className={`pb-2 font-semibold text-base transition ${
              tab === "overview"
                ? "border-b-2 border-blue-400 text-white"
                : "text-[#bfc9e0] hover:text-white"
            }`}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 font-semibold text-base transition ${
              tab === "members"
                ? "border-b-2 border-blue-400 text-white"
                : "text-[#bfc9e0] hover:text-white"
            }`}
            onClick={() => setTab("members")}
          >
            Members
          </button>
          <button
            className={`pb-2 font-semibold text-base transition ${
              tab === "statistics"
                ? "border-b-2 border-blue-400 text-white"
                : "text-[#bfc9e0] hover:text-white"
            }`}
            onClick={() => setTab("statistics")}
          >
            Statistics
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto">
        {tab === "members" && (
          <div>
            {/* Invite block */}
            <div className="bg-[#292c3c] rounded-lg p-5 mb-6">
              <div className="text-white font-semibold mb-1">Invite</div>
              <div className="text-[#bfc9e0] text-sm">Invite new members to the team.</div>
            </div>
            {/* Members list */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#23263a] flex items-center justify-center">
                <span className="text-4xl text-[#6c7a96]">👤</span>
              </div>
              <div>
                <div className="text-white font-semibold flex items-center gap-2">
                  {team.members[0].name}
                  <span className="ml-2 px-2 py-1 bg-[#23263a] rounded text-xs text-[#13b7e6]">Captain</span>
                </div>
                <div className="text-[#bfc9e0] text-sm">{team.members[0].registered}</div>
              </div>
            </div>
          </div>
        )}

        {tab === "overview" && (
          <div className="flex flex-col md:flex-row gap-8 py-10">
            {/* Activities */}
            <div className="flex-1 bg-transparent">
              <h2 className="text-white text-xl font-bold mb-6">Activities</h2>
              <div className="flex flex-col items-center justify-center h-48 bg-[#181c2f] rounded-lg">
                <span className="text-4xl text-[#6c7a96] mb-2">🔥</span>
                <div className="text-[#bfc9e0] font-semibold mb-1">No activities</div>
                <div className="text-[#bfc9e0] text-sm">This team has not played anything yet.</div>
              </div>
            </div>
            {/* About */}
            <div className="w-full md:w-96">
              <h2 className="text-white text-xl font-bold mb-4">About</h2>
              <div className="bg-[#23263a] rounded-lg p-6">
                <div className="text-white text-lg font-bold mb-2">About team</div>
                <div className="text-[#bfc9e0] text-sm">
                  {/* Тут можна підставити реальний опис з бекенду */}
                  This is a team page. Here you can add a description about your team, its goals, achievements, or any other information.
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "statistics" && (
          <div className="text-[#bfc9e0] text-lg py-10">No statistics yet.</div>
        )}
      </div>
    </div>
  );
};

export default TeamProfile;