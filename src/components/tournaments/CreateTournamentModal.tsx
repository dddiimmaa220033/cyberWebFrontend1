import React, { useState } from "react";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const templates = [
	{
		id: "1",
		name: "5v5 - Bomb Defusal",
		desc: "Європа • 5v5 • 32 места • Вибування после одного пораження...",
		img: "https://i.imgur.com/7QpQK5F.png",
	},
	{
		id: "2",
		name: "2v2 - Wingman",
		desc: "Європа • 2v2 • 32 места • Вибування после одного пораження...",
		img: "https://i.imgur.com/8QpQK5F.png",
	},
	{
		id: "3",
		name: "1vs1 - Aim Maps",
		desc: "Європа • 1v1 • 32 места • Вибування после одного пораження...",
		img: "https://i.imgur.com/9QpQK5F.png",
	},
];

const steps = ["Шаблон", "General", "Teams", "Date"];

const CreateTournamentModal = ({
	onClose,
	onCreated,
}: {
	onClose: () => void;
	onCreated: (id: string) => void;
}) => {
	const [step, setStep] = useState(0);
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
	const [tournamentName, setTournamentName] = useState("");
	const [playersPerTeam, setPlayersPerTeam] = useState("5v5");
	const [date, setDate] = useState("2025-07-03T20:00");
	const [gmt, setGmt] = useState("GMT+3");

	// Мок користувача
	const username = "cdiimmaa220033";

	// Мок створення турніру
	const handleCreate = () => {
		setTimeout(() => {
			onCreated("new-tournament-id");
		}, 500);
	};

	// Вибір шаблону
	const selectedTemplateObj = templates.find((t) => t.id === selectedTemplate);

	return (
		<div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
			<div className="relative bg-[#23263a] rounded-2xl shadow-xl w-full max-w-xl mx-auto p-0 overflow-hidden">
				{/* Верхній блок з картинкою та stepper */}
				<div className="relative bg-gradient-to-r from-[#23263a] to-[#f9a825] p-6 pb-0">
					<button className="absolute top-4 right-4" onClick={onClose}>
						<X className="w-6 h-6 text-white" />
					</button>
					<img
						src="https://i.imgur.com/1QpQK5F.png"
						alt="header"
						className="absolute left-0 top-0 w-full h-32 object-cover rounded-t-2xl opacity-40 pointer-events-none"
						style={{ zIndex: 0 }}
					/>
					<div className="relative z-10 flex flex-col items-center">
						<h2 className="text-2xl font-bold mb-2 text-white mt-6">
							Create tournament
						</h2>
						<div className="flex justify-between w-full max-w-xs mb-2">
							{steps.map((s, i) => (
								<div key={s} className="flex-1 flex flex-col items-center">
									<div
										className={`w-6 h-6 rounded-full flex items-center justify-center ${
											i <= step ? "bg-cyan-400" : "bg-gray-600"
										}`}
									></div>
									<span
										className={`text-xs mt-1 ${
											i === step ? "font-bold text-white" : "text-gray-300"
										}`}
									>
										{s}
									</span>
								</div>
							))}
						</div>
						<div className="w-full h-1 bg-gray-700 rounded-full mb-2">
							<div
								className="h-1 bg-cyan-400 rounded-full transition-all"
								style={{ width: `${((step + 1) / steps.length) * 100}%` }}
							></div>
						</div>
					</div>
				</div>

				{/* Контент кроків */}
				<div className="p-6 pt-2">
					{/* Step 0: Вибір шаблону */}
					{step === 0 && (
						<>
							<div className="mb-2 font-bold text-white">По шаблону</div>
							<div className="text-sm text-gray-400 mb-4">
								Виберіть шаблон із нашої підбірки або створіть свій турнір з нуля. Що б
								ви не вибрали, ви зможете змінити налаштування турніру пізніше.
							</div>
							<div className="flex flex-col gap-3 mb-4">
								{templates.map((t) => (
									<label
										key={t.id}
										className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer border ${
											selectedTemplate === t.id
												? "border-cyan-400 bg-cyan-900/30"
												: "border-gray-700 hover:bg-gray-700/40"
										}`}
									>
										<input
											type="radio"
											name="template"
											checked={selectedTemplate === t.id}
											onChange={() => setSelectedTemplate(t.id)}
											className="accent-cyan-400"
										/>
										<img
											src={t.img}
											alt={t.name}
											className="w-16 h-10 rounded object-cover"
										/>
										<div>
											<div className="font-semibold text-white">{t.name}</div>
											<div className="text-xs text-gray-400">{t.desc}</div>
										</div>
									</label>
								))}
								<label
									className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer border ${
										selectedTemplate === "custom"
											? "border-cyan-400 bg-cyan-900/30"
											: "border-gray-700 hover:bg-gray-700/40"
									}`}
								>
									<input
										type="radio"
										name="template"
										checked={selectedTemplate === "custom"}
										onChange={() => setSelectedTemplate("custom")}
										className="accent-cyan-400"
									/>
									<div className="font-semibold text-white">
										Створити турнір без шаблона
									</div>
								</label>
							</div>
							<Button
								className="w-full mt-2"
								disabled={!selectedTemplate}
								onClick={() => setStep(step + 1)}
							>
								Next
							</Button>
						</>
					)}

					{/* Step 1: General */}
					{step === 1 && (
						<>
							<div className="mb-2 font-bold text-white">Selected template</div>
							{selectedTemplateObj && (
								<div className="flex items-center gap-3 p-2 rounded-lg mb-4 bg-[#181a23]">
									<img
										src={selectedTemplateObj.img}
										alt={selectedTemplateObj.name}
										className="w-16 h-10 rounded object-cover"
									/>
									<div>
										<div className="font-semibold text-white">
											{selectedTemplateObj.name}
										</div>
										<div className="text-xs text-gray-400">
											{selectedTemplateObj.desc}
										</div>
									</div>
								</div>
							)}
							<div className="mb-2 font-bold text-white">Name</div>
							<input
								className="w-full p-2 rounded bg-[#181a23] text-white mb-4 border border-gray-700 focus:outline-none focus:border-cyan-400"
								value={tournamentName}
								onChange={(e) => setTournamentName(e.target.value)}
								placeholder="Tournament name"
							/>
							<div className="mb-2 font-bold text-white">Hosted by</div>
							<div className="flex items-center gap-3 p-2 rounded-lg bg-[#181a23] mb-2">
								<User className="w-6 h-6 text-gray-400" />
								<span className="text-white">{username}</span>
								<Button className="ml-auto" size="sm">
									Create Space
								</Button>
							</div>
							<div className="text-xs text-gray-400 bg-[#23263a] rounded-lg p-2 mb-2">
								You are currently creating this tournament to be user-hosted. To
								get the most out of your tournament, make sure to host it in a
								Space.
							</div>
							<div className="flex justify-between mt-4">
								<Button variant="outline" onClick={() => setStep(step - 1)}>
									Back
								</Button>
								<Button
									onClick={() => setStep(step + 1)}
									disabled={!tournamentName}
									className="bg-cyan-500 text-white"
								>
									Next
								</Button>
							</div>
						</>
					)}

					{/* Step 2: Teams */}
					{step === 2 && (
						<>
							<div className="mb-2 font-bold text-white">Selected template</div>
							{selectedTemplateObj && (
								<div className="flex items-center gap-3 p-2 rounded-lg mb-4 bg-[#181a23]">
									<img
										src={selectedTemplateObj.img}
										alt={selectedTemplateObj.name}
										className="w-16 h-10 rounded object-cover"
									/>
									<div>
										<div className="font-semibold text-white">
											{selectedTemplateObj.name}
										</div>
										<div className="text-xs text-gray-400">
											{selectedTemplateObj.desc}
										</div>
									</div>
								</div>
							)}
							<div className="mb-2 font-bold text-white">Players per team</div>
							<div className="text-sm text-gray-400 mb-2">
								Choose how many players can be in each team.
							</div>
							<div className="flex flex-col gap-2 mb-4">
								{["1v1", "2v2", "3v3", "4v4", "5v5"].map((opt) => (
									<label
										key={opt}
										className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer border ${
											playersPerTeam === opt
												? "border-cyan-400 bg-cyan-900/30"
												: "border-gray-700 hover:bg-gray-700/40"
										}`}
									>
										<input
											type="radio"
											name="playersPerTeam"
											checked={playersPerTeam === opt}
											onChange={() => setPlayersPerTeam(opt)}
											className="accent-cyan-400"
										/>
										<span className="text-white">{opt}</span>
									</label>
								))}
							</div>
							<div className="flex justify-between mt-4">
								<Button variant="outline" onClick={() => setStep(step - 1)}>
									Back
								</Button>
								<Button
									onClick={() => setStep(step + 1)}
									className="bg-cyan-500 text-white"
								>
									Next
								</Button>
							</div>
						</>
					)}

					{/* Step 3: Date */}
					{step === 3 && (
						<>
							<div className="mb-2 font-bold text-white">Selected template</div>
							{selectedTemplateObj && (
								<div className="flex items-center gap-3 p-2 rounded-lg mb-4 bg-[#181a23]">
									<img
										src={selectedTemplateObj.img}
										alt={selectedTemplateObj.name}
										className="w-16 h-10 rounded object-cover"
									/>
									<div>
										<div className="font-semibold text-white">
											{selectedTemplateObj.name}
										</div>
										<div className="text-xs text-gray-400">
											{selectedTemplateObj.desc}
										</div>
									</div>
								</div>
							)}
							<div className="mb-2 font-bold text-white">Date and time</div>
							<div className="text-sm text-gray-400 mb-2">
								Pick a date and time for your tournament.
							</div>
							<div className="flex gap-2 mb-4">
								<select
									className="bg-[#181a23] text-white rounded p-2 border border-gray-700"
									value={gmt}
									onChange={(e) => setGmt(e.target.value)}
								>
									<option>GMT+3</option>
									<option>GMT+2</option>
									<option>GMT+1</option>
									<option>GMT+0</option>
								</select>
								<input
									type="datetime-local"
									className="bg-[#181a23] text-white rounded p-2 border border-gray-700"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>
							<div className="flex justify-between mt-4">
								<Button variant="outline" onClick={() => setStep(step - 1)}>
									Back
								</Button>
								<Button
									onClick={handleCreate}
									className="bg-cyan-500 text-white"
								>
									Create
								</Button>
							</div>
						</>
					)}

					{/* Advanced options */}
					<div className="mt-4">
						<a
							href="#"
							className="text-xs text-cyan-400 underline"
						>
							Advanced options
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateTournamentModal;