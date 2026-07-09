"use client";

import { useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
        <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8">

          <h1 className="mb-8 text-center text-3xl font-bold">
            🏛 Deutsches Institut für Eheberatung
          </h1>

          <p className="mb-8 text-center text-gray-300">
            Interner Bereich
          </p>

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white"
          />

          <button
            onClick={() => {
              if (password === "hochzeit2026") {
                setLoggedIn(true);
              } else {
                alert("Falsches Passwort");
              }
            }}
            className="w-full rounded-xl bg-blue-600 p-4 text-lg font-bold hover:bg-blue-700"
          >
            Anmelden
          </button>

        </div>
      </main>
    );
  }

  return <AdminDashboard />;
}