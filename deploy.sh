
#!/bin/bash
#PRODUCTION
git reset --hard
git checkout main
git pull origin main

npm i yarn -g
yarn global add serve
yarn
yarn build
pm2 start "yarn run start:prod" --name=zenvyra-store


# #DEVELOPMENT
# git reset --hard
# git checkout dev
# git pull origin dev


# yarn install
# pm2 start process.config.js --env production

# yarn
# pm2 start "yarn run start:dev" --name "ZENVYRA"
