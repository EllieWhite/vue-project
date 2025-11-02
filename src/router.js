import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";
import ContactsView from "./pages/ContactsView.vue";
import ProductView from "./pages/ProductView.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
    { path: "/:pathMatch(.*)*", name: 'name', component: NotFound},
    { path: "/", component: HomeView, alias: "/home" },
    { path: "/contacts", component: ContactsView },
    { path: "/c", redirect: "/contacts"},
    { path: "/product/:id", component: ProductView },
]

export default createRouter ({
    history: createWebHistory(),
    routes,
})