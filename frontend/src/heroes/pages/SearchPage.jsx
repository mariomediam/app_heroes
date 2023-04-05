 import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { getHeroByName } from "../helpers";
import { HeroCard } from "../components/HeroCard";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);
  const heroesSearch = getHeroByName(q)

  const showSearch = (q.length === 0);
  const showError = (q.length > 0 && heroesSearch.length === 0);


  const { searchText, onInputChange } = useForm({
    searchText: q,
  });


  
  const onSearchSubmit = (e) => {
    e.preventDefault();
  
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Find your hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button
              className="btn m-1 btn-block btn-primary"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <div className="alert alert-primary" style={{ display: showSearch ? "" : "none"}}>Search a hero</div>
          <div className="alert alert-danger" style={{ display: showError ? "" : "none"}}>
            No hero with <b>{ q }</b>
          </div>
          <div className="alert alert-success">
            <ul className="list-group list-group-flush">
              {heroesSearch.map((hero) => (
                <li key={hero.id} className="list-group-item">
                  <HeroCard {...hero} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
