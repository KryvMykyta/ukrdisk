import { Request, Response } from "express";
import path from 'path'

export class ImagesController {
  constructor() {}

  public sendImage = async (req: Request<{ path: string }>, res: Response) => {
    try{
        const { path: imgPath } = req.params;
        const pathArray = imgPath.split("/")
        const fileName = pathArray.length !== 1 ? pathArray[1].split(".") : imgPath.split(".")
        return res.status(200).sendFile(path.resolve(`./images/${fileName[0]+"."+fileName[1].toLowerCase()}`));

    }
    catch(e) {
        return res.status(500).send(e);
    }
  };
}
