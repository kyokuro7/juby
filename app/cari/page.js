import { safe, genreLabel } from "../../lib/api";
import { AnimeCard, Grid, ErrorBox, Empty, SearchForm, GenreChips } from "../../components/ui";

export const metadata = { title: "Cari Anime" };

export default async function Cari({ searchParams }) {
  const sp = await searchParams;
  const q = String(sp?.q || "").trim();
  const genre = String(sp?.genre || "").trim();

  let res = null;
  let judul = "Cari Anime";
  if (q) {
    res = await safe(/search?q=${encodeURIComponent(q)});
    judul = Hasil untuk “${q}”;
  } else if (genre) {
    res = await safe(/genre/${encodeURIComponent(genre)});
    judul = Genre: ${genreLabel(genre)};
  }

  return (
    <>
      <section className="hero small">
        <SearchForm defaultValue={q} />
      </section>

      <GenreChips active={genre} />

      <div className="sec-title">
        <h1>{judul}</h1>
      </div>

      {!res ? (
        <Empty>Ketik judul di kolom pencarian, atau pilih genre di atas.</Empty>
      ) : res.error ? (
        <ErrorBox message={res.error} />
      ) : res.data.length === 0 ? (
        <Empty>Tidak ada hasil. Coba kata kunci lain.</Empty>
      ) : (
        <Grid>
          {res.data.map((a, i) => (
            <AnimeCard key={a.slug} a={a} i={i} />
          ))}
        </Grid>
      )}
    </>
  );
}