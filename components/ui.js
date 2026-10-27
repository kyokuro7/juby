import Link from "next/link";
import { GENRES } from "../lib/api";

export function AnimeCard({ a, i = 0, time }) {
  const meta = [a.type, a.episode != null ? EP ${a.episode} : null].filter(Boolean);
  return (
    <Link href={/anime/${a.slug}} className={card c${i % 6}}>
      <div className="poster">
        {a.poster && (
          <img src={a.poster} alt={a.title} loading="lazy" referrerPolicy="no-referrer" />
        )}
        {a.score != null && <span className="badge">★ {a.score}</span>}
        {time && <span className="badge time">{time}</span>}
      </div>
      <div className="card-body">
        <h3>{a.title}</h3>
        {meta.length > 0 && <p>{meta.join(" · ")}</p>}
      </div>
    </Link>
  );
}

export function Grid({ children }) {
  return <div className="grid">{children}</div>;
}

export function ErrorBox({ message }) {
  return (
    <div className="box err">
      <strong>Gagal memuat data.</strong>
      <p>{message}</p>
    </div>
  );
}

export function Empty({ children }) {
  return <div className="box">{children}</div>;
}

export function SearchForm({ defaultValue = "" }) {
  return (
    <form action="/cari" className="search">
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Cari judul anime..."
        aria-label="Cari anime"
      />
      <button type="submit" className="btn">Cari</button>
    </form>
  );
}

export function GenreChips({ active, scroll = true }) {
  return (
    <div className={chips ${scroll ? "scroll" : ""}}>
      {GENRES.map(([slug, label]) => (
        <Link
          key={slug}
          href={/cari?genre=${slug}}
          className={chip ${active === slug ? "on" : ""}}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}