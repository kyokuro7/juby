import Link from "next/link";
import { safe } from "../../lib/api";
import { AnimeCard, Grid, ErrorBox, Empty } from "../../components/ui";

export const metadata = { title: "Daftar Anime" };

export default async function Daftar({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp?.page) || 1);
  const { data, error } = await safe(/anime?page=${page});
  const list = data?.results || [];

  return (
    <>
      <div className="sec-title">
        <h1>Daftar Anime</h1>
        <span className="more">Halaman {page}</span>
      </div>

      {error ? (
        <ErrorBox message={error} />
      ) : list.length === 0 ? (
        <Empty>Tidak ada anime di halaman ini.</Empty>
      ) : (
        <Grid>
          {list.map((a, i) => (
            <AnimeCard key={a.slug} a={a} i={i} />
          ))}
        </Grid>
      )}

      <div className="pager">
        {page > 1 && (
          <Link href={/daftar?page=${page - 1}} className="btn">← Sebelumnya</Link>
        )}
        {list.length > 0 && (
          <Link href={/daftar?page=${page + 1}} className="btn">Berikutnya →</Link>
        )}
      </div>
    </>
  );
}