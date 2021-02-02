import {
  Pairs,
  ETHPair,
  BNBPair
} from "./screens";

const routes = [
  {
    key: "Pairs",
    exact: true,
    path: "/pairs",
    component: Pairs,
  },
  {
    key: "ETHPair",
    exact: true,
    path: "/acom-agov/eth",
    component: ETHPair,
  },
  {
    key: "BNBPair",
    exact: true,
    path: "/acom-agov/bnb",
    component: BNBPair,
  }
];

export default routes;
