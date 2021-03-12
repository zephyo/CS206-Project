#!/bin/sh
cd quiz-app
sudo yarn
cd server
sudo yarn
sudo yarn run swagger-autogen
cd ..
sudo systemctl restart nginx
sudo pm2 restart all