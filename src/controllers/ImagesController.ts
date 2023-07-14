import { Request, Response } from "express";
import path from 'path'

export class ImagesController {
  constructor() {}

  public sendImage = async (req: Request<{ path: string }>, res: Response) => {
    try{
        const { path: imgPath } = req.params;
        return res.status(200).sendFile(path.resolve(`./images/${imgPath.split("/").join("%2F").split(" ").join("%20")}`));
    }
    catch(e) {
        return res.status(500).send(e);
    }
  };
}
