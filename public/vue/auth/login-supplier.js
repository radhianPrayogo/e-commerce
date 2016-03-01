new Vue({
	el: '#login',
	
	data(){
		return {
			credentials: {
				email: '',
				password: ''
			},
			error: ''
		}
	},
	ready: function(){
		clearCookies()
		this.checkAuth()
	},
	methods: {
		loginSupplier(){
			var credentials = {
				email: this.credentials.email,
				password: this.credentials.password
			}

			var remember = this.credentials.remember

			this.$http.post(LOGIN_URL, credentials, (data) => {
		      	// Redirect to a specified route
		      	if(data.status == 'success') {
		      		// Token disimpan di localStorage 'cookies'
		        	var expiredDays = 30
		        	setCookie('remember', remember, expiredDays)
		        	setCookie('amtekcommerce_token', data.token, expiredDays)
		        	setCookie('role', data.user.roles[0].slug, expiredDays)

		        	// routing bila data success login redirect ke home
		        	window.location.assign(SITE_URL + '/supplier/products')
		      	} else {
		          	// alert notifikasi failed login
		          	this.status = data.status
		          	this.error = data.message
		          	console.log(data)
		      	}

	    	}).error((err) => {
	      		this.error = err
	    	})
		},
		removeAlert(){

		},
		checkAuth(){
			var token = getCookie('amtekcommerce_token')
			if(token !== ''){
				window.location.assign(SITE_URL + '/supplier/products')
			} else {
				console.log(token)
			}
		},
		getAuthHeader() {
			return {
				'Authorization': 'Bearer' + getCookie('amtekcommerce_token')
			}
		}
	}
})