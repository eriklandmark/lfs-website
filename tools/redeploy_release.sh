cd ..
docker compose -f docker-compose.release.yml down
git pull
docker compose -f docker-compose.release.yml up -d --build --remove-orphans