Przygotowanie plików:
```sh
chmod +x docker_compose_* 
```

Odpalenie projektu bez compose
```sh
./docker_compose_up.sh
```

Zabicie projektu bez compose
```sh
./docker_compose_down.sh
```

Odpalenie projektu z compose
```sh
docker compose up -d
```

Test service discovery
```sh
docker exec -it motivation-db-1 sh -c "ip a && ping -c 5 backend"
```

Zabicie projektu z compose
```sh
docker compose down
```

Doszczętne ubicie projektu (wraz z danymi)
```sh
docker compose down -v
```