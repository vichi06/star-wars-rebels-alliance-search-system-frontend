import React from "react";

interface PeopleProps {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  created: string;
  edited: string;
  url: string;
}

const PeopleView: React.FC<PeopleProps> = (props) => {
  return (
    <div>
      <p>
        <strong>Height:</strong> {props.height} cm
      </p>
      <p>
        <strong>Mass:</strong> {props.mass} kg
      </p>
      <p>
        <strong>Hair Color:</strong> {props.hair_color}
      </p>
      <p>
        <strong>Skin Color:</strong> {props.skin_color}
      </p>
      <p>
        <strong>Eye Color:</strong> {props.eye_color}
      </p>
      <p>
        <strong>Birth Year:</strong> {props.birth_year}
      </p>
      <p>
        <strong>Gender:</strong> {props.gender}
      </p>
      <p>
        <strong>Homeworld:</strong> {props.homeworld}
      </p>
      <p>
        <strong>Created:</strong> {new Date(props.created).toLocaleDateString()}
      </p>
      <p>
        <strong>Edited:</strong> {new Date(props.edited).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PeopleView;
