import Vue from "vue";
import Router from "vue-router";

const Home = () => import("./views/Home/Home.vue");
const SensorList = () => import("./views/Home/SensorList.vue");
const AddSensor = () => import("./views/Home/AddSensor.vue");
const SimSensor = () => import("./views/Home/SimSensor.vue");
const WarnLogs = () => import("./views/Home/WarnLogs.vue");
const ControlLogs = () => import("./views/Home/ControlLogs.vue");
const ControlSensor = () => import("./views/Home/ControlSensor.vue");
const UserManagement = () => import("./views/Home/UserManagement.vue");
const VisualSensor = () => import("./views/Home/VisualSensor.vue");


// import Home from './views/Home/Home.vue'
// import SensorList from './views/Home/SensorList.vue'
// import AddSensor from './views/Home/AddSensor.vue'
// import SimSensor from './views/Home/SimSensor.vue'
// import WarnLogs from './views/Home/WarnLogs.vue'
// import ControlLogs from './views/Home/ControlLogs.vue'
// import ControlSensor from './views/Home/ControlSensor.vue';
// import UserManagement from './views/Home/UserManagement.vue';
// import VisualSensor from './views/Home/VisualSensor.vue';

// import Login from './views/Login/Login.vue'
// import Registered from './views/Login/Registered.vue'

const Login = () => import("./views/Login/Login.vue");
const Registered = () => import("./views/Login/Registered.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  // mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/registered", component: Registered },
    {
      path: "/home",
      name: "home",
      component: Home,
      redirect: "/sensorList",
      children: [
        {
          path: "/sensorList",
          component: SensorList,
        },
        {
          path: "/addSensor",
          component: AddSensor,
        },
        {
          path: "/simSensor",
          component: SimSensor,
        },
        {
          path: "/warnLogs",
          component: WarnLogs,
        },
        {
          path: "/controlLogs",
          component: ControlLogs,
        },
        {
          path: "/controlSensor",
          component: ControlSensor,
        },
        {
          path: "/UserManagement",
          component: UserManagement,
        },
        {
          path: "/VisualSensor",
          component: VisualSensor,
        },
      ],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") return next();
//   const username = window.sessionStorage.getItem("username");
//   // console.log(to.path);
//   if (!username) return next("/login");
//   // 登录成功（已获取到username）
//   next();
// });

export default router;
