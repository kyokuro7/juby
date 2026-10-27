// Semua panggilan ke API lewat sini (jalan di server, bukan di browser).
// Nanti kalau API sudah pakai API key, cukup isi env API_KEY di Vercel.
const BASE = process.env.API_BASE || "https://api.rexxgraph.my.id";

export async function api(path, revalidate = 300) {
  const headers = {};
  if (process.env.API_KEY) headers["x-api-key"] = process.env.API_KEY;

  const res = await fetch(BASE + path, { headers, next: { revalidate } });
  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error(`Respons API tidak valid (status ${res.status})`);
  }
  if (!json.ok) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}

// Versi aman: tidak melempar error, mengembalikan { data } atau { error }
export async function safe(path) {
  try {
    return { data: await api(path) };
  } catch (e) {
    return { error: e.message };
  }
}

export const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export function hariIni() {
  return new Date().toLocaleDateString("id-ID", { weekday: "long", timeZone: "Asia/Jakarta" });
}

export const slugify = (g) =>
  g.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const GENRES = [
  ["action", "Action"], ["adult-cast", "Adult Cast"], ["adventure", "Adventure"],
  ["anthropomorphic", "Anthropomorphic"], ["avant-garde", "Avant Garde"],
  ["award-winning", "Award Winning"], ["boys-love", "Boys Love"], ["cgdct", "CGDCT"],
  ["comedy", "Comedy"], ["crossdressing", "Crossdressing"], ["detective", "Detective"],
  ["drama", "Drama"], ["ecchi", "Ecchi"], ["fantasy", "Fantasy"], ["gag-humor", "Gag Humor"],
  ["girls-love", "Girls Love"], ["gore", "Gore"], ["gourmet", "Gourmet"], ["harem", "Harem"],
  ["historical", "Historical"], ["horror", "Horror"], ["isekai", "Isekai"],
  ["iyashikei", "Iyashikei"], ["love-polygon", "Love Polygon"],
  ["mahou-shoujo", "Mahou Shoujo"], ["martial-arts", "Martial Arts"], ["mecha", "Mecha"],
  ["military", "Military"], ["music", "Music"], ["mystery", "Mystery"],
  ["mythology", "Mythology"], ["organized-crime", "Organized Crime"],
  ["otaku-culture", "Otaku Culture"], ["parody", "Parody"],
  ["performing-arts", "Performing Arts"], ["psychological", "Psychological"],
  ["reincarnation", "Reincarnation"], ["romance", "Romance"], ["samurai", "Samurai"],
  ["school", "School"], ["sci-fi", "Sci-Fi"], ["seinen", "Seinen"], ["shoujo", "Shoujo"],
  ["shounen", "Shounen"], ["slice-of-life", "Slice of Life"], ["sports", "Sports"],
  ["super-power", "Super Power"], ["supernatural", "Supernatural"],
  ["survival", "Survival"], ["suspense", "Suspense"], ["thriller", "Thriller"],
  ["time-travel", "Time Travel"], ["urban-fantasy", "Urban Fantasy"],
  ["video-game", "Video Game"], ["villainess", "Villainess"], ["workplace", "Workplace"],
];

export const genreLabel = (slug) => (GENRES.find(([s]) => s === slug) || [])[1] || slug;
