
import { faDesktop, faMobileAlt, faTabletAlt } from '@fortawesome/free-solid-svg-icons';

const trafficShares = [
    { id: 1, label: "Cours Completes", value: 60, color: "tertiary", icon: faDesktop },
    { id: 2, label: "Cours Non Inscrits ", value: 30, color: "warning", icon: faMobileAlt },
    { id: 3, label: "Cours Non Completes", value: 10, color: "quaternary", icon: faTabletAlt }
];

const totalOrders = [
    { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
    { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" }
];

export {
    trafficShares,
    totalOrders
};