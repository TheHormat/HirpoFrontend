echo "Switching to branch master"
git checkout master

echo "Building app ..."
npm run build

echo "Deploying files to server ..."
scp -r dist/* hirpo@65.108.145.101:/var/www/65.108.145.101/ 

echo "Done!"
