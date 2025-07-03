import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search, Users, Filter } from "lucide-react";
import TeamCard from "@/components/teams/TeamCard";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const teamsData = [
	{
		id: "1",
		name: "Phoenix Esports",
		game: "League of Legends",
		wins: 28,
		losses: 12,
		rank: 1,
		members: [
			{ id: "1", name: "Alex Johnson", role: "Captain" },
			{ id: "2", name: "Sarah Lee", role: "Support" },
			{ id: "3", name: "Michael Wong", role: "Mid Laner" },
			{ id: "4", name: "Emily Davis", role: "Top Laner" },
			{ id: "5", name: "David Kim", role: "Jungler" },
		],
	},
	{
		id: "2",
		name: "Shadow Tactics",
		game: "Counter-Strike 2",
		wins: 22,
		losses: 15,
		rank: 3,
		members: [
			{ id: "6", name: "James Wilson", role: "Captain" },
			{ id: "7", name: "Elena Rodriguez", role: "AWPer" },
			{ id: "8", name: "Ryan Taylor", role: "Rifler" },
			{ id: "9", name: "Sophia Chen", role: "Support" },
			{ id: "10", name: "Marcus Brown", role: "Entry Fragger" },
		],
	},
	{
		id: "3",
		name: "Battle Royale Kings",
		game: "Fortnite",
		wins: 35,
		losses: 18,
		rank: 2,
		members: [
			{ id: "11", name: "Tyler Smith", role: "Captain" },
			{ id: "12", name: "Olivia Parker", role: "Builder" },
			{ id: "13", name: "Lucas Martinez", role: "Fragger" },
			{ id: "14", name: "Emma White", role: "Support" },
		],
	},
	{
		id: "4",
		name: "MOBA Masters",
		game: "Dota 2",
		wins: 19,
		losses: 14,
		rank: 5,
		members: [
			{ id: "15", name: "Daniel Lee", role: "Captain" },
			{ id: "16", name: "Amanda Garcia", role: "Support" },
			{ id: "17", name: "Nathan Chen", role: "Carry" },
			{ id: "18", name: "Jasmine Kim", role: "Offlaner" },
			{ id: "19", name: "Christopher Lin", role: "Mid Laner" },
		],
	},
	{
		id: "5",
		name: "Velocity Racing",
		game: "iRacing",
		wins: 12,
		losses: 8,
		rank: 7,
		members: [
			{ id: "20", name: "Thomas Wright", role: "Captain" },
			{ id: "21", name: "Jessica Miller", role: "Driver" },
			{ id: "22", name: "Robert Johnson", role: "Engineer" },
			{ id: "23", name: "Catherine Wilson", role: "Tactician" },
		],
	},
	{
		id: "6",
		name: "Combo Crushers",
		game: "Street Fighter 6",
		wins: 31,
		losses: 9,
		rank: 4,
		members: [
			{ id: "24", name: "Kevin Thompson", role: "Captain" },
			{ id: "25", name: "Lisa Brown", role: "Competitive Player" },
			{ id: "26", name: "Andrew Davis", role: "Competitive Player" },
			{ id: "27", name: "Michelle Lee", role: "Analyst" },
		],
	},
];

const Teams = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [gameFilter, setGameFilter] = useState("all");
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [teamName, setTeamName] = useState("");
	const navigate = useNavigate();

	const games = Array.from(new Set(teamsData.map((t) => t.game)));

	const filteredTeams = teamsData.filter((team) => {
		const matchesSearch = team.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesGame = gameFilter === "all" || team.game === gameFilter;
		return matchesSearch && matchesGame;
	});

	const handleCreate = (e: React.FormEvent) => {
		e.preventDefault();
		// Тут має бути запит до бекенду для створення команди, який повертає teamId
		const newTeamId = Math.random().toString(36).substring(2, 9); // тимчасово
		setShowCreateForm(false);
		setTeamName("");
		navigate(`/teams/${newTeamId}`);
	};

	return (
		<div className="page-transition-wrapper min-h-screen">
			<div className="bg-esports-gray py-20 pt-40">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center">
								<Users className="h-7 w-7 mr-3 text-esports-blue" />
								Teams
							</h1>
							<p className="text-muted-foreground max-w-2xl">
								Browse through all registered teams. Find potential teammates or
								competitors for your next tournament.
							</p>
						</div>
						<Button
							className="mt-4 md:mt-0 bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity"
							onClick={() => setShowCreateForm(true)}
						>
							Create Team
						</Button>
					</div>

					{/* Filters */}
					<div className="bg-card/30 backdrop-blur-md border border-border rounded-lg p-4 mb-8">
						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-grow relative">
								<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search teams..."
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
										{games.map((game) => (
											<SelectItem key={game} value={game}>
												{game}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select defaultValue="rank">
									<SelectTrigger className="w-full sm:w-[180px]">
										<div className="flex items-center">
											<Filter className="mr-2 h-4 w-4" />
											<SelectValue placeholder="Sort By" />
										</div>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="rank">Rank</SelectItem>
										<SelectItem value="wins">Most Wins</SelectItem>
										<SelectItem value="winrate">Win Rate</SelectItem>
										<SelectItem value="name">Team Name</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{gameFilter !== "all" && (
							<div className="flex items-center mt-4 gap-2">
								<span className="text-sm text-muted-foreground">
									Active filters:
								</span>
								<Badge
									className="bg-esports-purple/80 hover:bg-esports-purple text-white"
									onClick={() => setGameFilter("all")}
								>
									{gameFilter} ×
								</Badge>
								<Button
									variant="link"
									className="text-xs h-auto p-0"
									onClick={() => setGameFilter("all")}
								>
									Clear all
								</Button>
							</div>
						)}
					</div>

					{/* Results */}
					<div className="mb-6">
						<p className="text-sm text-muted-foreground">
							Showing {filteredTeams.length}{" "}
							{filteredTeams.length === 1 ? "team" : "teams"}
						</p>
					</div>

					{filteredTeams.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredTeams.map((team) => (
								<TeamCard key={team.id} team={team} />
							))}
						</div>
					) : (
						<div className="text-center py-20">
							<h3 className="text-xl font-bold mb-2">No teams found</h3>
							<p className="text-muted-foreground">
								Try adjusting your filters or search query.
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Діалогове вікно для створення команди */}
			{showCreateForm && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
					<form
						onSubmit={handleCreate}
						className="bg-[#23263a] p-8 rounded-lg flex flex-col gap-4 min-w-[320px]"
					>
						<label className="text-white font-semibold">Team name</label>
						<input
							className="p-2 rounded bg-[#181c2f] text-white"
							value={teamName}
							onChange={(e) => setTeamName(e.target.value)}
							required
							placeholder="Enter team name"
						/>
						<div className="flex gap-2 justify-end">
							<button
								type="button"
								onClick={() => setShowCreateForm(false)}
								className="px-4 py-2 rounded bg-gray-500 text-white"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 rounded bg-[#13b7e6] text-white font-bold"
							>
								Create
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Teams;
