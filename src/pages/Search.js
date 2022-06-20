import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const QUERY_COUNTRY_SEARCH = gql`
  query ($code: ID!) {
    country(code: $code) {
      name
      capital
      emoji
      code
      currency
    }
  }
`;

function Search() {
  const [countrySearch, setCountrySearch] = useState("");
  const [searchCountry, { data, loading, error }] =
    useLazyQuery(QUERY_COUNTRY_SEARCH);
  return (
    <div className="search">
      <div className="inputs">
        <Link to="/">
          {" "}
          <h4>List of Countries</h4>
        </Link>
        <input
          type="text"
          placeholder="Enter Country Code"
          onChange={(event) => {
            setCountrySearch(event.target.value);
          }}
        />
        <button
          onClick={() => {
            searchCountry({
              variables: { code: countrySearch.toUpperCase() },
            });
          }}
        >
          Search Country
        </button>
      </div>

      <div className="searchCountry">
        {loading && <h3> Data is loading...</h3>}
        {error && <h3> {error.message} </h3>}
        {data && (
          <div className="countryDisplay">
            <h1>
              {data.country.name}
              {data.country.emoji}
            </h1>
            <h1>Capital: {data.country.capital} </h1>
            <h1> Currency: {data.country.currency}</h1>
            <h1> Country Code: {data.country.code}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
