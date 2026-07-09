"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AnswerGroup from "@/components/AnswerGroup";
import { supabase } from "@/lib/supabase";

type Props = {
  episode: {
    id: number;
    title: string;
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
    <main className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-4xl font-bold">
          🎬 Folge {episode.id}
        </h1>

        <h2 className="mb-10 text-2xl">
          {episode.title}
        </h2>

        {episode.questions.map((question, index) => (
          <div
            key={question.id}
            className="mb-10 rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
              {index === 0 ? "Wissensfrage" : "Entscheidungsfrage"}
            </p>

            <h3 className="mb-6 text-2xl font-semibold">
              {question.text}
            </h3>

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
            className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Antworten absenden
          </button>
        </div>
      </div>
    </main>
  );
}