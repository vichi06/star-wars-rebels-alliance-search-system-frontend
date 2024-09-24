import React from "react";

interface PlanetsProps {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const PlanetsView: React.FC<PlanetsProps> = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>
        <strong>Rotation Period:</strong> {props.rotation_period} hours
      </p>
      <p>
        <strong>Orbital Period:</strong> {props.orbital_period} days
      </p>
      <p>
        <strong>Diameter:</strong> {props.diameter} km
      </p>
      <p>
        <strong>Climate:</strong> {props.climate}
      </p>
      <p>
        <strong>Gravity:</strong> {props.gravity}
      </p>
      <p>
        <strong>Terrain:</strong> {props.terrain}
      </p>
      <p>
        <strong>Surface Water:</strong> {props.surface_water}%
      </p>
      <p>
        <strong>Population:</strong> {props.population}
      </p>

      {/* Display related residents */}
      <div>
        <strong>Residents:</strong>
        {props.residents.length > 0 ? (
          <ul>
            {props.residents.map((resident, index) => (
              <li key={index}>{resident}</li>
            ))}
          </ul>
        ) : (
          <p>No known residents.</p>
        )}
      </div>

      {/* Display related films */}
      <div>
        <strong>Films:</strong>
        {props.films.length > 0 ? (
          <ul>
            {props.films.map((film, index) => (
              <li key={index}>{film}</li>
            ))}
          </ul>
        ) : (
          <p>No known films.</p>
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

export default PlanetsView;
