import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, formatTitle } from "../helpers";
import {
  PlanetList,
  StarshipList,
  SpeciesList,
  FilmList,
  VehicleList,
  Page,
} from "../components";

const Character = () => {
  const { id } = useParams();
  const { data: characterInfo, error } = useSWR(
    `https://swapi.dev/api/people/${id}/`,
    fetcher
  );
  return (
    <Page loaded={characterInfo} error={error}>
      {characterInfo &&
        Object.keys(characterInfo).map((item, key) => {
          switch (item) {
            case "films":
              return (
                <div key={key}>
                  <h3>Films</h3>
                  <FilmList films={characterInfo[item]} />
                </div>
              );
            case "homeworld":
              return (
                <div key={key}>
                  <h3>Home World</h3>
                  <PlanetList planets={[characterInfo[item]]} />
                </div>
              );
            case "species":
              return (
                <div key={key}>
                  <h3>Species</h3>
                  <SpeciesList species={characterInfo[item]} />
                </div>
              );
            case "starships":
              return (
                <div key={key}>
                  <h3>Starships</h3>
                  <StarshipList starships={characterInfo[item]} />
                </div>
              );
            case "vehicles":
              return (
                <div key={key}>
                  <h3>Vehicles</h3>
                  <VehicleList vehicles={characterInfo[item]} />
                </div>
              );
            case "name":
              return (
                <h2 key={key} className="title">
                  {characterInfo[item]}
                </h2>
              );
            default:
              return (
                <div key={key}>
                  <h3>{formatTitle(item)}</h3>
                  <span>{characterInfo[item]}</span>
                </div>
              );
          }
        })}
    </Page>
  );
};

export default Character;
