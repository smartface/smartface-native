sf-core 
===================

Core Modules of Native Libraries. sf-core has implementations of Android and iOS native libraries with Smartface Expose Framework.

# Installation #

1. Create workspace on Smartface Cloud
2. Download sf-core installation script and Run it
```
    curl \
        https://bitbucket.org/\!api/2.0/snippets/smartface-team/74Roe/1df96a8b517a974b019dad37ae1f2835f162eef0/files/snippet.txt \
        -o install-sf-core.sh
    chmod +x install-sf-core.sh
    ./install-sf-core.sh alpha
```
3. Make sure you are using require properly
4. You're ready to use sf-core library in your workspace
```
    const Label = require('sf-core/ui/label');
    var label = new Label();
    label.text = "Hello World!";
    page.add(label);
```

# Contribution Guide

1. Create workspace on Smartface Cloud
2. Download sf-core contribution script and Run it
```
    curl \
        https://bitbucket.org/\!api/2.0/snippets/smartface-team/LqA5A/00e0cb7bf607df7cd693b85fa5de4418a6223bc9/files/snippet.txt \
        -o install-dev-sf-core.sh
    chmod +x install-dev-sf-core.sh
    ./install-dev-sf-core.sh
```
3. When script successfully ends you can go to ~/workspace/scripts/node_modules/sf-core and start coding
```
    cd ~/workspace/scripts/node_modules/sf-core
    git status
```
4. Don't forget to follow git-flow strategy while coding :)