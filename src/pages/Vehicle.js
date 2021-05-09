import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers";
import { CharacterList, FilmList, Page, LabeledComponent } from "../components";

const Vehicle = () => {
  const { id } = useParams();
  const { data: vehicleInfo, error } = useSWR(`/vehicles/${id}/`, fetcher);
  return (
    <Page loaded={vehicleInfo} error={error}>
      {vehicleInfo &&
        Object.keys(vehicleInfo).map((item, key) => {
          switch (item) {
            case "name":
              return (
                <h2 key={key} className="title">
                  {vehicleInfo[item]}
                </h2>
              );

            case "films":
              return (
                <LabeledComponent key={key} title={item}>
                  <FilmList films={vehicleInfo[item]} />
                </LabeledComponent>
              );
            case "pilots":
              return (
                <LabeledComponent key={key} title={item}>
                  <CharacterList characters={vehicleInfo[item]} />
                </LabeledComponent>
              );
            default:
              return (
                <LabeledComponent key={key} title={item}>
                  <span>{vehicleInfo[item]}</span>
                </LabeledComponent>
              );
          }
        })}
    </Page>
  );
};

export default Vehicle;
