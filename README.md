# Experimental Web Stories JSON Schema

## Usage

TBD

## Developing

### Getting started

Checkout the code:

```
git clone git@github.com:newmuis/story-schema.git
```

Install:

- [Yarn][1]
- [json-schema-for-humans][2]

Then run:

```
yarn install
```

You're all set up!

### Commands

| Command                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `yarn run build`          | Builds all forms of output into the `dist/` directory. |
| `yarn run clean`          | Removes the `dist/` directory.                     |
| `yarn run compile-schema` | Compiles the JSON schema to a JS module that validates JSON data objects against that schema. |
| `yarn run copy-static`    | Copies all files in the `static/` directory to `dist/`. |
| `yarn run docs`           | Regenerates the documentation.                     |
| `yarn run test`           | Runs unit tests against the schema files, to ensure they are valid. |

[1]: https://classic.yarnpkg.com/lang/en/docs/install/
[2]: https://coveooss.github.io/json-schema-for-humans/#/?id=installation
