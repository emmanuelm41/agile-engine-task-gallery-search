import { AxiosRequestConfig } from "axios";

import { AgileEngine } from "./api/AgileEngine";
import { KeyStore } from "./api/KeyStore";

import { MemJS } from "./memjs/MemJS";

export class Image {
	author: string | undefined;
	camera: string | undefined;
	tags: string | undefined;
	fullPicture: string | undefined;

	constructor(public id: string, public croppedImage: string) {
		this.sync();
	}

	sync = async () => {
		console.log(`Image ${this.id} - Loading...`);

		try {
			const config: AxiosRequestConfig = { headers: KeyStore.getInstance().getAuthorizationHeader() };

			const response = await AgileEngine.getInstance().get(`/images/${this.id}`, config);
			const { data, data: { author, camera, tags, full_picture } } = response;

			this.author = author;
			this.camera = camera;
			this.tags = tags;
			this.fullPicture = full_picture;

			console.log(`Image ${this.id} - Data found: ${JSON.stringify(this)}`);

			await MemJS.getInstance().set(this.id, JSON.stringify(data), {});

			console.log(`Image ${this.id} - Data was written in memcache`);
		} catch (error) {
			console.log(`Image ${this.id} - Error loading data. ${error}`);
		}
	};
}
