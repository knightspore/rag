export enum Level {
	info = "info",
	warn = "warn",
	error = "error"
}

export default function Alert({ text, level}:{text: string, level: Level }) {

	const styles = {
		"info": "bg-slate-800/50 border-slate-900/50",
		"warn": "bg-yellow-800/50 border-yellow-900/50",
		"error": "bg-red-800/50 border-red-900/50",
	}

	return (
		<div className={`p-1 m-auto border-2 rounded-sm ${ styles[level] }`}>{text}</div>
	)
}
