"use client";

import { useState } from "react";

type Props = {
  questionId: string;
  answers: {
    id: string;
    text: string;
  }[];
  onSelect: (questionId: string, answerId: string) => void;
};

export default function AnswerGroup({
  questionId,
  answers,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState("");

  return (
    <div className="space-y-3">
      {answers.map((answer) => (
        <button
          key={answer.id}
          type="button"
          onClick={() => {
            setSelected(answer.id);
            onSelect(questionId, answer.id);
          }}
          className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
            selected === answer.id
              ? "border-blue-600 bg-blue-200"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {answer.text}
        </button>
      ))}
    </div>
  );
}