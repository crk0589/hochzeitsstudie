import { supabase } from "@/lib/supabase";

export async function getEpisodeResults(episode: number) {
  const { data, error } = await supabase
    .from("answers")
    .select("wissen, spass")
    .eq("episode", episode);

  if (error) {
    console.error("Supabase-Fehler:", error);
    return null;
  }

  console.log("Geladene Daten:", data);

  const wissen = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  };

  const spass = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  };

  data.forEach((row) => {
    if (row.wissen in wissen) {
      wissen[row.wissen as keyof typeof wissen]++;
    }

    if (row.spass in spass) {
      spass[row.spass as keyof typeof spass]++;
    }
  });

  return {
    total: data.length,
    wissen,
    spass,
  };
}