# Repository Template

[![Build Status](https://app.travis-ci.com/melaasar/cs130-template.svg?branch=master)](https://app.travis-ci.com/github/melaasar/cs130-template)
[![Release](https://img.shields.io/github/v/release/melaasar/cs130-template?label=release)](https://github.com/melaasar/cs130-template/releases/latest)

This repo serves as a template for a repository that follows the Scrum process.
The following information describes how the native features/workflows of Github
can be customized to work in a scrum development process.

## Development

### Installing and running

For installation and development instructions, refer to
[the wiki page](https://github.com/gang21/CS130-Capstone-Project/wiki#development).

## CI/CD

### Running tests

To run the project's tests, in the project root run:

```bash
npm test
```

This runs our `vitest` test suite, and is also used by our CI pipeline to ensure
correctness. We also run the following commands in our
[workflows](https://github.com/gang21/CS130-Capstone-Project/tree/main/.github/workflows)
directory to enforce code style, linting, and build success:

```bash
# Enforce style
npm install -g npm
npm install prettier
npx prettier --check "**/*.{js,jsx,ts,tsx,md,css}"
```

```bash
# Enforce build success
npm ci
npm run check
```

### Continuous Integration

These scripts are triggered by PR opening/pushing. The build and lint checks are
found in the
[ci-cd.yml](https://github.com/gang21/CS130-Capstone-Project/blob/main/.github/workflows/ci-cd.yml)
workflow file, while the style guide is enforced by
[format.yml](https://github.com/gang21/CS130-Capstone-Project/blob/main/.github/workflows/format.yml).


### Continuous Deployment
Our continous deployment was found on vercel. In order to deploy the application, you must deploy first the [backend](https://cs-130-capstone-project-1jckmp8vz-gang22s-projects.vercel.app), and then the [frontend](https://cs-130-capstone-project-jj71cacti-gang22s-projects.vercel.app). The actual application will be hosted on the frontend. 

Note: According to Vercel's free user policy, deployment will not be able to be shared with others unless we move to a payment option.  Thus, in order to run the application at this time, please refer to the installing and running option to run the application locally. 
