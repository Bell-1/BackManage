<template>
	<div class="content">
		<!--左侧导航-->
		<v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
			<v-list>
				<v-list-group v-for="item in sideMenu" v-model="item.active" :key="item.title" :prepend-icon="item.action" no-action>
					<v-list-tile slot="activator">
						<v-list-tile-action>
							<v-icon v-if="item.icon" color="pink">{{item.icon}}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{ item.title }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile v-for="subItem in item.sub" :key="subItem.title" @click="viewPages(subItem)">
						<v-list-tile-action>
							<v-icon v-if="subItem.icon" color="pink">{{subItem.icon}}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
						</v-list-tile-content>

						<v-list-tile-action>
							<v-icon>{{ subItem.action }}</v-icon>
						</v-list-tile-action>
					</v-list-tile>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>
		<!--头部导航-->
		<v-toolbar app :clipped-left="clipped">
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-btn icon @click.stop="miniVariant = !miniVariant">
				<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
			</v-btn>
			<v-btn icon @click.stop="clipped = !clipped">
				<v-icon>web</v-icon>
			</v-btn>
			<v-btn icon @click.stop="fixed = !fixed">
				<v-icon>web</v-icon>
			</v-btn>
			<v-toolbar-title v-text="title"></v-toolbar-title>
			<v-spacer></v-spacer>
			<v-menu offset-y>
				<v-btn slot="activator" color="primary" dark>
					{{!userInfo || userInfo.name}}
				</v-btn>
				<v-list>
					<v-list-tile v-for="(item, index) in userMenu" :key="index" @click="">
						<v-list-tile-title @click="checkUserMenu(item)">{{ item.title }}</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
			<v-btn icon @click.stop="rightDrawer = !rightDrawer">
				<v-icon>menu</v-icon>
			</v-btn>
		</v-toolbar>
		<!--中间主容器-->
		<v-content>
			<router-view/>
		</v-content>
		<v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
			<v-list>
				<v-list-tile @click="right = !right">
					<v-list-tile-action>
						<v-icon>compare_arrows</v-icon>
					</v-list-tile-action>
					<v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-footer :fixed="fixed" app>
			<span>&copy; 2017</span>
		</v-footer>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from 'vuex'
	export default {
		name: 'Content',
		data() {
			return {
				clipped: false,
				drawer: true,
				fixed: false,
				items: [{
					icon: 'bubble_chart',
					title: 'Inspire'
				}],
				miniVariant: false,
				right: true,
				rightDrawer: false,
				title: 'Vuetify.js',
				sideMenu: [{
					title: '列表1',
					icon: 'home',
					sub: [{
						title: '子列表1',
						icon: 'home',
						handle: '/About'
					}]
				}],
				userMenu: 　[{
					title: '退出登陆',
					handle: 'logout'
				}]
			}
		},
		computed: {
			...mapState('user', [
				'userInfo'
			])
		},
		methods: {
			checkUserMenu(item) {
				switch (item.handle) {
					case 'logout':
						this.logout();
						break;
					default:
						break;
				}
			},
			logout() {
				this.$store.dispatch('user/logout').then(() => {
					this.$store.dispatch('showAlert', {
						content: '退出成功',
					})
					this.$router.push('/Login')
				})
			},
			viewPages(item){
				if (item.handle) {
					this.$router.push(item.handle);
				}	
			},
		}
	}
</script>

<style>

</style>