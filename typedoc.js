const TypeDoc = require('typedoc');
const fs = require('fs');
const path = require('path');
const OUTPUT_DIR = 'docs';
const BASE_PATH = 'src';

/**
 * We need to define all modules under primitive here for typedoc
 */
const primitiveModules = ['boundary', 'iflexlayout', 'point2d', 'position', 'rectangle', 'size'];

function primitiveModuleFinder(basePath) {
  const paths = primitiveModules.map((p) => basePath + p + '.ts');
  return paths.filter((p) => fs.existsSync(p));
}

function baseOrAbstractClassChecker(moduleName) {
  return ['Base', 'Abstract'].some((a) => moduleName.includes(a));
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
  return fs
    .readdirSync(srcpath)
    .map((file) => path.join(srcpath, file))
    .filter((path) => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
  const directories = getDirectories(srcpath);
  const recursive = directories.map(getDirectoriesRecursive);
  return [srcpath, ...flatten(recursive)];
}

function getModuleNamesWithPath(basePath) {
  const directories = getDirectoriesRecursive(basePath);
  let allPossibleEntryPoints = [];
  directories.forEach((directory) => {
    const separated = directory.split(path.sep);
    if (separated.length > 1) {
      // From all paths filter index.ts, MODULE_NAME.ts, MODULE_NAME-events.ts
      // + add modules under primitive
      const lastPath = separated[separated.length - 1];
      const moduleNamed = directory + path.sep + lastPath + '.ts';
      const indexNamed = directory + path.sep + 'index.ts';
      const eventsNamed = directory + path.sep + lastPath + '-events.ts';
      if (fs.existsSync(eventsNamed)) {
        allPossibleEntryPoints.push(eventsNamed);
      }
      if (lastPath === 'primitive') {
        const primitiveEntryPoints = primitiveModuleFinder(directory + path.sep);
        allPossibleEntryPoints = allPossibleEntryPoints.concat(primitiveEntryPoints);
      }
      if (fs.existsSync(moduleNamed)) {
        allPossibleEntryPoints.push(moduleNamed);
      } else if (fs.existsSync(indexNamed)) {
        allPossibleEntryPoints.push(indexNamed);
      }
    }
  });
  return allPossibleEntryPoints;
}

async function main() {
  const app = new TypeDoc.Application();
  app.converter.on(TypeDoc.Converter.EVENT_RESOLVE_BEGIN, (context) => {
    // Some extra sanity checks would be good here.
    // context is of type Context, which typedoc <0.22 doesn't publicly export
    context.project?.children?.forEach((submodule) => {
      submodule.name = submodule.name.substr(submodule.name.lastIndexOf('/') + 1);
      const oldDefault = submodule?.children?.find((reflection) => reflection.name === 'default' && reflection.kind === 128);
      oldDefault?.children?.forEach((child) => {
        submodule.children.push(child);
        child.parent = submodule;
      });
      if (oldDefault) {
        oldDefault.children = undefined;
        context.project.removeReflection(oldDefault);
      }
      submodule?.children?.forEach((child) => {
        if (baseOrAbstractClassChecker(child?.name)) {
          child.name = capitalize(submodule.name);
        }
      });
    });
  });
  app.options.addReader(new TypeDoc.TSConfigReader());
  const fileNames = getModuleNamesWithPath(BASE_PATH);
  app.bootstrap({
    entryPoints: fileNames,
    sort: ['source-order', 'visibility'],
    excludePrivate: true,
    excludeNotDocumented: false,
    excludeInternal: true,
    pretty: true,
    categorizeByGroup: true,
    cleanOutputDir: true,
    emit: 'docs',
    includeVersion: true
  });
  const project = app.convert();
  // Project may not have converted correctly
  if (project) {
    // Rendered docs
    return await app.generateDocs(project, OUTPUT_DIR);
  }
}

main().catch((error) => {
  console.error(error);
});
