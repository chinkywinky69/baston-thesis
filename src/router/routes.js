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
    component: () => import("layouts/WelcomePageLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/WelcomePage.vue"),
      },
    ],
  },

  {
    path: "/team",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreateTeamPage.vue") },
      {
        name: "viewTeam",
        path: "view/:id",
        component: () => import("pages/viewTeamPage.vue"),
      },
      {
        name: "EditTeam",
        path: "/editTeam/:id",
        component: () => import("pages/EditTeamPage.vue"),
      },
    ],
  },

  {
    path: "/tournament",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ExistingTournamentsPage.vue"),
      },
      {
        path: "/createTournament",
        component: () => import("pages/TournamentPage.vue"),
      },
      {
        path: "/matches/:id",
        component: () => import("pages/MatchesPage.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/matches/LabananPage.vue"),
          },
          {
            path: "anyo",
            component: () => import("pages/matches/AnyoPage.vue"),
          },
        ],
      },
      {
        path: "/chooseTournamentType/:id",
        component: () => import("pages/ChooseTournamentTypePage.vue"),
      },
      {
        path: "/selectPlayers",
        component: () => import("pages/SelectPlayersPage.vue"),
      },
      {
        name: "labanan",
        path: "/chooseMatchLabanan/:matchType",
        component: () => import("pages/ChooseMatchLabananPage.vue"),
      },
      {
        name: "anyo",
        path: "/chooseMatchAnyo/:matchType",
        component: () => import("pages/ChooseMatchAnyoPage.vue"),
      },
      {
        name: "choose-anyo-team",
        path: "/chooseMatchAnyo/:anyoType",
        component: () => import("pages/ChooseTeamAnyoPage.vue"),
      },
      {
        path: "/anyo-scoring/:id",
        component: () => import("pages/AnyoScoringPage.vue"),
      },
      {
        name: "bracketPage",
        path: "/bracketPage",
        component: () => import("pages/BracketPage.vue"),
      },
      {
        name: "scoringPage",
        path: "/labanan-scoring/:matchId",
        component: () => import("pages/LabananScoringPage.vue"),
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
    path: "/matchHistory",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "matchHistoryPage",
        path: "",
        component: () => import("pages/MatchHistoryPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
