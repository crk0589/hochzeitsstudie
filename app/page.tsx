import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-8 py-16">

        <p className="text-center text-sm uppercase tracking-[0.35em] text-blue-300">
          Deutsches Institut für Eheberatung
        </p>

        <p className="mt-2 text-center text-gray-400">
          Abteilung Hochzeitsforschung
        </p>

        <p className="mt-10 text-center text-sm uppercase tracking-[0.4em] text-red-500">
          präsentiert die Netflix-Dokumentation
        </p>

        <h1 className="mt-6 text-center text-5xl font-extrabold">
          🎬 Mareike & Moritz
        </h1>

        <h2 className="mt-6 text-center text-2xl font-semibold">
          Die repräsentative und wissenschaftlich fundierte
          Hochzeitsstudie 2026
        </h2>

        <p className="mt-10 text-center text-xl">
          🍿 Willkommen zur interaktiven Hochzeitsstudie!
        </p>

        <div className="mt-10 space-y-5 rounded-2xl bg-slate-900 p-8">

          <p>
            Während des Abends erwarten euch <strong>9 Folgen.</strong>
          </p>

          <p>Jede Folge besteht aus zwei Fragen:</p>

          <ul className="ml-6 list-disc space-y-2">
            <li>einer Wissensfrage über Mareike & Moritz</li>
            <li>einer unterhaltsamen Entscheidungsfrage</li>
          </ul>

          <p>
            Verteilt im Saal findet ihr die QR-Codes zu den einzelnen Folgen.
          </p>

        </div>

        <div className="mt-10 rounded-2xl border border-blue-500 p-8">

          <h3 className="mb-6 text-2xl font-bold">
            So funktioniert's
          </h3>

          <ol className="space-y-4">
            <li>▶ QR-Code scannen und Folge ansehen.</li>
            <li>Beide Fragen beantworten.</li>
            <li>Die nächste Folge entdecken.</li>
          </ol>

          <p className="mt-8 text-blue-200">
            Ihr müsst nicht alle Folgen beantworten –
            jede Teilnahme zählt.
          </p>

        </div>

        <div className="mt-10 rounded-2xl bg-slate-900 p-8">

          <h3 className="mb-5 text-2xl font-bold">
            🎬 Zu späterer Stunde
          </h3>

          <p>
            Das Deutsche Institut für Eheberatung präsentiert:
          </p>

          <p className="mt-5 text-xl font-semibold text-blue-300">
            „Die Wahrheit über Mareike & Moritz“
          </p>

          <p className="mt-6">
            Gemeinsam werfen wir einen Blick auf die Ergebnisse der
            repräsentativen und wissenschaftlich fundierten
            Hochzeitsstudie 2026.
          </p>

          <p className="mt-6">
            Mareike & Moritz lüften die Geheimnisse hinter den
            Wissensfragen und kommentieren die Einschätzungen
            der Gäste.
          </p>

          <p className="mt-6">
            Zum Abschluss folgt die Verlosung
            unter allen Hochzeitsgästen.
          </p>

        </div>

        <div className="mt-12 text-center">

          <Link
            href="/f/1"
            className="inline-block rounded-xl bg-blue-600 px-10 py-5 text-xl font-bold transition hover:bg-blue-700"
          >
            🎬 Studie starten
          </Link>

        </div>

        <p className="mt-10 text-center text-lg">
          Viel Spaß beim Mitmachen! ❤️
        </p>

      </div>
    </main>
  );
}