export default function SkeletonHeader(){
	return (
			<div className="space-y-4">
				<div style={{animationDelay: "100ms"}} className="w-full h-8 rounded-sm bg-slate-700 animate-pulse" />
				<div style={{animationDelay: "200ms"}} className="w-full h-8 rounded-sm bg-slate-700 animate-pulse" />
				<div style={{animationDelay: "300ms"}} className="w-full h-8 rounded-sm bg-slate-700 animate-pulse" />
				<br />
				<div style={{animationDelay: "600ms"}} className="w-64 h-4 rounded-sm bg-slate-700 animate-pulse" />
			</div>
	)
}