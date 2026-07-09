type Result = {
  label: string;
  votes: number;
  isCorrect?: boolean;
  isWinner?: boolean;
};

type Props = {
  title: string;
  results: Result[];
  reveal: boolean;
  mode: "wissen" | "spass";
};

export default function ResultsChart({
  title,
  results,
  reveal,
  mode,
}: Props) {
  const total = results.reduce((sum, r) => sum + r.votes, 0);

  const maxVotes = Math.max(...results.map((r) => r.votes), 0);

  return (
    <div className="rounded-xl bg-slate-800 p-8">

      <h3 className="mb-8 text-2xl font-bold">
        {title}
      </h3>

      <div className="space-y-6">

        {results.map((result) => {
          const percent =
            total === 0 ? 0 : Math.round((result.votes / total) * 100);

          const highlight =
            reveal &&
            (
              (mode === "wissen" && result.isCorrect) ||
              (mode === "spass" && result.votes === maxVotes)
            );

          return (
            <div key={result.label}>

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span
                    className={
                      highlight
                        ? "font-bold text-green-400"
                        : ""
                    }
                  >
                    {result.label}
                  </span>

                  {highlight && mode === "wissen" && (
                    <span>✅</span>
                  )}

                  {highlight && mode === "spass" && (
                    <span>⭐</span>
                  )}

                </div>

                <span>
                  {result.votes} Stimme
                  {result.votes === 1 ? "" : "n"} ({percent}%)
                </span>

              </div>

              <div className="h-5 rounded-full bg-slate-700">

                <div
                  className={
                    highlight
                      ? "h-5 rounded-full bg-green-500"
                      : "h-5 rounded-full bg-blue-500"
                  }
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}