"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import TypeRenderer from "@/app/components/TypeRenderer";
import { mapWookieeToStandard } from "../../../../../utils/translations";

import styles from "./page.module.css";

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
  const router = useRouter();

  const [data, setData] = useState<DetailData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if token is not present
      router.push("/");
      return;
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (type && id) {
        try {
          let apiUrl = `http://localhost:3001/details?type=${type}&id=${id}`;
          let isWookieeFormat = format === "wookiee"; // Determine if Wookiee format is needed

          if (isWookieeFormat) {
            apiUrl += "&format=wookiee";
          }

          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
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

  if (error) return <p className={styles.error}>{error}</p>;
  if (data)
    return (
      <div>
        <h1>Details for {data.name || data.title}</h1>
        <TypeRenderer type={type} data={data} />
        <Link href="/search">Go back</Link>
      </div>
    );
};

export default DetailPage;
