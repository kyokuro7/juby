import Link from "next/link";
import { safe, HARI, hariIni } from "../../lib/api";
import { AnimeCard, Grid, ErrorBox, Empty } from "../../components/ui";

export const metadata = { title: "Jadwal Tayang" };

export default async function Jadwal({ searchParams }) {
  const sp = await searchParams;
  const minta = String(sp?.hari || hariIni()).toLowerCase();
  const pilih = HARI.find((h) => h.toLowerCase() === minta) || "Senin";

  const { data, error } = await safe(/schedule?day=${pilih.toLowerCase()});
  const items = data ? data[pilih] || Object.values(data).flat() : [];

  return (
    <>
      <div className="sec-title">
        <h1>Jadwal Tayang</h1>
      </div>

      <div className="chips scroll">
        {HARI.map((h) => (
          <Link
            key={h}
            href={/jadwal?hari=${h.toLowerCase()}}
            className={chip ${h === pilih ? "on" : ""}}
          >
            {h}
          </Link>
        ))}
      </div>

      <div className="sec-title">
        <h2>{pilih}</h2>
        <span className="more">Jam mengikuti situs sumber</span>
      </div>

      {error ? (
        <ErrorBox message={error} />
      ) : items.length === 0 ? (
        <Empty>Tidak ada anime yang tayang di hari {pilih}.</Empty>
      ) : (
        <Grid>
          {items.map((a, i) => (
            <AnimeCard key={a.slug} a={a} i={i} time={a.time} />
          ))}
        </Grid>
      )}
    </>
  );
}