import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary () {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState(null);
    const [photos, setPhotos] = useState (null);

function handleResponse (response){
setResults(response.data[0]);
}

function handlePexelsResponse (response) {
    console.log(response);
    setPhotos(response.data.photos);
}
    function search(event){
        event.preventDefault();
   
    let apiUrl=`https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(handleResponse);

    const pexelsApiKey = "563492ad6f91700001000001ed51df52bb9540e6a1b18ffed49adcac";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`
    let headers = { Authorization: `Bearer ${pexelsApiKey}` };
    axios.get(pexelsApiUrl, { headers : headers }).then(handlePexelsResponse);
  }

    function handleKeywordChange(event){
        setKeyword(event.target.value);
    }
    return(
        <div className="Dictionary">
            <h1 className="title">Dictionary 📖 </h1>
            <h3>What word are you looking for? </h3>
            <section>
          <form onSubmit={search}>
              <input type="search" placeholder="Type here..." onChange={handleKeywordChange}/>
          </form>

          </section>
          <Results results={results}/>
          <Photos photos={photos} />
        </div>
    )
}