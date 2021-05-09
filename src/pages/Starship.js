import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, formatTitle } from "../helpers";
import { CharacterList, FilmList, Page } from "../components";

const Starship = () => {
  const { id } = useParams();
  const { data: starshipInfo, error } = useSWR(
    `https://swapi.dev/api/starships/${id}/`,
    fetcher
  );

  return (
    <Page loaded={starshipInfo} error={error}>
      {starshipInfo &&
        Object.keys(starshipInfo).map((item, key) => {
          switch (item) {
            case "name":
              return (
                <h2 key={key} className="title">
                  {starshipInfo[item]}
                </h2>
              );
            case "films":
              return (
                <div key={key}>
                  <h3>Films</h3>
                  <FilmList films={starshipInfo[item]} />
                </div>
              );
            case "pilots":
              return (
                <div key={key}>
                  <h3>Residents</h3>
                  <CharacterList characters={starshipInfo[item]} />
                </div>
              );
            default:
              return (
                <div key={key}>
                  <h3>{formatTitle(item)}</h3>
                  <span>{starshipInfo[item]}</span>
                </div>
              );
          }
        })}
    </Page>
  );
};

export default Starship;
