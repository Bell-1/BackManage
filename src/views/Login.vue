<template>
	<v-layout class="Login">
		<v-flex xs12 sm6>
			<v-card>
				<v-toolbar dark color="primary">
					<v-toolbar-title>登陆</v-toolbar-title>
				</v-toolbar>
				<v-card-text>
					<v-form v-model="valid">
						<v-text-field v-model="name" :rules="nameRules" :counter="32" label="用户名" required></v-text-field>
						<v-text-field v-model="pwd" type="password" :counter="32" :rules="pwdRules" label="密码" required></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn color="primary" @click="login">登陆</v-btn>
					<v-btn color="error" @click="reset">重置</v-btn>
					<v-btn color="orange">注册</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import { mapStates, mapMutations, mapActions } from 'vuex'
	export default {
		name: 'Login',
		data: () => ({
			valid: false,
			name: '15372999761',
			nameRules: [
				v => !!v || '用户名不能为空',
				v => v.length >= 3 && v.length <= 32 || '用户名长度为3-32字符'
			],
			pwd: '',
			pwdRules: [
				v => !!v || '密码不能为空',
				v => v.length >= 3 && v.length <= 32 || '密码长度为3-32字符'
			],
		}),

		methods: {
			...mapActions('user', []),
			login() {
				if (this.canLogin) {
					this.$store.dispatch('user/login', {
						name: this.name,
						pwd: this.pwd,
					}).then(() => {
						this.$store.dispatch('showAlert', {
							content: '登陆成功'
						})
						this.$router.push('/')
					})
				} else {
					this.$store.dispatch('showAlert', {
						content: '请正确填写信息'
					})
				}
			},
			reset(){
				this.name = '';
				this.pwd = '';
			}
		},

		computed: {
			canLogin: function() {
				return this.name.length >= 3 && this.name.length <= 32 && this.pwd.length >= 3 && this.pwd.length <= 32
			},
		}
	}
</script>