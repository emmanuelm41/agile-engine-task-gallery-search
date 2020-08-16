import { ImageCollection } from "./components/ImageCollection";

async function init() {
	try {
		const images = new ImageCollection();
		await images.sync();
	} catch (error) {
		console.log(error);
		setTimeout(() => {
			init();
		}, 15000);
	}
}

init();
