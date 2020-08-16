import { Image } from "./Image";
import { AgileEngine } from "./api/AgileEngine";
import { KeyStore } from "./api/KeyStore";
import { AxiosRequestConfig } from "axios";

export class ImageCollection {
	images: Image[] = [];

	constructor() {}

	sync = async (pageToSearch?: number) => {
		console.log(`Get images from page: ${pageToSearch ? pageToSearch : 1}`);

		try {
			const headers = KeyStore.getInstance().getAuthorizationHeader();
			const config: AxiosRequestConfig = { params: { page: pageToSearch }, headers };

			const response = await AgileEngine.getInstance().get("/images", config);
			const { data: { pictures, hasMore, page } } = response;

			this.images = this.images.concat(
				pictures.map(({ id, cropped_picture }: { id: string; cropped_picture: string }) => {
					new Image(id, cropped_picture);
				})
			);

			if (hasMore) this.sync(page + 1);
		} catch (error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
			throw error;
		}
	};
}
