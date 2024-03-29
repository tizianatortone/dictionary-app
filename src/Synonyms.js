import React from "react";
import "./Synonyms.css";

export default function Synonyms(props) {
  if (props.synonyms) {
    return (
      <span className="Synonyms">
        <ul>
          {props.synonyms.map(function (synonym, index) {
            return <li key={index}>{synonym} </li>;
          })}
        </ul>
      </span>
    );
  } else {
    return null;
  }
}
