"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation"; // Update import
import Link from "next/link";

const DetailPage = () => {
  const { type, id } = useParams(); // Use useParams to get dynamic route parameters
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type && id) {
      const auth = "Basic " + btoa("Luke:DadSucks"); // Encode les identifiants en base64

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/details?type=${type}&id=${id}`,
            {
              headers: {
                Authorization: auth,
              },
            }
          );
          console.log(response);
          setData(response.data || {});
          setError("");
        } catch (err) {
          setError("Erreur lors de la récupération des détails.");
        }
      };

      fetchData();
    }
  }, [type, id]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Détails de {data.name || data.title}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href="/">Retour</Link>
    </div>
  );
};

export default DetailPage;
