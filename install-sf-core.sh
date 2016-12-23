# Backup npmrc
cp ~/.npmrc ~/.npmrc.bak

# Set nexus npm repository to registry
npm config set registry http://cd.smartface.io/nexus/content/repositories/test-npm
npm config set _auth ZGVwbG95ZXI6M211bDR0MHIyMDE2
npm config set always-auth true

# Install sf-core
npm install sf-core@alpha

# Recover npmrc
cp ~/.npmrc.bak && rm ~/.npmrc.bak