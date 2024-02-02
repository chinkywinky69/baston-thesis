import { boot } from "quasar/wrappers";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";

export default boot(async ({ app }) => {
  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  });
});
