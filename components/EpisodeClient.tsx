"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AnswerGroup from "@/components/AnswerGroup";
import { supabase } from "@/lib/supabase";

type Props = {
  episode: {
    id: number;
    title: string;
    subtitle: string;
    questions: {
      id: string;
      text: string;
      answers: {
        id: string;
        text: string;
      }[];
    }[];
  };
};

export default function EpisodeClient({ episode }: Props) {
  const router = useRouter();

  const [answers, setAnswers] = useState<Record<string, string>>({});

  function handleSelect(questionId: string, answerId: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  }

  async function submit() {
    if (Object.keys(answers).length < 2) {
      alert("Bitte beantworte beide Fragen.");
      return;
    }

    const deviceId =
      localStorage.getItem("device_id") ?? crypto.randomUUID();

    localStorage.setItem("device_id", deviceId);

    const { error } = await supabase.from("answers").insert({
      device_id: deviceId,
      episode: episode.id,
      wissen: answers[episode.questions[0].id],
      spass: answers[episode.questions[1].id],
    });

    if (error) {
      if (error.code === "23505") {
        alert("🎬 Diese Folge hast du bereits beantwortet.");
      } else {
        console.error(error);
        alert("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
      }
      return;
    }

    router.push("/danke");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Episodenkopf */}

        <div className="mb-12 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.45em] text-red-600">
            FOLGE {episode.id}
          </p>

          <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
            {episode.title}
          </h1>

          <p className="mt-4 text-xl italic text-gray-500">
            {episode.subtitle}
          </p>

        </div>

        {episode.questions.map((question, index) => (
          <div
            key={question.id}
            className="mb-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-md"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-600">
              {index === 0 ? "Wissensfrage" : "Entscheidungsfrage"}
            </p>

            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              {question.text}
            </h2>

            <AnswerGroup
              questionId={question.id}
              answers={question.answers}
              onSelect={handleSelect}
            />
          </div>
        ))}

        <div className="mt-12 flex justify-center">
          <button
            onClick={submit}
            className="rounded-xl bg-red-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-red-700"
          >
            Antworten absenden
          </button>
        </div>

      </div>
    </main>
  );
}