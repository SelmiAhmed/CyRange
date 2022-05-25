import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import axios from "axios";

import { faDesktop, faMobileAlt, faTabletAlt } from '@fortawesome/free-solid-svg-icons';

/*const [OneTraining, setTrainList] = useState([]);
const getTrainID = () => {
  axios.get(`http://localhost:8081/api/cours/stat/last`).then((response) => {
    setTrainList(response.data.IDCours);
});
  };*/
  //getTrainID();

const trafficShares = [
    { id: 1, label: "Desktop", value: "1", color: "secondary", icon: faDesktop },
    { id: 2, label: "Mobile Web", value: "2", color: "primary", icon: faMobileAlt },
    { id: 3, label: "Tablet Web", value: "3", color: "tertiary", icon: faTabletAlt }
];

const totalOrders = [
    { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
    { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" }
];

export {
    trafficShares,
    totalOrders
};