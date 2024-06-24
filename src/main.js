import "./scss/app.scss";
import App from "./svelte/App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
