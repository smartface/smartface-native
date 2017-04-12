sf-core 
===================

Core Modules of Native Libraries. sf-core has implementations of Android and iOS native libraries with Smartface Expose Framework.

# Installation #

* Create workspace on Smartface Cloud
* Add sf-core to your dependencies in scripts/package.json
* You're ready to use sf-core library in your workspace
```
    const Label = require('sf-core/ui/label');
    var label = new Label();
    label.text = "Hello World!";
    layout.add(label);
```

# Contribution Guide

* Create workspace on Smartface Cloud
* Download sf-core contribution script and Run it
```
    curl \
        https://bitbucket.org/\!api/2.0/snippets/smartface-team/LqA5A/c74448e067f9e2292fff38a1530d6b3124e90479/files/snippet.txt \
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