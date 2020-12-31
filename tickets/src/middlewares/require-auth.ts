import {Request, Response, NextFunction} from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.currentUser);
    if(!req.currentUser){
        return res.status(401).send()
    }
    next(); 
    
}