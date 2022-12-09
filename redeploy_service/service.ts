const http = require("http");
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const service = process.env.REDEPLOY_SERVICE;

const server = http.createServer(async (req: any, res: any) => {
    try {
        console.log("Received request to update service");
        await exec("cd repo && git pull")
        await exec(`cd repo && docker compose -f docker-compose.beta.yml rm -s -v ${service}`)
        await exec(`cd repo && docker compose -f docker-compose.beta.yml up  -d --build ${service}`)
        console.log("Request processed");
    } catch (error) {
        console.error(error);
    }
    res.writeHead(200);
    res.end("");
});
server.listen(3000, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:3000`);
});