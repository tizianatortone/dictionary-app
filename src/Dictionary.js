import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [photos, setPhotos] = useState(null);

  function handleResponse(response) {
    setResults(response.data[0]);
  }

  function handlePexelsResponse(response) {
    console.log(response);
    setPhotos(response.data.photos);
  }
  function search(event) {
    event.preventDefault();

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(handleResponse);

    const imageApiKey = "eaf7dab2b2d4b14t4ff1e93aa36o60ff";
    let imageApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyword}&key=${imageApiKey}`;
    let headers = { Authorization: `Bearer ${imageApiKey}` };
    axios.get(imageApiUrl, { headers: headers }).then(handlePexelsResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }
  return (
    <div className="Dictionary">
      <h1 className="title">Dictionary 📖 </h1>
      <h3>What word are you looking for? </h3>
      <section>
        <form onSubmit={search}>
          <input
            type="search"
            placeholder="Type here..."
            onChange={handleKeywordChange}
          />
        </form>
      </section>
      <Results results={results} />
      <Photos photos={photos} />
    </div>
  );
}
