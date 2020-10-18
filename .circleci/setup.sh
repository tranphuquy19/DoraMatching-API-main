echo 'Stopping PM2 system...'
pm2 stop API_DEV_DORA

echo 'Dropping the database...'
docker exec 501 bash -c "psql -U postgres -c 'DROP DATABASE IF EXISTS doramatching;'"

echo 'Creating the database...'
docker exec 501 bash -c "psql -U postgres -c 'CREATE DATABASE doramatching;'"

echo 'Checkout working directory'
cd /home/pi/Documents/Test/DoraMatching-API-main
git checkout dev

echo 'Pulling newest code...'
git pull

echo 'Updating yarn...'
sudo npm i -g yarn

echo 'Installing dependencies...'
yarn install

echo 'Building...'
yarn build

echo 'Deploying...'
pm2 start ./dist/main.js --name 'API.DEV.DORA'
