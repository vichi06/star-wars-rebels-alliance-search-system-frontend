"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { mapWookieeToStandard } from "../../utils/translations";
import "./page.module.css";

// Debounce function
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("people");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wookieee, setWookiee] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce(async (query: string) => {
    if (!query) {
      setError("Please enter a name to search.");
      setResults([]);
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

      if (wookieee) {
        data = data.rcwochuanaoc.map((result: any) =>
          mapWookieeToStandard(result, type)
        );
      } else {
        data = data.results;
      }

      if (data.length === 0) {
        setNoResults(true);
        setResults([]);
      } else {
        setNoResults(false);
        setResults(data);
      }

      setError("");
    } catch (err) {
      setError("Error retrieving data.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 300); // Adjust the debounce delay (in ms) as needed

  // Effect to call debounced search on query change
  useEffect(() => {
    debouncedSearch(query);
  }, [query, type, wookieee]);

  return (
    <div>
      <h1>Star Wars Rebels Alliance Search System</h1>
      <button onClick={() => setWookiee(!wookieee)}>
        Turn into {wookieee ? "basic language" : "wookiee"}
      </button>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Name to research"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="people">People</option>
          <option value="films">Films</option>
          <option value="planets">Planets</option>
          <option value="starships">Starships</option>
          <option value="vehicles">Vehicles</option>
          <option value="species">Species</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p>{error}</p>} {noResults && <p>No results found.</p>}
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
