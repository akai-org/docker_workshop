echo "Build the images (Manual Step)"
docker build -t chat-frontend ./frontend
docker build -t chat-backend ./backend

echo "CREATE NETWORKING (The Manual Wiring)"
# Without this, containers can't talk to each other by name
docker network create chat-net

if docker volume ls | grep pg-data ; then
  echo "VOLUME pg-data already exists, reusing it"
else
  echo "CREATE VOLUME (The Manual Storage)"
  # We need this so data survives if we kill the database container
  docker volume create pg-data
fi

echo "RUN DATABASE"
# Notice we attach the network and volume explicitly
docker run -d \
  --name db \
  --network chat-net \
  -v pg-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=chat \
  postgres:15-alpine

echo "RUN BACKEND"
# Notice we pass ENV vars to tell it how to find the DB
# We publish port 3000 so the Browser can hit the API
docker run -d \
  --name backend \
  --network chat-net \
  -p 3000:3000 \
  -e DB_HOST=db \
  -e DB_PASS=password \
  -e DB_NAME=chat \
  chat-backend

echo "RUN FRONTEND"
# We publish port 8080 so we can see the website
docker run -d \
  --name frontend \
  --network chat-net \
  -v "$(pwd)"/frontend/index.html:/usr/share/nginx/html/index.html:ro,Z \
  -p 8080:80 \
  chat-frontend