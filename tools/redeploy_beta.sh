cd ..
docker compose -f docker-compose.beta.yml down
git pull
docker compose -f docker-compose.beta.yml up -d --build