# gcalendar-to-line

## Start node container

- client

    `docker run -it -d  -p 4200:4200 -p 49513:49513 --name client -v "$PWD":/app -w /app/client node`

- server

    `docker run -it -d  -p 4000:4000 --name server -v "$PWD":/app -w /app/server node`

