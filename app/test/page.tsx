"use client";

import { supabase } from "@/lib/supabase";

export default function TestPage() {
  async function testInsert() {
    const { error } = await supabase.from("answers").insert({
      episode: 1,
      question_id: "test",
      answer_id: "a",
      device_id: crypto.randomUUID(),
    });

    if (error) {
      alert("Fehler: " + error.message);
    } else {
      alert("Erfolgreich gespeichert!");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        onClick={testInsert}
        className="rounded-xl bg-blue-600 px-8 py-4 text-white"
      >
        Verbindung zu Supabase testen
      </button>
    </main>
  );
}