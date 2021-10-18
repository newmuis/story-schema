const glob = require('glob');
const path = require('path');
const fs = require('fs');
const AJV = require("ajv/dist/2020")

const SCHEMA_ID_BASE_URL = 'https://github.com/newmuis/story-schema';
const GLOB_OPTIONS = {};
const AJV_OPTIONS = {
  allErrors: true
};

const fileNames = glob.sync('schemas/**/*.schema.json', GLOB_OPTIONS);

function findReferences(token, maybeResults) {
  const results = maybeResults || [];

  if (Array.isArray(token)) {
    token.forEach(v => findReferences(v, results));
    return results;
  }

  if (typeof token === 'object') {
    return Object.keys(token).reduce((results, key) => {
      const v = token[key];

      if (key === '$ref') {
        results.push(v);
        return results;
      }

      findReferences(v, results);
      return results;
    }, results);
  }

  return results;
}

function getSchemaJson(fileName) {
  const fileContents = fs.readFileSync(`./${fileName}`);
  const jsonSchema = JSON.parse(fileContents);
  return jsonSchema;
}

function stripFragment(fileName) {
  const fragmentIndex = fileName.indexOf('#');
  const filePathEndIndex = fragmentIndex >= 0 ? fragmentIndex : Infinity;
  const filePathWithoutFragment = fileName.substring(0, filePathEndIndex);
  return filePathWithoutFragment;
}

function filterUniqueNonEmpty(value, index, arr) {
  return value.length > 0 && arr.indexOf(value) === index;
}

test.each(fileNames)('Schema %s', fileName => {
  const jsonSchema = getSchemaJson(fileName);
  const id = jsonSchema['$id'];

  // const baseUri = path.dirname(fileName);
  // const dependencyFileNames = findReferences(jsonSchema)
  //     .map(stripFragment)
  //     .filter(filterUniqueNonEmpty)
  //     .map(relativeFileName => path.join(baseUri, relativeFileName));

  // console.log(`Dependencies for ${fileName}:\n`, dependencyFileNames);

  // const ajv = new AJV(AJV_OPTIONS);
  // dependencyFileNames.forEach(dependencyFileName => {
  //   ajv.addSchema(getSchemaJson(dependencyFileName));
  // })
  // ajv.compile(jsonSchema);
  expect(id).not.toBeNull();
  expect(id).toBe(`${SCHEMA_ID_BASE_URL}/${fileName}`);
});

