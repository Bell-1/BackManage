import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('./views/Login');
const Content = () => import('./views/Content');
const Home = () => import('./views/Content/Home');
const About = () => import('./views/Content/About');

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: "/Content",
		component: Content,
		children: [{
				path: "",
				component: Home
			},
			{
				path: "Home",
				component: Home
			},
			{
				path: "About",
				component: About
			}
		]
	}, {
		path: '/Login',
		name: 'Login',
		component: Login
	}]
})