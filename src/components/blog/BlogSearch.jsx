export function BlogSearch({ value, onChange }) {
    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-lg bg-purple-700/50 px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300">
                🔍
            </span>
        </div>
    )
}