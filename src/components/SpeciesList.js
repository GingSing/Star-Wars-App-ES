import React from "react";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetcher, getIdFromURL } from "../helpers";
import PropTypes from "prop-types";

const SpeciesList = ({ species }) => {
  return (
    <ul>
      {species &&
        species.map((speciesURL, key) => (
          <SpeciesItem key={key} speciesURL={speciesURL} />
        ))}
    </ul>
  );
};

const SpeciesItem = ({ speciesURL }) => {
  const history = useHistory();
  const { data: speciesInfo } = useSWR(speciesURL, fetcher);
  return (
    <li
      className="clickable"
      onClick={() =>
        speciesInfo && history.push(`/species/${getIdFromURL(speciesInfo.url)}`)
      }
    >
      <span>{speciesInfo ? speciesInfo.name : "Skeleton"}</span>
    </li>
  );
};

SpeciesList.propTypes = {
  species: PropTypes.array,
};

SpeciesItem.propTypes = {
  speciesURL: PropTypes.string,
};

export default SpeciesList;
