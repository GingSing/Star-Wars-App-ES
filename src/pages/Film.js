import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, formatTitle } from "../helpers";
import {
  CharacterList,
  VehicleList,
  StarshipList,
  SpeciesList,
  PlanetList,
  Page,
} from "../components";

const Film = () => {
  const { id } = useParams();
  const { data: filmInfo, error } = useSWR(
    `https://swapi.dev/api/films/${id}/`,
    fetcher
  );
  return (
    <Page loaded={filmInfo} error={error}>
      {filmInfo &&
        Object.keys(filmInfo).map((item, key) => {
          switch (item) {
            case "title":
              return (
                <h2 key={key} className="title">
                  {filmInfo[item]}
                </h2>
              );

            case "characters":
              return (
                <div key={key}>
                  <h3>Characters</h3>
                  <CharacterList characters={filmInfo[item]} />
                </div>
              );
            case "planets":
              return (
                <div key={key}>
                  <h3>Planets</h3>
                  <PlanetList planets={filmInfo[item]} />
                </div>
              );
            case "starships":
              return (
                <div key={key}>
                  <h3>Starships</h3>
                  <StarshipList starships={filmInfo[item]} />
                </div>
              );
            case "vehicles":
              return (
                <div key={key}>
                  <h3>Vehicles</h3>
                  <VehicleList vehicles={filmInfo[item]} />
                </div>
              );
            case "species":
              return (
                <div key={key}>
                  <h3>Species</h3>
                  <SpeciesList species={filmInfo[item]} />
                </div>
              );
            default:
              return (
                <div key={key}>
                  <h3>{formatTitle(item)}</h3>
                  <span>{filmInfo[item]}</span>
                </div>
              );
          }
        })}
    </Page>
  );
};

export default Film;
