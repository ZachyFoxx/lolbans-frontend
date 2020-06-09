import Vue from 'vue';
import Router from 'vue-router';

import MainIndex from './views/MainIndex.vue';
import Login from './views/user/Login.vue';
import NotFound from './components/NotFound.vue';
import test from './components/test.vue';
import bans from './views/punishments/offences/Bans.vue';
import mutes from './views/punishments/offences/Mutes.vue';
import PunishDetails from './views/punishments/PunishDetails.vue';
import User from './views/user/UserDetails.vue';

import Dash from './views/dashboard/dashboard.vue';
import Settings from './views/dashboard/settings/Personal.vue';
import Billing from './views/dashboard/settings/Billing.vue';
import DashAnalytics from './views/dashboard/punishments/Analytics.vue';
import DashAppeals from './views/dashboard/punishments/Appeals.vue';
import DashOffences from './views/dashboard/punishments/Offences.vue';
import DashReports from './views/dashboard/punishments/Reports.vue';

import Admin from './views/admin/Panel.vue';
import AdminSettings from './views/admin/settings/Settings.vue';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: MainIndex
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/getting-started',
            name: 'getting-started',
            component: Login
        },
        {
            path: '*',
            name: 'not-found',
            component: NotFound,
        },
        {
            path: '/punishments/details/:punishmentid',
            name: 'PunishDetails',
            component: PunishDetails//, props: truer

        },
        {
            path: '/user/:uuid',
            name: 'user',
            component: User, props: true
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dash,
            children: [
                {
                    path: '/dashboard/account/personal',
                    name: 'settings',
                    component: Settings
                },
                {
                    path: '/dashboard/account/billing',
                    name: 'settings',
                    component: Billing
                },
                {
                    path: '/dashboard/punishments/analytics',
                    name: 'dashanalytics',
                    component: DashAnalytics
                },
                {
                    path: '/dashboard/punishments/appeals',
                    name: 'dashappeals',
                    component: DashAppeals
                },
                {
                    path: '/dashboard/punishments/offences',
                    name: 'dashoffences',
                    component: DashOffences
                },
                {
                    path: '/dashboard/punishments/reports',
                    name: 'dashreports',
                    component: DashReports
                },
            ]
        },
        {
            path: '/admin',
            name: 'adminpanel',
            component: Admin,
            children: [
                {
                    path: '/admin/settings',
                    name: 'adminsettings',
                    component: AdminSettings
                },
            ]
        },
        {
            path: '/test',
            name: 'test',
            component: test,
        },
        {
            path: '/punishments/bans',
            name: 'bans',
            component: bans,
        },
        {
            path: '/punishments',
            name: 'bans',
            component: bans,
        },
        {
            path: '/punishments/mutes',
            name: 'mutes',
            component: mutes,
        },
    ],linkActiveClass: 'is-active'
});

export default router;
