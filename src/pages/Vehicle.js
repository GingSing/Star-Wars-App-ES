import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, formatTitle } from "../helpers";
import { CharacterList, FilmList, Page } from "../components";

const Vehicle = () => {
  const { id } = useParams();
  const { data: vehicleInfo, error } = useSWR(
    `https://swapi.dev/api/vehicles/${id}/`,
    fetcher
  );
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
                <div key={key}>
                  <h3>Films</h3>
                  <FilmList films={vehicleInfo[item]} />
                </div>
              );
            case "pilots":
              return (
                <div key={key}>
                  <h3>Residents</h3>
                  <CharacterList characters={vehicleInfo[item]} />
                </div>
              );
            default:
              return (
                <div key={key}>
                  <h3>{formatTitle(item)}</h3>
                  <span>{vehicleInfo[item]}</span>
                </div>
              );
          }
        })}
    </Page>
  );
};

export default Vehicle;
