# This script can be used while working with this module locally (means not on SmartfaceCloud)
# It will get js-base module from git repository and install as node module
if [ ! -e "js-base" ]; then
    git clone https://github.com/smartface/js-base 
fi

pushd js-base 
npm i 
chmod +x install.sh 
./install.sh 
popd

cp -r scripts/node_modules/* ./node_modules/ || true
rm -rf scripts