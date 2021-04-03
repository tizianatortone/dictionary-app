import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

export default function Dictionary () {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState(null);

function handleResponse (response){
setResults(response.data[0]);
}

    function search(event){
        event.preventDefault();
   
    let apiUrl=`https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(handleResponse);
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
        </div>
    )
}