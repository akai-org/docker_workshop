# Warsztaty z Dockera
*docker-example* - prosta aplikacja do demonstracji konteneryzacji aplikacji i budowania obrazów

*docker-multistage* - aplikacja do demonstracji multistage buildów

*docker-compose* - prosty projekt docker compose i motywacja za narzędziem compose

## Komendy
```sh
docker run hello-world
```

```sh
docker run -p 80:80 nginx
```

```sh
docker run --network=host nginx
```

```sh
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -v mysql_data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=db \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=password \
  mysql:8.0
```

## Docker compose

Należy wejść do sekcji docker compose
```sh
cd docker-compose
```

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

Zobaczenie jak idzie naszemu projektowi
```sh
docker stats
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

## Komendy pomocniczne

Budowa obrazu:
```sh
docker build -t <tag> .
```

Uruchamianie obrazu:
```sh
docker run [args...] <image-name> [command]
```
Przydatne flagi:
* -d - uruchamianie obrazu w tle
* -e - podawanie envów do kontenera
* --name - własna nazwa kontenera (jeśli nie podamy Docker wymyśli losową)
* --network - w jakiej sieci Dockerowej jest kontener
* -p - mapowanie portów (port-local:port-container, [więcej szczegółów](https://docs.docker.com/reference/cli/docker/container/run/#publish))
* --rm - usuwa kontener po jego zatrzymaniu
* --restart - określenie restart policy (no, on-failure, always, unless-stopped)

Reszta [tutaj](https://docs.docker.com/reference/cli/docker/container/run/)

Na przykład (nazwa żeby ułatwić komendy):
```sh
docker run -p 80:80 --name kontener -d nginx
```

Lista wszystkich działających kontenerów:
```sh
docker ps
```

Lista wszystkich kontenerów (również niedziałających):
```sh
docker ps -a
```

Uruchomione kontenerki możemy sobie dowolnie zatrzymywać i uruchamiać:
```sh
docker stop kontener
docker start kontener
```

Możemy wyświetlić logi (oraz podążać za nimi na żywo):
```sh
docker logs -f kontener
```

Możemy "wejść" na działający kontener i sprawdzić, co w trawie piszczy
```sh
docker exec -t kontener bash
```

Gdy zabawa się skończyła, możemy zatrzymać kontener i go usunąć... lub zmusić działający do usunięcia:
```sh
docker rm -f kontener
```