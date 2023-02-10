export enum Level {
	info = "info",
	warn = "warn",
	error = "error"
}

export default function Alert({ text, level}:{text: string, level: Level }) {
	return (
		<div className={`absolute top-2 right-2 card p-px px-1 text-sm w-max ${ level }`}>{text}</div>
	)
}
