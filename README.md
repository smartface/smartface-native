sf-core 
===================

Core Modules of Native Libraries. sf-core has implementations of Android and iOS native libraries with Smartface Expose Framework.

# Installation #

* Create workspace on Smartface Cloud
* Download sf-core installation script and Run it
```
    curl \
        https://bitbucket.org/\!api/2.0/snippets/smartface-team/74Roe/89ffb3f9d3ad5705588aab8bd41527a974c1b785/files/snippet.txt \
        -o install-sf-core.sh
    chmod +x install-sf-core.sh
    ./install-sf-core.sh alpha
```
* Make sure you are using require properly
* You're ready to use sf-core library in your workspace
```
    const Label = require('sf-core/ui/label');
    var label = new Label();
    label.text = "Hello World!";
    page.add(label);
```

# Contribution Guide

* Create workspace on Smartface Cloud
* Download sf-core contribution script and Run it
```
    curl \
        https://bitbucket.org/\!api/2.0/snippets/smartface-team/LqA5A/00e0cb7bf607df7cd693b85fa5de4418a6223bc9/files/snippet.txt \
        -o install-dev-sf-core.sh
    chmod +x install-dev-sf-core.sh
    ./install-dev-sf-core.sh
```
* When script successfully ends you can go to ~/workspace/scripts/node_modules/sf-core and start coding
```
    cd ~/workspace/scripts/node_modules/sf-core
    git status
```
* Don't forget to follow git-flow strategy while coding :)