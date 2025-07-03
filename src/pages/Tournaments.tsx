import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTournamentModal from "@/components/tournaments/CreateTournamentModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Trophy, Filter } from "lucide-react";
import TournamentCard from "@/components/tournaments/TournamentCard";

const tournamentData = [
  {
    id: "1",
    title: "Champions League 2023",
    game: "League of Legends",
    status: "Registration Open",
    prizePool: "$50,000",
    teams: 32,
    startDate: "Oct 15, 2023",
    bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "FPS Masters",
    game: "Counter-Strike 2",
    status: "Upcoming",
    prizePool: "$25,000",
    teams: 16,
    startDate: "Nov 5, 2023",
    bannerUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Battle Royale Cup",
    game: "Fortnite",
    status: "Registration Open",
    prizePool: "$30,000",
    teams: 50,
    startDate: "Oct 28, 2023",
    bannerUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502b22f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "MOBA Championship",
    game: "Dota 2",
    status: "Registration Open",
    prizePool: "$40,000",
    teams: 24,
    startDate: "Dec 1, 2023",
    bannerUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Racing Grand Prix",
    game: "iRacing",
    status: "Upcoming",
    prizePool: "$15,000",
    teams: 20,
    startDate: "Nov 20, 2023",
    bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Fighting Game Showdown",
    game: "Street Fighter 6",
    status: "Registration Open",
    prizePool: "$20,000",
    teams: 64,
    startDate: "Oct 30, 2023",
    bannerUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
  },
];

const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gameFilter, setGameFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const handleTournamentCreated = (tournamentId: string) => {
    setShowCreateModal(false);
    navigate(`/tournaments/${tournamentId}/admin`);
  };

  const games = Array.from(new Set(tournamentData.map(t => t.game)));
  const statuses = Array.from(new Set(tournamentData.map(t => t.status)));

  const filteredTournaments = tournamentData.filter(tournament => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = gameFilter === "all" || tournament.game === gameFilter;
    const matchesStatus = statusFilter === "all" || tournament.status === statusFilter;
    return matchesSearch && matchesGame && matchesStatus;
  });

  return (
    <div className="page-transition-wrapper min-h-screen">
      <div className="bg-esports-gray py-20 pt-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center">
                <Trophy className="h-7 w-7 mr-3 text-esports-purple" />
                Tournaments
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Browse through all available tournaments. Filter by game or status to find the perfect competition for your team.
              </p>
            </div>
            <Button
              className="mt-4 md:mt-0 bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity"
              onClick={() => setShowCreateModal(true)}
            >
              Create Tournament
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-card/30 backdrop-blur-md border border-border rounded-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tournaments..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={gameFilter} onValueChange={setGameFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Game" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Games</SelectItem>
                    {games.map(game => (
                      <SelectItem key={game} value={game}>{game}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(gameFilter !== "all" || statusFilter !== "all") && (
              <div className="flex items-center mt-4 gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {gameFilter !== "all" && (
                  <Badge 
                    className="bg-esports-purple/80 hover:bg-esports-purple text-white" 
                    onClick={() => setGameFilter("all")}
                  >
                    {gameFilter} ×
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge 
                    className="bg-esports-blue/80 hover:bg-esports-blue text-white" 
                    onClick={() => setStatusFilter("all")}
                  >
                    {statusFilter} ×
                  </Badge>
                )}
                {(gameFilter !== "all" || statusFilter !== "all") && (
                  <Button 
                    variant="link" 
                    className="text-xs h-auto p-0" 
                    onClick={() => {
                      setGameFilter("all");
                      setStatusFilter("all");
                    }}
                  >
                    Clear all
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTournaments.length} {filteredTournaments.length === 1 ? 'tournament' : 'tournaments'}
            </p>
          </div>

          {filteredTournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold mb-2">No tournaments found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
      {showCreateModal && (
        <CreateTournamentModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handleTournamentCreated}
        />
      )}
    </div>
  );
};

export default Tournaments;
