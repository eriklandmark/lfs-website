import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import {google} from 'googleapis';
import {cert, initializeApp} from 'firebase-admin/app';
import {getAuth} from "firebase-admin/auth";
import path from "path";

const app: Express = express()
app.use(cors({origin: "*"}))


initializeApp({
    credential: cert(require(path.join(__dirname, process.env.FIREBASE_APPLICATION_CREDENTIALS)))
})

const admins = process.env.ADMINS?.split(",") ?? []

const auth = new google.auth.GoogleAuth({
    credentials: require(path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS)),
    scopes: [
        "https://www.googleapis.com/auth/admin.directory.user",
        "https://www.googleapis.com/auth/admin.directory.group",
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/webmasters"
    ],
    clientOptions: {
        subject: "erik.landmark@luleafs.se"
    }
})

async function run() {
    const admin_api = google.admin({version: 'directory_v1', auth: await auth.getClient()})
    const statistics_api = google.analyticsdata({version: 'v1beta', auth: await auth.getClient()})
    const search_api = google.webmasters({version: 'v3', auth: await auth.getClient()})

    app.get('/is-authorized', async (req: Request, res: Response) => {
        console.log("[INFO] Request for checking if user is authorized")
        getAuth().verifyIdToken(req.get('Authorization')!)
            .then((decoded_token) => res.status(200).json({
                uid: decoded_token.uid,
                authorized: true,
                is_admin: admins.includes(decoded_token.uid)
            }))
            .catch((error) => res.status(200).json({error}))
    })

    app.get('/accounts', async (req: Request, res: Response) => {
        console.log("[INFO] Requesting for accounts")
        admin_api.users.list({domain: "luleafs.se", viewType: "domain_public"})
            .then(response => response.data.users
                .map(user => ({
                    id: user.id,
                    email: user.primaryEmail,
                    name: user.name.fullName,
                    phone: user.phones ? user.phones[0].value : "",
                    photo: user.thumbnailPhotoUrl
                    //title: user.organizations ? user.organizations[0].description : "",
                })))
            .then(data => res.status(200).json(data))
            .catch(response => res.status(400).json(response.response.data))
    })

    app.get('/groups', async (req: Request, res: Response) => {
        console.log("[INFO] Requesting for groups")
        admin_api.groups.list({domain: "luleafs.se"})
            .then(response => response.data.groups
                .filter((group: any) => !group.email.startsWith("gcp"))
                    .map((group: any) => ({
                    id: group.id,
                    name: group.name,
                    email: group.email,
                    membersCount: group.directMembersCount,
                    description: group.description
                })))
            .then(data => res.status(200).json(data))
            .catch(response => res.status(400).json(response.response.data))
    })

    app.get('/groups/:id', async (req: Request, res: Response) => {
        console.log("[INFO] Requesting for groups")
        admin_api.members.list({groupKey: req.params.id})
            .then(response => response.data.members
                .map((group: any) => ({
                    id: group.id,
                    email: group.email
                })))
            .then(async members => {
                const all_accounts = (await admin_api.users.list({
                    domain: "luleafs.se",
                    viewType: "domain_public"
                })).data.users
                return members.map((member: any) => {
                    const user = all_accounts.find((account: any) => account.id === member.id)
                    return {
                        ...member,
                        name: user.name.fullName,
                        phone: user.phones ? user.phones[0].value : "",
                        photo: user.thumbnailPhotoUrl,
                        title: user.organizations ? user.organizations[0].description : "",
                    }
                })
            })
            .then(data => res.status(200).json(data))
            .catch(response => res.status(400).json(response.response.data))
    })

    app.get('/statistics/analytics', async (req: Request, res: Response) => {
        console.log("[INFO] Requesting for statistics")

        statistics_api.properties.batchRunReports({
            property: "properties/" + process.env.GA_PROPERTY_ID,
            requestBody: {
                requests: [
                    {
                        dateRanges: [{startDate: "28daysAgo", endDate: "today"}],
                        dimensions: [{name: "country"}],
                        metrics: [{name: "totalUsers"}]
                    },
                    {
                        dateRanges: [{startDate: "28daysAgo", endDate: "today"}],
                        dimensions: [{name: "date"}],
                        metrics: [{name: "totalUsers"}, {name: "activeUsers"}, {name: "newUsers"}]
                    },
                    {
                        dateRanges: [{startDate: "2022-01-01", endDate: "today"}],
                        dimensions: [{name: "year"}],
                        metrics: [{name: "totalUsers"}]
                    }
                ]
            }
        })
            .then(data => res.status(200).json(data.data))
            .catch(response => res.status(400).json(response.response.data))
    })

    app.get('/statistics/search', async (req: Request, res: Response) => {
        console.log("[INFO] Requesting for search statistics")

        search_api.searchanalytics.query({
            siteUrl: "sc-domain:luleafs.se",
            requestBody: {
                startDate: "2022-01-01",
                endDate: new Date().toISOString().split("T")[0],
                dimensions: ["device"],
                dataState: "all"
            }
        })
            .then(data => {
                const clicks = data.data.rows.reduce((acc:number, row: any) => acc + row.clicks, 0)
                const impressions = data.data.rows.reduce((acc:number, row: any) => acc + row.impressions, 0)
                return {
                    clicks,
                    impressions,
                    ctr: clicks / impressions,
                    position: data.data.rows.reduce((acc:number, row: any) => acc + row.position, 0) / data.data.rows.length
                }
            })
            .then(data => res.status(200).json(data))
            .catch(response => res.status(400).json(response.response.data))
    })

    app.get('/statistics/search/:dimension', async (req: Request, res: Response) => {
        console.log("[INFO] Requesting for search statistics")

        search_api.searchanalytics.query({
            siteUrl: "sc-domain:luleafs.se",
            requestBody: {
                startDate: "2022-01-01",
                endDate: new Date().toISOString().split("T")[0],
                dimensions: req.params.dimension.split(","),
                dataState: "all"
            }
        })
            .then(data => res.status(200).json(data.data))
            .catch(response => res.status(400).json(response.response.data))
    })

    app.listen(3001, () => console.log('Server started on port 3001'))
}

run().catch(console.error)
