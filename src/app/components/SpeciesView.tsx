import React from "react";

interface SpeciesProps {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const SpeciesView: React.FC<SpeciesProps> = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>
        <strong>Classification:</strong> {props.classification}
      </p>
      <p>
        <strong>Designation:</strong> {props.designation}
      </p>
      <p>
        <strong>Average Height:</strong> {props.average_height} cm
      </p>
      <p>
        <strong>Skin Colors:</strong> {props.skin_colors}
      </p>
      <p>
        <strong>Hair Colors:</strong> {props.hair_colors}
      </p>
      <p>
        <strong>Eye Colors:</strong> {props.eye_colors}
      </p>
      <p>
        <strong>Average Lifespan:</strong> {props.average_lifespan} years
      </p>
      <p>
        <strong>Homeworld:</strong> {props.homeworld}
      </p>
      <p>
        <strong>Language:</strong> {props.language}
      </p>

      {/* Display related people */}
      <div>
        <strong>People:</strong>
        {props.people.length > 0 ? (
          <ul>
            {props.people.map((person, index) => (
              <li key={index}>{person}</li>
            ))}
          </ul>
        ) : (
          <p>No known people.</p>
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

export default SpeciesView;
