nf-core 
===================

Core Modules of Native Libraries. nf-core has implementations of Android and iOS native libraries with Smartface Expose Framework.

# Installation #

* Create workspace on Smartface Cloud
* Download nf-core installation script and Run it
```
    curl \
        https://bitbucket.org/\!api/2.0/snippets/smartface-team/74Roe/80ee03e3cf8172216778a2ec7ef7f44a8037b40e/files/snippet.txt \
        -o install-nf-core.sh
    chmod +x install-nf-core.sh
    ./install-nf-core.sh alpha
```
* Make sure you are using require properly
* You're ready to use nf-core library in your workspace
```
    const Label = require('nf-core/ui/label');
    var label = new Label();
    label.text = "Hello World!";
    page.add(label);
```

# Contribution Guide

* Create workspace on Smartface Cloud
* Download nf-core contribution script and Run it
```
    curl \
        https://bitbucket.org/\!api/2.0/snippets/smartface-team/LqA5A/c74448e067f9e2292fff38a1530d6b3124e90479/files/snippet.txt \
        -o install-dev-nf-core.sh
    chmod +x install-dev-nf-core.sh
    ./install-dev-nf-core.sh
```
* When script successfully ends you can go to ~/workspace/scripts/node_modules/nf-core and start coding
```
    cd ~/workspace/scripts/node_modules/nf-core
    git status
```
* Don't forget to follow git-flow strategy while coding :)