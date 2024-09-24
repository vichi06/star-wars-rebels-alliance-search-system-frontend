// components/TypeRenderer.tsx
import React, { useEffect, useState } from "react";
import PeopleView from "./PeopleView";
import FilmsView from "./FilmsView";
import SpeciesView from "./SpeciesView";
import StarshipsView from "./StarshipsView";
import PlanetsView from "./PlanetsView";
import VehiclesView from "./VehiclesView";
import axios from "axios";

// Create a map between `type` and component
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
  data: any;
}

// Helper function to extract last two segments of the URL
const extractLastTwoSegments = (url: string) => {
  const segments = url.split("/").filter(Boolean); // Split by '/' and filter out empty strings
  return segments.slice(-2); // Return the last two segments joined by '/'
};

const TypeRenderer: React.FC<TypeRendererProps> = ({ type, data }) => {
  const Component = viewComponents[type]; // Get the appropriate component

  if (!Component) {
    return <div>Type not supported</div>; // Handle unsupported types
  }

  // State to hold transformed data
  const [transformedData, setTransformedData] = useState({ ...data }); // Create a shallow copy of data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const transformData = async () => {
      const newData = { ...data }; // Create a new object to avoid mutating the original data

      // Helper function to transform a value (URL or array of URLs)
      const transformValue = async (value: any) => {
        if (Array.isArray(value)) {
          // If the value is an array, process each element
          const transformedArray = await Promise.all(
            value.map(async (item) => {
              if (typeof item === "string" && item.startsWith("http")) {
                const [type, id] = extractLastTwoSegments(item);
                const fetchData = async () => {
                  try {
                    let apiUrl = `http://localhost:3001/details?type=${type}&id=${id}`;
                    const auth = "Basic " + btoa("Luke:DadSucks"); // Encode the credentials in base64

                    const response = await axios.get(apiUrl, {
                      headers: {
                        Authorization: auth,
                      },
                    });

                    return response.data.name || response.data.title; // Return the name from the API response
                  } catch (err) {
                    console.error(err); // Handle error appropriately
                    return null; // Return null in case of an error
                  }
                };
                return await fetchData(); // Await the result of the fetch
              }
              return item; // Return the item if it's not a URL
            })
          );

          return transformedArray; // Return the transformed array
        } else if (typeof value === "string" && value.startsWith("http")) {
          // If it's a single URL
          const [type, id] = extractLastTwoSegments(value);
          const fetchData = async () => {
            try {
              let apiUrl = `http://localhost:3001/details?type=${type}&id=${id}`;
              const auth = "Basic " + btoa("Luke:DadSucks"); // Encode the credentials in base64

              const response = await axios.get(apiUrl, {
                headers: {
                  Authorization: auth,
                },
              });
              return response.data.name || response.data.title; // Return the name from the API response
            } catch (err) {
              console.error(err); // Handle error appropriately
              return null; // Return null in case of an error
            }
          };
          return await fetchData(); // Await the result of the fetch
        }

        return value; // Return value as is if it doesn't match
      };

      // Iterate over the keys in newData
      for (const key of Object.keys(newData)) {
        newData[key] = await transformValue(newData[key]); // Transform each value
      }

      setTransformedData(newData); // Set the transformed data in state
      setLoading(false);
    };

    transformData(); // Call the function to transform data
  }, [data]); // Depend on data, rerun if data changes

  return loading ? <p>Loading</p> : <Component {...transformedData} />; // Pass data as props to the component
};

export default TypeRenderer;
