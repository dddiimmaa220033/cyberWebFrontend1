
import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlurCard from "@/components/ui/blur-card";

interface Tournament {
  id: string;
  title: string;
  game: string;
  status: string;
  prizePool: string;
  teams: number;
  startDate: string;
  bannerUrl: string;
}

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  return (
    <BlurCard className="overflow-hidden flex flex-col h-full transition-transform hover:translate-y-[-5px] hover:shadow-xl group">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src={tournament.bannerUrl}
          alt={tournament.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          loading="lazy"
        />
        <Badge 
          className="absolute top-4 left-4 z-20 bg-esports-purple/90 hover:bg-esports-purple text-white border-none"
        >
          {tournament.game}
        </Badge>
        <Badge 
          className={`absolute top-4 right-4 z-20 ${
            tournament.status === "Registration Open" 
              ? "bg-green-500/90 hover:bg-green-500" 
              : "bg-esports-blue/90 hover:bg-esports-blue"
          } text-white border-none`}
        >
          {tournament.status}
        </Badge>
      </div>
      
      <div className="flex-1 p-6">
        <Link to={`/tournaments/${tournament.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
            {tournament.title}
          </h3>
        </Link>
        
        <div className="flex flex-col space-y-3 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Trophy className="h-4 w-4 mr-2 text-esports-purple" />
            <span>Prize Pool: <span className="text-foreground font-medium">{tournament.prizePool}</span></span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-esports-blue" />
            <span>Teams: <span className="text-foreground font-medium">{tournament.teams}</span></span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 mr-2 text-esports-cyan" />
            <span>Starts: <span className="text-foreground font-medium">{tournament.startDate}</span></span>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 mt-auto">
        <Button className="w-full bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity">
          View Details
        </Button>
      </div>
    </BlurCard>
  );
};

export default TournamentCard;
