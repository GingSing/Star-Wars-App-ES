import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers";
import { CharacterList, FilmList, LabeledComponent, Page } from "../components";

const Planet = () => {
  const { id } = useParams();
  const { data: planetInfo, error } = useSWR(`/planets/${id}/`, fetcher);
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
                <LabeledComponent key={key} title={item}>
                  <FilmList films={planetInfo[item]} />
                </LabeledComponent>
              );
            case "residents":
              return (
                <LabeledComponent key={key} title={item}>
                  <CharacterList characters={planetInfo[item]} />
                </LabeledComponent>
              );
            default:
              return (
                <LabeledComponent key={key} title={item}>
                  <span>{planetInfo[item]}</span>
                </LabeledComponent>
              );
          }
        })}
    </Page>
  );
};

export default Planet;
