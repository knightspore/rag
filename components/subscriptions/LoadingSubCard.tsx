/** @format */

export default function LoadingSubCard() {
    return (
        <span className="flex items-center px-2 m-2 font-bold rounded-md gap-2 transition-all duration-150 animate-pulse card">
            <div className="flex-grow m-auto">
                <div className="w-4 h-4 m-auto overflow-hidden rounded-full bg-slate-700" />
            </div>
            <div className="w-24 h-4 my-1 rounded-full bg-slate-700/80" />
        </span>
    );
}
