import {
  PairList,
  PairOne,
  PairTwo
} from "./screens";

const routes = [
  {
    key: "Pair List",
    exact: true,
    path: "/",
    component: PairList,
  },
  {
    key: "Pair One",
    exact: true,
    path: "/ACOM-AGOV/ETH",
    component: PairOne,
  },
  {
    key: "Pair Two",
    exact: true,
    path: "/ACOM-AGOV/BNB",
    component: PairTwo,
  }
];

export default routes;
