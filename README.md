# @smartface/native

Core Modules of Native Libraries. @smartface/native has implementations of Android and iOS native libraries with Smartface Expose Framework.

# Installation & Usage

- Create workspace on Smartface Cloud
- Add @smartface/native to your dependencies in scripts/package.json
- You're ready to use @smartface/native library in your workspace

```
import Label from '@smartface/native/ui/label';

const label = new Label();
label.text = "Hello World!";
layout.addChild(label);
```

# Create New Module

If you want to implement a new feature, make sure that the folder it is in is relevant.
E.g. if your element derives from View or ViewGroup, that should be located in UI.

## File Structure

yourModule

- analysis.js -> For API Documentation
- yourModule-Android.js -> Main code of Android
- yourModule-iOS.js -> Main code of Android
- index.d.ts -> Main declarations of each property to be used. Have your OS specific value separated with iOS and Android
- index.js -> Main file that separates imports for both OS

### Analysis.js

This will be used to generate API Documentation. You should write the code yourself referencing jsdocs standards.

**Example from Animator:**

```
/**
 * Performs the changes declared in animFunction with animation inside the layout provided.
 * Duration indicates how long the animation will take in milliseconds.
 * For animation rootLayout you should choose parent layout for Android, you can choose page
 * layout for iOS as shown in example.
 * While animating Textbox, you may see the hint of the Textbox disappear on Android.
 * This is related with Android internal issue (same reason of Google Issue Tracker 38303812, 37048478). For getting over from this problem you should
 * set empty text to the Textbox onComplete callback of animation.
 * @method animate
 * @param {UI.ViewGroup} rootLayout
 * @param {Number} duration
 * @param {Function} animFunction
 * @return {UI.Animator}
 * @static
 * @android
 * @ios
 * @since 0.1
 */
Animator.animate = function(rootLayout, duration, animFunction) {
    // do stuff
    return new Animator();
};
```

### yourModule-\*.js

Your code and logic should be here for both OS. Happy Coding!

### index.d.ts

Main declaration file should be here. The declarations here will be shown straight on the IDE. Note that wrong typing means wrong code and it has to be ignored via `@ts-ignore`

For example functions, you can copy and paste the same examples from analysis.js.

### index.js

This file is only responsible for distributing require. It should mainly be:

```
module.exports = require("./yourModule-" + Device.deviceOS);
```

# Generate API Documentation

> **INFO**: Make sure that index.ts and yourModule.ts is present and defined correctly if you have a new module.

> **WARNING**: New modules under primitive must be defined in typedoc.js

Local Build

1. Run `yarn install` on project folder
2. Run `yarn build:document`
3. Navigate to /docs and open `index.html` file.

Docker Build

`docker build -t smartface-native-documentation .`

Docker Run

`docker run -d -p 80:80 smartface-native-documentation`
