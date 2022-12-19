import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import fetch from "node-fetch";

const app: Express = express()
app.use(cors({ origin: "*" }))

app.get('/', async (req: Request, res: Response) => {
    res.json((await fetch(
        "https://graph.facebook.com/v15.0/17841454286311519?fields=business_discovery.username(luleaformulastudent){media{media_url,caption,like_count,permalink,timestamp,media_type,children{media_url}}}&access_token=" + process.env.INSTAGRAM_ACCESS_TOKEN)
        .then(res => res.json())))
})

app.listen(3000, () => { console.log('Server started on port 3000') })