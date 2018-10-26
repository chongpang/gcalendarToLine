#!bin/bash

whoami
pwd

cd /app
if [ ! -d "/app/gcalendar-to-line" ]; then
    git clone git@bitbucket.org:syabondama/gcalendar-to-line.git -b develop
fi
cd gcalendar-to-line 
#git reset --hard
git clean -d -x -f
git pull origin develop

sudo docker restart server
sudo docker exec -it server pm2 restart server.js

sudo nginx -s reload
