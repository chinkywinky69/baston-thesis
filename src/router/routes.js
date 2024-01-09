const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/MemberInformationPage.vue") },
    ],
  },

  {
    path: "/createTeam",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreateTeamPage.vue") },
    ],
  },

  {
    path: "/tournament",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/TournamentPage.vue") },
      {
        path: "/selectPlayers",
        component: () => import("pages/SelectPlayersPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
