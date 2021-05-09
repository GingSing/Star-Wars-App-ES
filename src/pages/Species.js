import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers";
import {
  CharacterList,
  PlanetList,
  FilmList,
  Page,
  LabeledComponent,
} from "../components";

const Species = () => {
  const { id } = useParams();
  const { data: speciesInfo, error } = useSWR(`/species/${id}/`, fetcher);

  return (
    <Page loaded={speciesInfo} error={error}>
      {speciesInfo &&
        Object.keys(speciesInfo).map((item, key) => {
          switch (item) {
            case "name":
              return <h2 className="title">{speciesInfo[item]}</h2>;

            case "homeworld":
              return (
                <LabeledComponent key={key} title={item}>
                  <PlanetList planets={[speciesInfo[item]]} />
                </LabeledComponent>
              );

            case "people":
              return (
                <LabeledComponent key={key} title={item}>
                  <CharacterList characters={speciesInfo[item]} />
                </LabeledComponent>
              );

            case "films":
              return (
                <LabeledComponent key={key} title={item}>
                  <FilmList films={speciesInfo[item]} />
                </LabeledComponent>
              );

            default:
              return (
                <LabeledComponent key={key} title={item}>
                  <span>{speciesInfo[item]}</span>
                </LabeledComponent>
              );
          }
        })}
    </Page>
  );
};

export default Species;
