export default function SkeletonContent(){
	return (
			<div className="space-y-4">
				<div style={{animationDelay: "100ms"}} className="w-full h-4 rounded-sm bg-slate-700 animate-pulse" />
				<div style={{animationDelay: "200ms"}} className="w-full h-4 rounded-sm bg-slate-700 animate-pulse" />
				<div style={{animationDelay: "300ms"}} className="w-full h-4 rounded-sm bg-slate-700 animate-pulse" />
				<div style={{animationDelay: "400ms"}} className="w-full h-4 rounded-sm bg-slate-700 animate-pulse" />
				<div style={{animationDelay: "500ms"}} className="w-full h-4 rounded-sm bg-slate-700 animate-pulse" />
				<div style={{animationDelay: "600ms"}} className="w-64 h-4 rounded-sm bg-slate-700 animate-pulse" />
			</div>
	)
}