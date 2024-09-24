"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import TypeRenderer from "@/app/components/TypeRenderer";
import { mapWookieeToStandard } from "../../../../utils/translations";

// Define the expected data structure
interface DetailData {
  name?: string;
  title?: string;
  [key: string]: any; // Allow additional properties as needed
}

const DetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>(); // Use useParams with explicit types
  const searchParams = useSearchParams();
  const format = searchParams.get("format");

  const [data, setData] = useState<DetailData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (type && id) {
        const auth = "Basic " + btoa("Luke:DadSucks"); // Encode credentials in base64

        try {
          let apiUrl = `http://localhost:3001/details?type=${type}&id=${id}`;
          let isWookieeFormat = format === "wookiee"; // Determine if Wookiee format is needed

          if (isWookieeFormat) {
            apiUrl += "&format=wookiee";
          }

          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: auth,
            },
          });

          const responseData = response.data;

          // Process data based on format
          if (isWookieeFormat) {
            setData(mapWookieeToStandard(responseData, type));
          } else {
            setData(responseData || {});
          }

          setError(""); // Clear any previous errors
        } catch (err) {
          setError("Error retrieving data.");
        }
      }
    };

    fetchData();
  }, [type, id, format]); // Add format to dependency array to refetch if it changes

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Details for {data.name || data.title}</h1>
      <TypeRenderer type={type} data={data} />
      <Link href="/">Go back</Link>
    </div>
  );
};

export default DetailPage;
