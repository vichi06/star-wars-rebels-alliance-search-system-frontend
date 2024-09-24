"use client";
import { useEffect, useRef, useState } from "react";
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
  const [query, setQuery] = useState<string>("");
  const [type, setType] = useState<string>("people");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [wookiee, setWookiee] = useState<boolean>(false);

  // Using a ref to store the current AbortController for cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debounced search function
  const debouncedSearch = debounce(async (query: string) => {
    // Clear the results if the query is empty
    if (!query) {
      setResults([]);
      setNoResults(false);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setNoResults(false);

    // Cancel the previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new abort controller for the new request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const auth = "Basic " + btoa("Luke:DadSucks"); // Encode les identifiants en base64

    try {
      const response = await axios.get(
        `http://localhost:3001/search?type=${type}&query=${query}${
          wookiee ? "&format=wookiee" : ""
        }`,
        {
          headers: {
            Authorization: auth, // Ajouter l'en-tête d'authentification
          },
          signal: controller.signal, // Pass the abort signal
        }
      );
      let data = response.data || [];

      if (wookiee) {
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
      if (axios.isCancel(err)) {
        console.log("Previous request canceled");
      } else {
        setError("Error retrieving data.");
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  }, 300); // Adjust the debounce delay (in ms) as needed

  // Effect to call debounced search on query change
  useEffect(() => {
    debouncedSearch(query);
  }, [query, type, wookiee]);

  return (
    <div>
      <h1>Star Wars Rebels Alliance Search System</h1>
      <button onClick={() => setWookiee(!wookiee)}>
        Turn into {wookiee ? "basic language" : "wookiee"}
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
                wookiee ? "?format=wookiee" : ""
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
