import HttpClient from './httpClient';
import { API } from './api';

const AUTH_API = `${API}/auth`;

const USER_API = `${API}/users`;

// Auth API

const createSession = user => {
	return HttpClient.post(AUTH_API, user);
}

const removeSession = () => {
	return HttpClient.delete(AUTH_API);
}

const getSession = params => {
	return HttpClient.get(AUTH_API);
}

// User API

const createUser = user => {
	return HttpClient.post(USER_API, user);
}

export const AuthApi = { createSession, removeSession, getSession };

export const UserApi = { createUser }