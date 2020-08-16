import axios, { AxiosInstance } from "axios";
import apiConfig from "../../config/api";

export class AgileEngine {
	static instance: AxiosInstance;

	static getInstance(): AxiosInstance {
		if (!this.instance)
			this.instance = axios.create({
				baseURL: apiConfig.baseURL
			});

		return this.instance;
	}
}
