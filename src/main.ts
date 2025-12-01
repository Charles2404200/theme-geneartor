import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./style.css";
import "./theme.css";
import './device.css';
const app = createApp(App);

app.use(router);
app.mount("#app");
