cd ..
docker compose -f docker-compose.beta.yml down
git pull
docker compose up -f docker-compose.beta.yml -d --build