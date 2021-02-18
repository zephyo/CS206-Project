#!/bin/sh
cd quiz-app
sudo yarn install
cd server
sudo yarn install
sudo yarn run swagger-autogen
cd ..
sudo systemctl restart nginx
sudo pm2 restart all