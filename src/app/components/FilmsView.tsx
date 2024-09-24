import React from "react";

interface FilmsProps {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

const FilmsView: React.FC<FilmsProps> = (props) => {
  return (
    <div>
      <p>
        <strong>Episode ID:</strong> {props.episode_id}
      </p>
      <p>
        <strong>Opening Crawl:</strong>
      </p>
      <p>{props.opening_crawl}</p>
      <p>
        <strong>Director:</strong> {props.director}
      </p>
      <p>
        <strong>Producer:</strong> {props.producer}
      </p>
      <p>
        <strong>Release Date:</strong>{" "}
        {new Date(props.release_date).toLocaleDateString()}
      </p>

      {/* Display related characters */}
      <div>
        <strong>Characters:</strong>
        {props.characters.length > 0 ? (
          <ul>
            {props.characters.map((character, index) => (
              <li key={index}>{character}</li>
            ))}
          </ul>
        ) : (
          <p>No known characters.</p>
        )}
      </div>

      {/* Display related planets */}
      <div>
        <strong>Planets:</strong>
        {props.planets.length > 0 ? (
          <ul>
            {props.planets.map((planet, index) => (
              <li key={index}>{planet}</li>
            ))}
          </ul>
        ) : (
          <p>No known planets.</p>
        )}
      </div>

      {/* Display related starships */}
      <div>
        <strong>Starships:</strong>
        {props.starships.length > 0 ? (
          <ul>
            {props.starships.map((starship, index) => (
              <li key={index}>{starship}</li>
            ))}
          </ul>
        ) : (
          <p>No known starships.</p>
        )}
      </div>

      {/* Display related vehicles */}
      <div>
        <strong>Vehicles:</strong>
        {props.vehicles.length > 0 ? (
          <ul>
            {props.vehicles.map((vehicle, index) => (
              <li key={index}>{vehicle}</li>
            ))}
          </ul>
        ) : (
          <p>No known vehicles.</p>
        )}
      </div>

      {/* Display related species */}
      <div>
        <strong>Species:</strong>
        {props.species.length > 0 ? (
          <ul>
            {props.species.map((species, index) => (
              <li key={index}>{species}</li>
            ))}
          </ul>
        ) : (
          <p>No known species.</p>
        )}
      </div>

      <p>
        <strong>Created:</strong> {new Date(props.created).toLocaleDateString()}
      </p>
      <p>
        <strong>Edited:</strong> {new Date(props.edited).toLocaleDateString()}
      </p>
    </div>
  );
};

export default FilmsView;
