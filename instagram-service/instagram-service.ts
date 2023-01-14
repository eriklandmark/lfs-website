import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import fetch from "node-fetch";

const app: Express = express()
app.use(cors({origin: "*"}))

app.get('/feed', async (req: Request, res: Response) => {
    console.log("[INFO] Request received for instagram feed")
    fetch("https://graph.facebook.com/v15.0/17841454286311519?fields=business_discovery.username(luleaformulastudent){media{media_url,caption,like_count,permalink,timestamp,media_type,children{media_url}}}&access_token=" + process.env.INSTAGRAM_ACCESS_TOKEN)
        .then(response => response.json())
        .then(data => res.status(200).send(data))
        .catch(error => res.status(200).send(error))
})

app.get('/statistics', async (req: Request, res: Response) => {
    console.log("[INFO] Request received for instagram statistics")
    Promise.all([
        fetch("https://graph.facebook.com/v15.0/17841454286311519/insights?metric=audience_country&period=lifetime&access_token=" + process.env.INSTAGRAM_ACCESS_TOKEN),
        fetch(`https://graph.facebook.com/v15.0/17841454286311519/insights?metric=follower_count,profile_views,reach,website_clicks&period=day&since=${Math.floor((Date.now()-1000*3600*24*7)/1000)}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`),
        fetch(`https://graph.facebook.com/v15.0/17841454286311519?fields=business_discovery.username(luleaformulastudent){followers_count,media_count}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`)
    ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(responses => responses.map(result => result.hasOwnProperty("data")? result.data : result)
            .flat()
            .filter(result => result !== undefined && result !== null))
        .then(data => res.status(200).send(data))
        .catch(error => res.status(200).send(error))
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})