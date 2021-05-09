import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, formatTitle } from "../helpers";
import { CharacterList, PlanetList, FilmList, Page } from "../components";

const Species = () => {
  const { id } = useParams();
  const { data: speciesInfo, error } = useSWR(
    `https://swapi.dev/api/species/${id}/`,
    fetcher
  );
  return (
    <Page loaded={speciesInfo} error={error}>
      {speciesInfo &&
        Object.keys(speciesInfo).map((item, key) => {
          switch (item) {
            case "name":
              return <h2 className="title">{speciesInfo[item]}</h2>;
            case "homeworld":
              return (
                <div key={key}>
                  <h3>Home World</h3>
                  <PlanetList planets={[speciesInfo[item]]} />
                </div>
              );
            case "people":
              return (
                <div key={key}>
                  <h3>People</h3>
                  <CharacterList characters={speciesInfo[item]} />
                </div>
              );
            case "films":
              return (
                <div key={key}>
                  <h3>Films</h3>
                  <FilmList films={speciesInfo[item]} />
                </div>
              );
            default:
              return (
                <div key={key}>
                  <h3>{formatTitle(item)}</h3>
                  <span>{speciesInfo[item]}</span>
                </div>
              );
          }
        })}
    </Page>
  );
};

export default Species;
