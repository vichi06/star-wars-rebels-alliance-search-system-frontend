"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation"; // Update import
import Link from "next/link";

const DetailPage = () => {
  const { type, id } = useParams(); // Use useParams to get dynamic route parameters
  const searchParams = useSearchParams();
  const format = searchParams.get("format");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type && id) {
      const auth = "Basic " + btoa("Luke:DadSucks"); // Encode les identifiants en base64

      const fetchData = async () => {
        try {
          let apiUrl = `http://localhost:3001/details?type=${type}&id=${id}`;

          if (format === "wookiee") apiUrl += "&format=wookiee";

          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: auth,
            },
          });
          setData(response.data || {});
          setError("");
        } catch (err) {
          setError("Error retrieving data.");
        }
      };

      fetchData();
    }
  }, [type, id]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Details for {data.name || data.title}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href="/">Go back</Link>
    </div>
  );
};

export default DetailPage;
