import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers";
import {
  PlanetList,
  StarshipList,
  SpeciesList,
  FilmList,
  VehicleList,
  Page,
  LabeledComponent,
} from "../components";

const Character = () => {
  const { id } = useParams();
  const { data: characterInfo, error } = useSWR(`/people/${id}/`, fetcher);

  return (
    <Page loaded={characterInfo} error={error}>
      {characterInfo &&
        Object.keys(characterInfo).map((item, key) => {
          switch (item) {
            case "name":
              return (
                <h2 key={key} className="title">
                  {characterInfo[item]}
                </h2>
              );

            case "films":
              return (
                <LabeledComponent key={key} title={item}>
                  <FilmList films={characterInfo[item]} />
                </LabeledComponent>
              );

            case "homeworld":
              return (
                <LabeledComponent key={key} title={item}>
                  <PlanetList planets={[characterInfo[item]]} />
                </LabeledComponent>
              );

            case "species":
              return (
                <LabeledComponent key={key} title={item}>
                  <SpeciesList species={characterInfo[item]} />
                </LabeledComponent>
              );

            case "starships":
              return (
                <LabeledComponent key={key} title={item}>
                  <StarshipList starships={characterInfo[item]} />
                </LabeledComponent>
              );

            case "vehicles":
              return (
                <LabeledComponent key={key} title={item}>
                  <VehicleList vehicles={characterInfo[item]} />
                </LabeledComponent>
              );

            default:
              return (
                <LabeledComponent key={key} title={item}>
                  <span>{characterInfo[item]}</span>
                </LabeledComponent>
              );
          }
        })}
    </Page>
  );
};

export default Character;
