/**
 * Created by afidoss on 17/12/16.
 */
'use strict';

import auth from 'auth';

const Vue = require('vue');
const VueRouter = require('vue-router');
const _ = require('underscore');
const Login = require("./components/default/login.vue");
const Dashboard = require("./components/default/dashboard.vue");
//const localStorage = require('localStorage');

/*var Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite' ,//|'mysql' | 'mariadb' | 'postgres' | 'mssql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    storage: 'database.sqlite'
});

const User = sequelize.define('user', {
    nom: {
        type: Sequelize.STRING,
        field: 'nom' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    prenom: {
        type: Sequelize.STRING,
        field: 'prenom'
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        length: 100
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
    // Table created
    return User.create({
        nom: 'AYEDOUN',
        prenom: 'Fiacre',
        username: 'afidoss',
        password: 'dossoustar'
    });
});

*/
Vue.use(VueRouter);

function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', name: 'login', component: Login },
        { path: '/login', name: '_login', component: Login },
        { path: '/dashboard', name: 'dashboard', component: Dashboard/*,beforeEnter: requireAuth*/ },
    ]
});


new Vue({
    router
}).$mount('#app');


