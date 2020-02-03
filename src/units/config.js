const config = {
	ENV: 'dev', // 'dev' 'prod'
	phoneReg: /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9]))\d{8}$/,
	debug: true,
	api_version: 1.0,
	img: {
		icons: {
			clear: '../../../img/icons/clear.png',
		}
	},
}
module.exports = config;