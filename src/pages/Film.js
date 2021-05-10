import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers";
import {
  CharacterList,
  VehicleList,
  StarshipList,
  SpeciesList,
  PlanetList,
  Page,
  LabeledComponent,
} from "../components";

const Film = () => {
  const { id } = useParams();
  const { data: filmInfo, error } = useSWR(`/films/${id}/`, fetcher);

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
                <LabeledComponent key={key} title={item}>
                  <CharacterList characters={filmInfo[item]} />
                </LabeledComponent>
              );

            case "planets":
              return (
                <LabeledComponent key={key} title={item}>
                  <PlanetList planets={filmInfo[item]} />
                </LabeledComponent>
              );

            case "starships":
              return (
                <LabeledComponent key={key} title={item}>
                  <StarshipList starships={filmInfo[item]} />
                </LabeledComponent>
              );

            case "vehicles":
              return (
                <LabeledComponent key={key} title={item}>
                  <VehicleList vehicles={filmInfo[item]} />
                </LabeledComponent>
              );

            case "species":
              return (
                <LabeledComponent key={key} title={item}>
                  <SpeciesList species={filmInfo[item]} />
                </LabeledComponent>
              );

            default:
              return (
                <LabeledComponent key={key} title={item}>
                  <span>{filmInfo[item]}</span>
                </LabeledComponent>
              );
          }
        })}
    </Page>
  );
};

export default Film;
