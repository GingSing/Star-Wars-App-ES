import React from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { fetcher, getIdFromURL } from "../helpers";
import PropTypes from "prop-types";

const PlanetList = ({ planets }) => {
  return (
    <ul>
      {planets &&
        planets.map((planetURL, key) => (
          <PlanetItem key={key} planetURL={planetURL} />
        ))}
    </ul>
  );
};

const PlanetItem = ({ planetURL }) => {
  const history = useHistory();
  const { data: planetInfo } = useSWR(planetURL, fetcher);
  return (
    <li
      onClick={() =>
        planetInfo && history.push(`/planets/${getIdFromURL(planetInfo.url)}`)
      }
    >
      <span>{planetInfo ? planetInfo.name : "Skeleton"}</span>
    </li>
  );
};

PlanetList.propTypes = {
  planets: PropTypes.array,
};

PlanetItem.propTypes = {
  planetURL: PropTypes.string,
};

export default PlanetList;
