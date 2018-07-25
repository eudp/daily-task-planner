import axios from 'axios';

const post = (url = '', data = '') => {
	return axios.post(url, data);
}

const get = (url = '', config = {}) => {
	return axios.get(url, config);
}

const put = (url = '', data = '') => {
	return axios.put(url, data);
}

const del = (url = '', config = {}) => {
	return axios.delete(url, config);
}

const HttpClient = { post, get, put, delete: del }

export default HttpClient;
