import { episodes } from "@/data/questions";
import EpisodeClient from "@/components/EpisodeClient";
import { shuffleArray } from "@/lib/shuffle";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EpisodePage({ params }: Props) {
  const { id } = await params;

  const episode = episodes.find((e) => e.id === Number(id));

  if (!episode) {
    notFound();
  }

  const shuffledEpisode = {
    ...episode,
    questions: episode.questions.map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    })),
  };

  return <EpisodeClient episode={shuffledEpisode} />;
}