#!/bin/bash
# Install node.js and PM2 globally
sudo apt-get update
sudo apt-get install nodejs-legacy -y
sudo apt-get install npm  -y
sudo npm install pm2 -g
sudo rm -rf /home/ubuntu/my-app1
