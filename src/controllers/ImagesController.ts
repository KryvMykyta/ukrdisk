import { Request, Response } from "express";
import path from 'path'

export class ImagesController {
  constructor() {}

  public sendImage = async (req: Request<{ path: string }>, res: Response) => {
    try{
        const { path: imgPath } = req.params;
        const pathArray = imgPath.split("/")
        if (pathArray.length !== 1){
          return res.status(200).sendFile(path.resolve(`./images/${pathArray[1]}`));
        }
        return res.status(200).sendFile(path.resolve(`./images/${imgPath}`));

    }
    catch(e) {
        return res.status(500).send(e);
    }
  };
}
