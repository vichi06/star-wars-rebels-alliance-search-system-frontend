"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { mapWookieeToStandard } from "../../../utils/translations";

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

// Result type based on the expected API response
interface Result {
  name?: string;
  title?: string;
  url: string;
}

// Main Search component
const Search: React.FC = () => {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState<string>(urlQuery);
  const [type, setType] = useState<string>("people");
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [wookiee, setWookiee] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if token is not present
      router.push("/");
      return;
    }
  }, [router]);

  // Using a ref to store the current AbortController for cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debounced search function
  const debouncedSearch = debounce(async (query: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    // Cancel the previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

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

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await axios.get(
        `http://localhost:3001/search?type=${type}&query=${query}${
          wookiee ? "&format=wookiee" : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        }
      );

      let data: Result[] = response.data.results || [];

      if (wookiee && response.data.rcwochuanaoc) {
        data = response.data.rcwochuanaoc.map((result: any) =>
          mapWookieeToStandard(result, type)
        );
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

  // Effect to call debounced search when query, type, or wookiee change
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
      {error && <p>{error}</p>}
      {noResults && <p>No results found.</p>}
      <ul>
        {results.map((result) => (
          <li key={result.url}>
            <Link
              href={`/search/${type}/${result.url.split("/").slice(-2, -1)[0]}${
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

export default Search;
