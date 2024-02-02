import { boot } from "quasar/wrappers";
import { getCurrentUser } from "vuefire";

export default boot(async ({ router }) => {
  router.beforeEach(async (to, from) => {
    const currentUser = await getCurrentUser();

    if (to.meta.requireAuth && !currentUser) {
      return {
        path: "/auth",
      };
    }

    if (to.name == "Login Page" && currentUser) {
      return {
        path: "/",
      };
    }
  });
});
