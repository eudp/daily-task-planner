import HttpClient from './httpClient';

const API = 'http://localhost:3000/api';

const TASK_API = `${API}/task`;

const createTask = task => {
	return HttpClient.post(TASK_API, task);
}

const getTasks = params => {
	return HttpClient.get(TASK_API, params);
}

const updateTask = task => {
	return HttpClient.put(TASK_API, task);
}

const removeTask = params => {
	return HttpClient.delete(TASK_API, params);
}

export const TaskApi = { createTask, getTasks, updateTask, removeTask };