Since Smartface Native is also a node module, you can clone it to your computer and use it locally for your development and debug purposes.

# Installation

- Clone this repository
- Use [Helloworld Project](https://github.com/smartface/helloworld-boilerplate) or an empty project like `native-issues`
- Install dependencies via `yarn`
- Tweak `outDir` value at `tsconfig.dev.json` file to bind your local native installation to debug fast on your Smartface Project
- Run `yarn dev` to launch the project

# Basic usage on Project

If you are debugging some native error, it is better to remove UI Editor layer and use the native code directly like this:

```
import Label from '@smartface/native/ui/label';

const label = new Label();
label.text = "Hello World!";
layout.addChild(label);
```

# Did you find a bug?

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/smartface/native/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/smartface/native/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

## **Did you write a patch that fixes a bug?**

- Open a new GitHub pull request with the patch. Follow the versioning steps above.
- Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

Thanks! :heart: :heart:

Smartface Team

# Create New Module

If you want to implement a new feature, make sure that the folder it is in is relevant.
E.g. if your element derives from View or ViewGroup, that should be located in UI.

## File Structure

yourModule

- yourModule.android.ts -> Main code of Android
- yourModule.iOS.ts -> Main code of Android
- yourModule.ts -> Main declarations of each property to be used. Have your OS specific value separated with iOS and Android
- index.ts -> Main file that separates imports for both OS

### yourModule.ts

All of the interface, class and event etc. definitions should be located here.

#### Example from Animator

```
  /**
   * Performs the changes declared in animFunction with animation inside the layout provided.
   * Duration indicates how long the animation will take in milliseconds.
   * For animation rootLayout you should choose parent layout for Android, you can choose page
   * layout for iOS as shown in example.
   * While animating Textbox, you may see the hint of the Textbox disappear on Android.
   * This is related with Android internal issue (same reason of Google Issue Tracker 38303812, 37048478). For getting over from this problem you should
   * set empty text to the Textbox onComplete callback of animation.
   * @android
   * @ios
   * @since 0.1
   */
  static animate(rootLayout: IViewGroup, duration: number, animFn: () => void): AnimatorBase {
    throw new Error('Method not implemented.');
  }
```

### yourModule.\*.ts

Your code and logic should be here for both OS. Happy Coding!

### index.ts

The main block that separates iOS&Android code should be here. Example usage from Animator:

```
import { AnimatorBase } from './animator';

const Animator: typeof AnimatorBase = require(`./animator.${Device.deviceOS.toLowerCase()}`).default;
type Animator = AnimatorBase;

export default Animator;
```

# Versioning

Current version semantics:

- Alpha(develop) -> Bleeding-Edge content should be published as Alpha. This also serves for test purposes. Do not use this version for your real applications.
- Beta(prerelease) -> Unstable but tested content should be published as Beta.
- Latest(master) -> Production

# Release Process

As explained above, the release process consists alpha, beta and production. There's a GitHub Action which will automate the process for you.

## How to Publish Alpha Version

1. Accept the PR and changes
2. Create a new version via `yarn version --prerelease --preid=alpha`
3. Push the changes via `git push && git push --tags`. Automatic build will not trigger if you don't push the tags

## How to Publish Beta Version

1. Merge the changes from Alpha(develop)
2. Create a new version via `yarn version --prerelease --preid=beta`
3. Push the changes via `git push && git push --tags`. Automatic build will not trigger if you don't push the tags

## How to Publish Production Version

1. Merge the changes from Beta(develop)
2. Create a new version via `yarn version --patch` (or minor)
3. Push the changes via `git push && git push --tags`. Automatic build will not trigger if you don't push the tags

## How to Hotfix

Sometimes, there will be a need to change something on old versions. In that case:

1. Find the version by using the tag: etc. **5.0.0-alpha.34** and use the command: `git checkout 5.0.0-alpha.34`
2. By checking out to tag, you will be in headless mode. Use `git switch -c hotfix/{your-branch-name}` in order to create a branch from it
3. Push your changes into that branch and use one of the commands above depending on which version needs a hotfix

> Don't forget to merge the changes into other branches, otherwise it is likely that you will be conflicting while versioning.

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
