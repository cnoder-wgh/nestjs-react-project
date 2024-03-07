
import axios, { AxiosResponse } from 'axios'
import { getToken } from './token'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['Content-Type'] = 'application/json'
const service = axios.create({
	baseURL: '/',
	// timeout: 15000,x
	withCredentials: false,
})
const err = (error: any) => {
	return Promise.reject(error)
}
service.interceptors.request.use(
	(config: any) => {
		const Authorization = getToken()
		if (Authorization) {
			config.headers['Authorization'] = Authorization
		}
		let url: string = config.url || ''
		if (config.method?.toLocaleUpperCase() === 'GET') {
			const _t: string = new Date() + ''
			url += `?_t=${Date.parse(_t) / 1000}&`
		}
		if (config.params) {
			let keys = Object.keys(config.params)
			const lastKeys: string[] = [];
			for (let i = 0; i < keys.length; i++) {
				const key: string = keys[i];
				if (config.params[key] !== undefined) {
					lastKeys.push(key);
				}
			}
			//POST请求增加前缀				
			if (config.method?.toLocaleUpperCase() !== 'GET' && lastKeys.length > 0) {
				url += '?'
			}
			for (let key of lastKeys) {
				url += `${key}=${encodeURIComponent(config.params[key])}&`
			}
			url = url.substring(0, url.length - 1)
			config.params = {}
			config.url = url
		}
		return config
	},
	(error: any) => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use((response: AxiosResponse) => {
	if (response.data.code === 200) {
		return response.data
	} 
}, err)
export default service
