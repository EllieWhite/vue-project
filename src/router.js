import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "./pages/DashboardView.vue";
// import NotFoundView from "./pages/NotFoundView.vue";
// import TasksView from "./pages/TasksView.vue";
// import SettingsView from "./pages/SettingsView.vue";
// import TaskDetailsView from "./pages/TaskDetailsView.vue";
// import ProfileView from "./pages/ProfileView.vue";
// import SecurityView from "./pages/SecurityView.vue";

const routes = [
    { path: "/:pathMatch(.*)*", name: 'name', component: () => import("./pages/NotFoundView.vue")},
    { path: "/dashboard", component: DashboardView },
    { path: "/", redirect: "/dashboard"},
    { path: "/tasks", component: () => import("./pages/TasksView.vue") },
    { path: "/tasks/:id", component: () => import("./pages/TaskDetailsView.vue"), props: true},
    { 
        path: "/settings", 
        name: 'Settings',
        redirect: "/settings/profile",
        component: () => import("./pages/SettingsView.vue"),
        children: [
            {
                path: 'profile',
                name: 'profile',
                component: () => import("./pages/ProfileView.vue"),
            },
            {
                path: 'security',
                name: 'security',
                component: () => import("./pages/SecurityView.vue"),
            }
        ]
    }

]



export default createRouter ({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'router-link--active',
    linkExactActiveClass: 'router-link--intermediate',
})