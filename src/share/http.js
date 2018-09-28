import config from './config.js'
class Http {
	constructor(arg) {
		this.app = undefined;
		this.baseURL = 'http://server2:2222/'; //本地服务器
		this.baseURL = config.ENV === 'dev' ? 'https://test-wxsmall.freefitbar.com/' : 'https://wxsmall.freefitbar.com'; //服务器地址
		this.apiList = {
			phoneLogin: this.genApi('POST', 'fitns-wxpublic/login'), //登陆
			getSmsCode: this.genApi('POST', 'fitns-wxpublic/sendSms'), //获取验证码
			equipmentTypeByCategory: this.genApi('GET', 'fitns-wxpublic/api/wx/equipmentTypeByCategory'), //获取使用说明时的设备类型
			equipmentType: this.genApi('GET', 'fitns-wxpublic/api/wx/equipmentType'), //获取报修时的家用/商用设备类型
			MerchantsJoin: this.genApi('POST', 'fitns-wxpublic/api/wx/MerchantsJoin'), //加盟
			getInstruction: this.genApi('POST', 'fitns-wxpublic/api/wx/getPath'), //获取使用说明
			agencyDelivery: this.genApi('POST', 'fitns-wxpublic/delicery/agencyDelivery'), //代理商发货信息
			repairBill: this.genApi('POST', 'fitns-wxpublic/api/wx/repairBill'), //提交家庭设备保修单
			queryName: this.genApi('POST', 'fitns-wxpublic/api/wx/queryName'), //查询手机号的机主（家庭维修）
			queryShopName: this.genApi('POST', 'fitns-wxpublic/api/wx/queryShopName'), //查询手机好的机主（商用维修）
		} //接口列表
	}

	setThis(self) {
		this.app = self;
	}

	getBaseURL() {
		return this.baseURL;
	}

	/**
	 * 整理api接口
	 */
	genApi(method = 'POST', _url = '') {
		return {
			method: method.toUpperCase(),
			_url: this.baseURL + _url,
		}
	}

	/**
	 * 获取api
	 */
	getApiName(apiName) {
		if (apiName && this.apiList[apiName]) {
			return this.apiList[apiName];
		} else {
			console.error('apiName:' + apiName + 'is not found!')
			return false;
		}
	}

	/**
	 * 请求查询
	 * @param {String} apiName 接口名称定义在apiList
	 * @param {Object} dataToSend 传送数据
	 * @param {String} param get参数
	 */
	request(apiName = "", dataToSend = {}, { param = '', type = 2 } = { type: 2, param: '' }) {
		let api = this.getApiName(apiName),
			header = {
				token: wx.getStorageSync('compayToken')
			};
		if (+type === 2) {
			header["content-type"] = 'application/x-www-form-urlencoded';
		}
		return new Promise((resolve, reject) => {
			if (api) {
				wx.request({
					url: api._url + param,
					method: api.method.toUpperCase(),
					dataType: 'JSON',
					data: dataToSend,
					header: header,
					success(res) {
						let statusCode = res.statusCode,
							data;
						if (statusCode === 200) {
							try {
								data = JSON.parse(res.data);
							} catch (e) {
								wx.showModal({
									title: 'error',
									content: 'not json format!',
									showCancel: false
								})
								wx.hideLoading();
								reject()
								return
							}

							if (+data.code === 200) {
								if (config.debug) {
									console.log('api:', apiName)
									console.log('dataToSend:', dataToSend)
									console.log('data:', data)
								}
								resolve(data.data);
							} else {
								wx.hideLoading();
								if (config.debug) {
									console.warn('api:', apiName)
									console.warn('dataToSend:', dataToSend)
									console.warn('data:', data)
								}
								switch (data.code) {
									default:
										// 提示错误信息
										break;
								}
								reject(data);
							}
						} else {
							wx.hideLoading();
							if (statusCode === 500) {}
							reject();
						}
					},
					fail(res) {
						let data = res.data;
						wx.hideLoading();
						console.error('接口请求失败！', res);
						reject();
					}

				})
			} else {
				reject();
			}
		})

	}
	downLoad(apiName = "", dataToSend = {}, param = '') {
		let api = this.getApiName(apiName),
			formData = new FormData();
		for (let k in dataToSend) {
			formData.append(k, dataToSend[k]);
		}
		return new Promise((resolve, reject) => {
			if (api) {
				axios.request({
					headers: {
						token: localStorage.getItem('tokenBack'),
						login: '1'
					},
					method: api.method,
					url: api._url + param,
					data: dataToSend,
					responseType: 'blob',
					baseURL: this.baseURL,
				}).then((res) => {
					let url = window.URL.createObjectURL(res.data)
					let a = document.createElement('a')
					a.style.display = 'none'
					a.href = url
					a.setAttribute('download', 'excel.xls')
					document.body.appendChild(a)
					a.click()
					document.body.removeChild(a)
					resolve();
				}).catch((res) => {
					console.error('fail', res)
				})
			} else {
				reject();
			}
		})
	}

	/* 下载方法 */
	downFile(blob, fileName) {
		if (window.navigator.msSaveOrOpenBlob) {
			navigator.msSaveBlob(blob, fileName);
		} else {
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = fileName;
			link.click();
			window.URL.revokeObjectURL(link.href);
		}
	}

}

export default new Http();