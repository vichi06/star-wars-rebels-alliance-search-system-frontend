import React from "react";

interface Starships {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const StarshipsView: React.FC<Starships> = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>
        <strong>Model:</strong> {props.model}
      </p>
      <p>
        <strong>Manufacturer:</strong> {props.manufacturer}
      </p>
      <p>
        <strong>Cost in Credits:</strong> {props.cost_in_credits}
      </p>
      <p>
        <strong>Length:</strong> {props.length} meters
      </p>
      <p>
        <strong>Max Atmosphering Speed:</strong> {props.max_atmosphering_speed}
      </p>
      <p>
        <strong>Crew:</strong> {props.crew}
      </p>
      <p>
        <strong>Passengers:</strong> {props.passengers}
      </p>
      <p>
        <strong>Cargo Capacity:</strong> {props.cargo_capacity} kg
      </p>
      <p>
        <strong>Consumables:</strong> {props.consumables}
      </p>
      <p>
        <strong>Hyperdrive Rating:</strong> {props.hyperdrive_rating}
      </p>
      <p>
        <strong>MGLT:</strong> {props.MGLT}
      </p>
      <p>
        <strong>Starship Class:</strong> {props.starship_class}
      </p>

      {/* Display related pilots */}
      <div>
        <strong>Pilots:</strong>
        {props.pilots.length > 0 ? (
          <ul>
            {props.pilots.map((pilot, index) => (
              <li key={index}>{pilot}</li>
            ))}
          </ul>
        ) : (
          <p>No known pilots.</p>
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

export default StarshipsView;
