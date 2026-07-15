"use client";

import { useEffect, useState } from "react";
import { episodes } from "@/data/questions";
import { getEpisodeResults } from "@/lib/results";
import ResultsChart from "@/components/ResultsChart";
import PresentationEnd from "@/components/PresentationEnd";

export default function AdminDashboard() {
const [episodeIndex, setEpisodeIndex] = useState(0);
const [stats, setStats] = useState<any>(null);

const [showPreview, setShowPreview] = useState(true);

const [reveal, setReveal] = useState(false);

const [finished, setFinished] = useState(false);

  const episode = episodes[episodeIndex];
console.log("showPreview:", showPreview);
  useEffect(() => {
    if (finished) return;

    async function load() {
  const result = await getEpisodeResults(episode.id);

  setStats(result);

  setReveal(false);

  setShowPreview(true);
}

    load();
  }, [episode.id, finished]);

  if (finished) {
    return <PresentationEnd />;
  }

  if (!stats) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Lade Auswertung...
      </main>
    );
  }

  const wissenResults = episode.questions[0].answers.map((answer) => ({
    label: answer.text,
    votes: stats.wissen[answer.id] ?? 0,
    isCorrect: answer.correct === true,
  }));

  const spassResults = episode.questions[1].answers.map((answer) => ({
    label: answer.text,
    votes: stats.spass[answer.id] ?? 0,
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">

        <p className="text-center text-sm uppercase tracking-[0.35em] text-blue-300">
          Deutsches Institut für Eheberatung
        </p>

        <p className="mt-2 text-center text-gray-400">
          in Kooperation mit Netflix
        </p>

        <h1 className="mt-8 text-center text-5xl font-extrabold">
          🎬 Die Wahrheit über Mareike & Moritz
        </h1>

        <p className="mt-4 text-center text-xl text-gray-300">
          Live-Auswertung der Hochzeitsstudie 2026
        </p>

        <div className="mx-auto mt-10 max-w-sm rounded-2xl bg-slate-900 p-8 text-center">
          <p className="text-lg text-gray-300">
            Teilnehmer
          </p>

          <p className="mt-3 text-6xl font-bold text-blue-400">
            {stats.total}
          </p>
        </div>

        <div className="mt-12 rounded-3xl bg-slate-900 p-10">
          {showPreview ? (

        <div className="flex flex-col items-center justify-center">

          <img
            src={`/episodes/folge${episode.id}.png`}
            alt={`Folge ${episode.id}`}
            className="mx-auto max-h-[82vh] w-auto rounded-3xl shadow-2xl"
          />

    <button
      onClick={() => setShowPreview(false)}
      className="mt-10 rounded-xl bg-red-600 px-12 py-5 text-2xl font-bold hover:bg-red-700 transition"
    >
      ▶ Zur Auswertung
    </button>

  </div>

) : (
<>
          <div className="mb-12 text-center">

            <p className="text-sm font-bold uppercase tracking-[0.45em] text-red-400">
              FOLGE {episode.id}
            </p>

            <h2 className="mt-4 text-5xl font-extrabold">
              {episode.title}
            </h2>

            <p className="mt-4 text-xl italic text-gray-400">
              {episode.subtitle}
            </p>

          </div>

          <div className="grid gap-10 lg:grid-cols-2">

            <ResultsChart
              title={episode.questions[0].text}
              results={wissenResults}
              reveal={reveal}
              mode="wissen"
            />

            <ResultsChart
              title={episode.questions[1].text}
              results={spassResults}
              reveal={reveal}
              mode="spass"
            />

          </div>

          <div className="mt-14 flex justify-between">

            <button
              disabled={episodeIndex === 0}
              onClick={() => {
              setEpisodeIndex((i) => i - 1);
              setReveal(false);
              setShowPreview(true);
              }}
              className="rounded-xl bg-slate-700 px-6 py-4 disabled:opacity-40"
             >
              ◀ Vorherige Folge
            </button>

            {!reveal ? (
              <button
              onClick={() => setReveal(true)}
              className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold hover:bg-green-700"
              >
              🎬 Ergebnisse anzeigen
              </button>
            ) : (
              <button
onClick={() => {
  if (episodeIndex === episodes.length - 1) {
    setFinished(true);
  } else {
    setEpisodeIndex((i) => i + 1);
    setReveal(false);
    setShowPreview(true);
  }
}}
                className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700"
              >
                {episodeIndex === episodes.length - 1
                  ? "Zum Abschluss"
                  : `Weiter zu Folge ${episode.id + 1}`}
              </button>
            )}

          </div>
          </>

          )}

        </div>

      </div>

    </main>

  );
}