import {
  Pairs,
  ETHPair,
  BNBPair
} from "./screens";

const routes = [
  {
    key: "Pairs",
    exact: true,
    path: "/ACOM-AGOV/pairs",
    component: Pairs,
  },
  {
    key: "ETHPair",
    exact: true,
    path: "/ACOM-AGOV/ETH",
    component: ETHPair,
  },
  {
    key: "BNBPair",
    exact: true,
    path: "/ACOM-AGOV/BNB",
    component: BNBPair,
  }
];

export default routes;
