import VueRouter from 'vue-router';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import CreateUpdateToDo from '../components/CreateUpdateToDo';
import Cookie from "js-cookie";
import Vue from 'vue';

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
		meta: {
			public: true,  // Allow access to even if not logged in
			onlyWhenLoggedOut: true,
			title: 'ToDo | Assessment'
        }
    }, {
        path: '/register',
        name: 'register',
        component: Register,
		meta: {
			public: true,  // Allow access to even if not logged in
			onlyWhenLoggedOut: true,
			title: 'Register | Assessment'
        }
    }, {
        path: '/login',
        name: 'login',
        component: Login,
		meta: {
			public: true,  // Allow access to even if not logged in
			onlyWhenLoggedOut: true,
			title: 'Login | Assessment'
        }
    }, {
        path: '/createUpdateToDo',
        name: 'createUpdateToDo',
        component: CreateUpdateToDo,
		props: (route) => ({
			...route.params
		}),
		meta: { title: 'CreateUpdateToDo | Assessment' }
    }]
});

router.beforeEach((to, from, next) => {
	const isPublic = to.matched.some(record => record.meta.public)
    // const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
	let loggedIn = false;
	let res = Cookie.get('token');
	if(res) loggedIn = true;
	if (!isPublic && !loggedIn) {
		return next({
			path: '/',
			query: { redirect: to.fullPath }  // Store the full path to redirect the user to after login
		});
	}
	// Do not allow user to visit login page or register page if they are logged in
	// if (loggedIn && onlyWhenLoggedOut) {
	// 	return next('/');
	// }
	next();
});

router.afterEach((to) => {
	Vue.nextTick(() => {
		document.title = to.meta.title || 'Assessment';
	});
});
export default router;