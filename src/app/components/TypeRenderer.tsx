// components/TypeRenderer.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PeopleView from "./PeopleView";
import FilmsView from "./FilmsView";
import SpeciesView from "./SpeciesView";
import StarshipsView from "./StarshipsView";
import PlanetsView from "./PlanetsView";
import VehiclesView from "./VehiclesView";

// Mapping between type and corresponding components
const viewComponents: Record<string, React.FC<any>> = {
  people: PeopleView,
  films: FilmsView,
  species: SpeciesView,
  starships: StarshipsView,
  planets: PlanetsView,
  vehicles: VehiclesView,
};

interface TypeRendererProps {
  type: string;
  data: any; // Consider refining this type to a more specific type if possible
}

// Extract the last two segments from a URL
const extractLastTwoSegments = (url: string): string[] => {
  const segments = url.split("/").filter(Boolean);
  return segments.slice(-2);
};

// Fetch data from the API based on the URL
const fetchDataFromApi = async (url: string): Promise<string | null> => {
  const [type, id] = extractLastTwoSegments(url);
  const apiUrl = `http://localhost:3001/details?type=${type}&id=${id}`;
  const auth = "Basic " + btoa("Luke:DadSucks");

  try {
    const response = await axios.get(apiUrl, {
      headers: { Authorization: auth },
    });
    return response.data.name || response.data.title;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Main TypeRenderer component
const TypeRenderer: React.FC<TypeRendererProps> = ({ type, data }) => {
  const Component = viewComponents[type];

  if (!Component) {
    return <div>Type not supported</div>;
  }

  const [transformedData, setTransformedData] = useState<any>({ ...data });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const transformData = async () => {
      const newData = { ...data };

      // Helper function to transform the value
      const transformValue = async (value: any): Promise<any> => {
        if (Array.isArray(value)) {
          return await Promise.all(value.map((item) => transformValue(item)));
        }

        if (typeof value === "string" && value.startsWith("http")) {
          return await fetchDataFromApi(value);
        }

        return value;
      };

      // Transform each key in newData
      for (const key of Object.keys(newData)) {
        newData[key] = await transformValue(newData[key]);
      }

      setTransformedData(newData);
      setLoading(false);
    };

    transformData();
  }, [data]);

  return loading ? <p>Loading...</p> : <Component {...transformedData} />;
};

export default TypeRenderer;
