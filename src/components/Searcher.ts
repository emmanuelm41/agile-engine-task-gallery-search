import { Author } from "./indexes/Author";
import { Camera } from "./indexes/Camera";
import { Tag } from "./indexes/Tag";
import { MemJS } from "./memjs/MemJS";

export class Searcher {
    get(terms: { author?: string; camera: string; tags: string }) {
        const { author, camera, tags } = terms;
        let imageIds: { [key: string]: any } = {};

        if (author) imageIds = { ...Author.getInstance().getItem(author) };
        if (camera) imageIds = { ...Camera.getInstance().getItem(camera) };
        if (tags) tags.split(",").forEach((tag) => (imageIds = { ...Tag.getInstance().getItem(tag) }));

        return imageIds;
    }

    async getImageData(ids: { [key: string]: any }) {
        const images = [];
        for (let id in ids) {
            const { value } = await MemJS.getInstance().get(id);
            if (value) images.push(JSON.parse(value.toString()));
        }

        return images;
    }
}
