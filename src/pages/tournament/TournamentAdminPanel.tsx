import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Settings, ArrowLeft } from "lucide-react";

const TournamentAdminPanel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-esports-gray pt-28 pb-10">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" /> Back to tournaments
        </Button>
        <div className="bg-card/80 rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <Trophy className="text-esports-purple" />
              Tournament Admin Panel
            </h1>
            <p className="text-muted-foreground mb-4">
              Управління турніром <span className="font-semibold">ID: {id}</span>
            </p>
            {/* Інформація про турнір */}
            <div className="mb-6">
              <h2 className="font-semibold mb-1">Основна інформація</h2>
              <ul className="text-sm text-muted-foreground list-disc pl-5">
                <li>Назва турніру: <span className="text-white">...</span></li>
                <li>Статус: <span className="text-white">...</span></li>
                <li>Дата початку: <span className="text-white">...</span></li>
              </ul>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Button variant="outline">
                <Users className="mr-2" /> Керувати учасниками
              </Button>
              <Button variant="outline">
                <Settings className="mr-2" /> Налаштування турніру
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold mb-2">Матчі та сітка</h2>
            <div className="bg-[#23263a] rounded-lg p-4 min-h-[120px] text-muted-foreground">
              <span>Тут буде сітка турніру або список матчів</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentAdminPanel;