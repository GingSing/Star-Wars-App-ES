import React from "react";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetcher, getIdFromURL } from "../helpers";
import PropTypes from "prop-types";

const VehicleList = ({ vehicles }) => {
  return (
    <ul>
      {vehicles &&
        vehicles.map((vehicleURL, key) => (
          <VehicleItem key={key} vehicleURL={vehicleURL} />
        ))}
    </ul>
  );
};

const VehicleItem = ({ vehicleURL }) => {
  const history = useHistory();
  const { data: vehicleInfo } = useSWR(vehicleURL, fetcher);
  return (
    <li
      className="clickable"
      onClick={() =>
        vehicleInfo &&
        history.push(`/vehicles/${getIdFromURL(vehicleInfo.url)}`)
      }
    >
      <span>{vehicleInfo ? vehicleInfo.name : "Skeleton"}</span>
    </li>
  );
};

VehicleList.propTypes = {
  vehicles: PropTypes.array,
};

VehicleItem.propTypes = {
  vehicleURL: PropTypes.string,
};

export default VehicleList;
