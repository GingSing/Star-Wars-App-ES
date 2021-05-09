import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers";
import { CharacterList, FilmList, LabeledComponent, Page } from "../components";

const Starship = () => {
  const { id } = useParams();
  const { data: starshipInfo, error } = useSWR(`/starships/${id}/`, fetcher);

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
                <LabeledComponent key={key} title={item}>
                  <FilmList films={starshipInfo[item]} />
                </LabeledComponent>
              );

            case "pilots":
              return (
                <LabeledComponent key={key} title={item}>
                  <CharacterList characters={starshipInfo[item]} />
                </LabeledComponent>
              );

            default:
              return (
                <LabeledComponent key={key} title={item}>
                  <span>{starshipInfo[item]}</span>
                </LabeledComponent>
              );
          }
        })}
    </Page>
  );
};

export default Starship;
