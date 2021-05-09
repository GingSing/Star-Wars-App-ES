import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers";
import { CharacterList, FilmList, Page } from "../components";

const Planet = () => {
  const { id } = useParams();
  const { data: planetInfo, error } = useSWR(
    `https://swapi.dev/api/planets/${id}/`,
    fetcher
  );
  return (
    <Page loaded={planetInfo} error={error}>
      {planetInfo &&
        Object.keys(planetInfo).map((item, key) => {
          switch (item) {
            case "name":
              return (
                <h2 key={key} className="title">
                  {planetInfo[item]}
                </h2>
              );
            case "films":
              return (
                <div key={key}>
                  <h3>Films</h3>
                  <FilmList films={planetInfo[item]} />
                </div>
              );
            case "residents":
              return (
                <div key={key}>
                  <h3>Residents</h3>
                  <CharacterList characters={planetInfo[item]} />
                </div>
              );
            default:
              return (
                <div key={key}>
                  <h3>{item}</h3>
                  <span>{planetInfo[item]}</span>
                </div>
              );
          }
        })}
    </Page>
  );
};

export default Planet;
