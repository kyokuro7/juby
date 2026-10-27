import Link from "next/link";
import { safe, slugify } from "../../../lib/api";
import { ErrorBox } from "../../../components/ui";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await safe(/anime/${slug});
  return {
    title: data?.title || "Detail Anime",
    description: data?.synopsis ? data.synopsis.slice(0, 150) : undefined,
  };
}

export default async function Detail({ params }) {
  const { slug } = await params;
  const { data, error } = await safe(/anime/${slug});
  if (error) return <ErrorBox message={error} />;

  const eps = [...(data.episodes || [])].sort((a, b) => b.number - a.number);

  return (
    <>
      <div className="detail">
        <div className="panel poster-panel">
          {data.poster && (
            <img src={data.poster} alt={data.title} referrerPolicy="no-referrer" />
          )}
        </div>

        <div className="panel">
          <h1>{data.title}</h1>

          {data.genres?.length > 0 && (
            <div className="chips">
              {data.genres.map((g) => (
                <Link key={g} href={/cari?genre=${slugify(g)}} className="chip">
                  {g}
                </Link>
              ))}
            </div>
          )}

          <h3 className="label">Sinopsis</h3>
          <p className="syn">{data.synopsis || "Sinopsis belum tersedia."}</p>

          <a
            className="btn"
            href={https://mirainime.com/anime/${slug}}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buka di Mirainime ↗
          </a>
        </div>
      </div>

      <div className="sec-title">
        <h2>Episode</h2>
        <span className="more">{eps.length} episode</span>
      </div>

      {eps.length === 0 ? (
        <div className="box">Belum ada episode.</div>
      ) : (
        <ul className="eps">
          {eps.map((e, i) => (
            <li key={e.number}>
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className={ep c${i % 6}}
              >
                <span className="num">{e.number}</span>
                <span className="ep-info">
                  <strong>{e.title || Episode ${e.number}}</strong>
                  {e.date && <small>{e.date}</small>}
                </span>
                <span className="go">↗</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}