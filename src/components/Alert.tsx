
export enum Level {
	info = "info",
	warn = "warn",
	error = "error"
}

export default function Alert({ text, level }:{text: string, level: Level}) {

	const map = {
		"info": "bg-slate-800/50",
		"warn": "bg-yellow-800/50",
		"error": "bg-red-800/50",
	}

	return (
		<div className={`mb-4 p-2 m-auto border-2 rounded-md border-slate-800 ${ map[level] }`}>{text}</div>
	)
}