# Warsztaty z Dockera
*docker-example* - prosta aplikacja do demonstracji konteneryzacji aplikacji i budowania obrazów
*docker-multistage* - aplikacja do demonstracji multistage buildów

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
