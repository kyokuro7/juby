import Link from "next/link";
import { safe, hariIni } from "../lib/api";
import { AnimeCard, Grid, ErrorBox, Empty, SearchForm, GenreChips } from "../components/ui";

export const revalidate = 300;

export default async function Home() {
  const hari = hariIni();
  const [ongoing, jadwal] = await Promise.all([
    // max_ep=13 menyaring anime panjang (One Piece, Conan, dll) supaya yang tampil anime musim ini
    safe("/ongoing?max_ep=13"),
    safe(/schedule?day=${hari.toLowerCase()}),
  ]);
  const hariItems = jadwal.data ? Object.values(jadwal.data).flat() : [];

  return (
    <>
      <section className="hero">
        <h1>Nonton apa hari ini?</h1>
        <p>Cari anime favoritmu atau lihat yang sedang tayang musim ini.</p>
        <SearchForm />
      </section>

      <GenreChips />

      <div className="sec-title">
        <h2>Tayang hari ini · {hari}</h2>
        <Link href="/jadwal" className="more">Semua jadwal →</Link>
      </div>
      {jadwal.error ? (
        <ErrorBox message={jadwal.error} />
      ) : hariItems.length === 0 ? (
        <Empty>Belum ada jadwal untuk hari ini.</Empty>
      ) : (
        <Grid>
          {hariItems.map((a, i) => (
            <AnimeCard key={a.slug} a={a} i={i} time={a.time} />
          ))}
        </Grid>
      )}

      <div className="sec-title">
        <h2>Sedang tayang</h2>
      </div>
      {ongoing.error ? (
        <ErrorBox message={ongoing.error} />
      ) : (
        <Grid>
          {ongoing.data.map((a, i) => (
            <AnimeCard key={a.slug} a={a} i={i} />
          ))}
        </Grid>
      )}
    </>
  );
}