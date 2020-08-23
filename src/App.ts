import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { ImageCollection } from "./components/ImageCollection";
import { Searcher } from "./components/Searcher";

const app = express();
const searcher = new Searcher();
const imagesCollection = new ImageCollection();

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/search", async (req: Request, resp: Response) => {
    console.log(`New search request received. Params: ${JSON.stringify(req.query)}`);

    const imagesIds = searcher.getImagesIds(req.query);
    const imagesData = await searcher.getImagesData(imagesIds);

    resp.setHeader("Content-Type", "application/json");
    resp.statusCode = 200;

    console.log(`Response ${JSON.stringify(imagesData)}`);
    resp.send({ images: imagesData });
});

app.listen("5000", () => {
    console.log("Listening on port 5000");
});
