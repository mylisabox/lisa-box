# Contributing to L.I.S.A. and L.I.S.A. Plugins

This guide is designed to help you get off the ground quickly contributing to L.I.S.A., Plugins and the L.I.S.A. ecosystem.  The goal of our community is to make it easy for members of all skill levels to contribute.  This guide will help you write useful issues, propose eloquent feature requests, and submit top-notch code that can be merged quickly.  

Maintaining a open source project is a labor of love, meaning the core maintainers of L.I.S.A. or Plugins are volunteering their time.  Respecting the guidelines laid out below helps the maintainers be efficient and make the most of the time they spend working on the project.  This, in turn, creates a better experience of working with L.I.S.A. more enjoyable for the community at large.


## Submitting Issues

> L.I.S.A. is composed of a core library, [lisa-box](https://github.com/mylisabox/lisa-box), and a number of [Plugins](https://github.com/mylisabox), which have their own dedicated repositories.  These repositories may also live outside the L.I.S.A. official Github organization.  
> 
> _*Please open issues with plugins, generators, etc. in the relevant repository.*_  
> 
> This helps us stay on top of issues and keep organized.

When submitting an issue, please follow these simple instructions:

1. Search for issues similar to yours in [GitHub search](https://github.com/mylisabox/lisa-box/search?type=Issues) and [Google](https://www.google.nl/search?q=mylisabox). 
2. Feature requests are welcome; see [Requesting Features](#requesting-features) below for submission guidelines.
3. If there's an open issue, please contribute to that issue.
4. If there's a closed issue, open a new issue and link the url of the already closed issue(s).
5. If there is no issue, open a new issue and specify the following:
  - A short description of your issue in the title
  - The L.I.S.A. version (find this with in the package.json file)
  - Detailed explanation of how to recreate the issue, including necessary setup setps
6. If you are experiencing more than one problem, create a separate issue for each one. If you think they might be related, please reference the other issues you've created.



## Submitting Features

> New feature requests should be made as pull requests to the `backlog` section of [ROADMAP.MD](https://github.com/mylisabox/lisa-box/blob/master/ROADMAP.md) or as issues on the `Backlog` milestone in the [issue queue](https://github.com/mylisabox/lisa-box/milestones/Backlog).  We will monitor community discussion on these PRs and issues and if they are wanted by the community/L.I.S.A. devs, they will be merged.  Further discussion is welcome even after a PR has been merged. 

##### Submitting a new feature request
1. First, look at the `backlog` table in [ROADMAP.MD](https://github.com/mylisabox/lisa-box/blob/master/ROADMAP.md) or the [Backlog Milestone](https://github.com/mylisabox/lisa-box/milestones/Backlog) in the issue queue toand also search open pull requests in that file to make sure your change hasn't already been proposed.  If it has, join the discussion.
2. If it doesn't already exist, create a pull request editing the `backlog` table of [ROADMAP.MD](https://github.com/mylisabox/lisa-box/blob/master/ROADMAP.md).
3. Start a discussion about why your feature should be built (or better yet, build it).  Get feedback in the [L.I.S.A. Gitter](https://gitter.im/mylisabox/Lobby) Channel.  The more feedback we get from our community, the better we are able to build the framework of your dreams :evergreen_tree:

## Writing Tests

Ideally, all code contributions should be accompanied by functional and/or unit tests (as appropriate).  

Test Coverage:

| Edge (master branch) |
|----------------------|
| [![Coverage Status](https://coveralls.io/repos/mylisabox/lisa-box/badge.png)](https://coveralls.io/r/mylisabox/lisa-box) |


## Code Submission Guidelines

The community is what makes L.I.S.A. great, without you we wouldn't have come so far. But to help us keep our sanity and reach code-nirvana together, please follow these quick rules whenever contributing.

> Note: This section is based on the [Node.js contribution guide](https://github.com/joyent/node/blob/master/CONTRIBUTING.md#contributing).

###### No CoffeeScript.

For consistency, all code in L.I.S.A. core, including core hooks and core generators, must be written in JavaScript, not CoffeeScript or TypeScript.  We can't merge a pull request in CoffeeScript.

###### Contributing to a Plugin 

If the Plugin is in the L.I.S.A. Github organization, please send feature requests, patches and pull requests to that organization.  Other Trailpacks may have their own contribution guidelines.  Please follow the guidelines of the Plugin you are contributing to.

###### Authoring a new Plugin

You are welcome to author a new Plugin at any time.  Plugins must inherit from the main [Plugin](https://github.com/mylisabox/lisa-plugin) interface to inherit the API.  Feel free to start work on a new plugin, just make sure and do a thorough search on npm, Google and Github to make sure someone else hasn't already started working on the same thing.  

It is recommended that you maintain your Plugin in your own Github repository.  If you would like to submit your Plugin to be listed in the [L.I.S.A. Github Organization](https://github.com/mylisabox), please submit an issue to the [L.I.S.A. Issue queue](https://github.com/mylisabox/lisa-box/issues).

###### Contributing to a generator

L.I.S.A. generators are based upon Yeoman.  You can read up on Yeoman's [authoring guide](http://yeoman.io/authoring/) for how to write your own generator or contribute to another generator.  Please follow the core best practices for contributing to generators.  If it is located in a different repo, please send feature requests, patches, and issues there.

###### Contributing to core

L.I.S.A. has several dependencies referenced in the `package.json` file that are not part of the project proper. Any proposed changes to those dependencies or _their_ dependencies should be sent to their respective projects (i.e. Trails etc.) Please do not send your patch or feature request to this repository, we cannot accept or fulfill it.

In case of doubt, open an issue in the [issue tracker](https://github.com/mylisabox/lisa-box/issues), ask your question in the [Gitter room](http://gitter.im/mylisabox/Lobby).  Especially if you plan to work on something big. Nothing is more frustrating than seeing your hard work go to waste because your vision does not align with a project's roadmap.  At the end of the day, we just want to be able to merge your code.

###### Submitting Pull Requests

0. If you don't know how to fork and PR, [Github has some great documentation](https://help.github.com/articles/using-pull-requests/).  Here's the quick version:
1. Fork the repo.
2. Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding functionality or fixing a bug, we need a test!
4. Make the tests pass and make sure you follow our syntax guidelines.
5. Add a line of what you did to CHANGELOG.md (right under `master`).
6. Push to your fork and submit a pull request to the appropriate branch

## Publishing Releases

All releases are tagged and published by the [L.I.S.A. Maintainers](https://github.com/orgs/mylisabox/teams) automatically via [Travis-CI](https://travis-ci.org/mylisabox/lisa-box). For a patch release, the deployment process is as follows:

1. Tag a release
```sh
$ npm version patch
```

2. Push the tag upstream (the "mylisabox" org)
```sh
$ git push upstream --tags
```

3. Travis-CI will publish the release to npm.
