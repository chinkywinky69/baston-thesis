const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requireAuth: true,
    },
    children: [
      { path: "", component: () => import("pages/MemberInformationPage.vue") },
    ],
  },

  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "Login Page",
        component: () => import("pages/AuthPage.vue"),
      },
    ],
  },

  {
    path: "/welcomePage",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/WelcomePage.vue"),
      },
    ],
  },

  {
    path: "/createTeam",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreateTeamPage.vue") },
      {
        name: "viewTeam",
        path: "viewTeam",
        component: () => import("pages/viewTeamPage.vue"),
      },
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
      {
        name: "chooseMatch",
        path: "/chooseMatchLabanan/:matchType",
        component: () => import("pages/ChooseMatchLabananPage.vue"),
      },
      {
        name: "matchPage",
        path: "/matchPage",
        component: () => import("pages/MatchPage.vue"),
      },
    ],
  },

  {
    path: "/matchlist",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "matchPage",
        path: "",
        component: () => import("pages/MatchPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
