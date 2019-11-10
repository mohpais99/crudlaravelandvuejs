
require('./bootstrap');
 
import Vue from 'vue';
import VueRouter from 'vue-router';        
Vue.use(VueRouter);
        
        
import HomeComponent from './components/HomeComponent.vue';
import CreateComponent from './components/CreateComponent.vue';
import EditComponent from './components/EditComponent.vue';
        
const routes = [
    {
        name: 'home',
        path: '/',
        component: HomeComponent
    },
    {
        name: 'create',
        path: '/create',
        component: CreateComponent
    },
    {
        name: 'edit',
        path: '/edit/:id',
        component: EditComponent
    },
];

const router = new VueRouter({ 
    mode: 'history',
    routes: routes,
});

const app = new Vue({
    el: '#app',
    router,
});
