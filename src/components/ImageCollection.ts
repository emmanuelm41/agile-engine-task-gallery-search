import { AxiosRequestConfig } from "axios";

import { Image } from "./Image";
import { AgileEngine } from "./api/AgileEngine";
import { KeyStore } from "./api/KeyStore";

export class ImageCollection {
    images: Image[] = [];

    constructor() {
        this.init();
    }

    init = async () => {
        let result = true;
        try {
            await this.sync();
        } catch (error) {
            result = false;
            console.log(error.message);
        }

        const reloadTime = result ? 120000 : 15000;
        setTimeout(() => {
            this.init();
        }, reloadTime);
    };

    sync = async (pageToSearch?: number) => {
        if (!KeyStore.getInstance().isToken()) {
            throw new Error("Token is not present yet...");
        }

        try {
            console.log(`Get images from page: ${pageToSearch ? pageToSearch : 1}`);

            const headers = KeyStore.getInstance().getAuthorizationHeader();
            const config: AxiosRequestConfig = { params: { page: pageToSearch }, headers };

            const response = await AgileEngine.getInstance().get("/images", config);
            const {
                data: { pictures, hasMore, page },
            } = response;

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
