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

# I want to add a new module

Before anything, please read our [Architecture Documentation](./ARCHITECTURE.md) carefully. Any PR that isn't on par with architecture will be rejected.

# Versioning

Current version semantics:

- Alpha(develop) -> Bleeding-Edge content should be published as Alpha. This also serves for test purposes. Do not use this version for your real applications.
- Beta(prerelease) -> Unstable but tested content should be published as Beta.
- Latest(master) -> Production

# Release Process

As explained above, the release process consists alpha, beta and production. There's a GitHub Action which will automate the process for you.

## How to Publish Alpha Version

1. Accept the PR targeted to `release/alpha`
2. Merge the changes, the CI/CD will automatically increase version, commit the version change.

## How to Publish Beta Version

1. Create a PR from `release/alpha` to `release/beta`. It's highly likely that conflict will happen in the merge.
2. Make sure `package.json` has beta version instead of alpha.
3. If not, create a new version via `yarn version --prerelease --preid=beta`
4. Merge the changes, the CI/CD will automatically increase version, commit the version change.

## How to Publish Production Version

This step requires manual action.

1. Merge the changes from `release/beta`. If conflict occur on `package.json` with versions, resolve the conflict with current change(version shouldn't be alpha or beta)
2. Create a new version via `yarn version --patch` (or minor)
3. Push the changes

## How to Hotfix

Sometimes, there will be a need to change something on old versions. In that case:

1. Find the version by using the tag: etc. **5.0.0-alpha.34** and use the command: `git checkout 5.0.0-alpha.34`
2. By checking out to tag, you will be in headless mode. Use `git switch -c hotfix/{your-branch-name}` in order to create a branch from it
3. Push your changes into that branch and use one of the commands above depending on which version needs a hotfix

> Don't forget to merge the changes into other branches, otherwise it is likely that you will be conflicting while versioning.

# Generate API Documentation

> **INFO**: Make sure that index.ts and yourModule.ts is present and defined correctly if you have a new module.

> **WARNING**: New modules under primitive must be defined in typedoc.js

## Local Build for testing

1. Run `yarn install` on project folder
2. Run `yarn build:document`
3. Navigate to /docs and open `index.html` file.

## Docker Build

`docker build -t smartface-native-documentation .`

## Docker Run

`docker run -d -p 80:80 smartface-native-documentation`
