# This script can be used while working with this module locally (means not on SmartfaceCloud)
# It will get js-base module from git repository and install as node module
npm i

rm -rf js-base
git clone https://github.com/smartface/js-base.git

pushd js-base 
npm i 
chmod +x install.sh 
./install.sh 
popd

mkdir node_modules
cp -r scripts/node_modules/* ./node_modules/ || true

rm -rf scripts
rm -rf js-base