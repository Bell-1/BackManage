<template>
	<v-app>
		<router-view/>
		<v-alert class="alertMsg" v-model="alertMsg.show" dismissible :type="alertMsg.type">
			{{alertMsg.content}}
		</v-alert>
	</v-app>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'App',
		data() {
			return {

			}
		},
		created() {
			this.$http.setThis(this);
			this.$store.dispatch('user/checkLogin').then(() => {
				this.$router.push('/Content')
			}).catch(() => {
				console.error('loginError')
			})
		},
		mounted() {
		},
		computed: {
			...mapState([
				'alertMsg'
			])
		},
		methods: {
			showAlert() {
				this.$store.dispatch('showAlert', {
					content: new Date().toString()
				})
			},
			
		},
	}
</script>