"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { mapWookieeToStandard } from "../../utils/translations";

const Home = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("people");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wookieee, setWookiee] = useState(false);

  useEffect(() => {
    setQuery("");
    setResults([]);
  }, [wookieee]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form from refreshing the page

    if (!query) {
      setError("Veuillez entrer un nom à rechercher.");
      return;
    }

    setLoading(true);
    setError("");
    setNoResults(false);

    const auth = "Basic " + btoa("Luke:DadSucks"); // Encode les identifiants en base64

    try {
      const response = await axios.get(
        `http://localhost:3001/search?type=${type}&query=${query}${
          wookieee ? "&format=wookiee" : ""
        }`,
        {
          headers: {
            Authorization: auth, // Ajouter l'en-tête d'authentification
          },
        }
      );
      let data = response.data || [];

      if (wookieee)
        data = data.rcwochuanaoc.map((result: any) =>
          mapWookieeToStandard(result, type)
        );
      else data = data.results;

      if (data.length === 0) {
        setNoResults(true);
        setResults([]);
      } else {
        setNoResults(false);
        setResults(data);
      }

      setError("");
    } catch (err) {
      setError("Erreur lors de la récupération des données.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Recherche dans SWAPI</h1>
      <button onClick={() => setWookiee(!wookieee)}>
        Turn into {wookieee ? "basic language" : "wookiee"}
      </button>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Nom à rechercher"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="people">Personnes</option>
          <option value="films">Films</option>
          <option value="planets">Planètes</option>
          <option value="starships">Vaisseaux</option>
          <option value="vehicles">Véhicules</option>
          <option value="species">Espèces</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </form>
      {error && <p>{error}</p>} {noResults && <p>Aucun résultat trouvé.</p>}
      <ul>
        {results.map((result) => (
          <li key={result.name || result.title}>
            <Link
              href={`/${type}/${result.url.split("/").slice(-2, -1)[0]}${
                wookieee ? "?format=wookiee" : ""
              }`}
            >
              {result.name || result.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
