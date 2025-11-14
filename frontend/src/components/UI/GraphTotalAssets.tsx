export default function GraphTotalAssets({ total }: { total: number }) {
  return (
    <div className="stats shadow bg-base-200 w-full max-w-sm mx-auto">
      <div className="stat">
        <div className="stat-figure text-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 1.343-3 3h3v3c1.657 0 3-1.343 3-3s-1.343-3-3-3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 1v3m0 16v3m11-11h-3M4 12H1m16.95 7.071l-2.121-2.121M6.172 6.172L4.05 4.05m12.9 0l-2.121 2.121M6.172 17.828l-2.121 2.121"
            />
          </svg>
        </div>

        <div className="stat-title">Portfolio Value</div>

        <div className="stat-value text-success">
          ${total.toLocaleString("en-US")}
        </div>

        <div className="stat-desc">Updated just now</div>
      </div>
    </div>
  );
}