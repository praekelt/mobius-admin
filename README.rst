Mobius Admin
=====
**Agnostic admin interface built on admin-on-rest.**

.. contents:: Contents
    :depth: 1

Requirements
------------

 - npm
 - nvm
 - yarn

Installation
------------

Run the following command sequence to get up and running::

    $ git clone git@github.com:praekelt/mobius-admin.git
    $ cd mobius-admin/
    $ nvm use
    $ yarn install
    $ yarn build

When any of the front-end stack files change (jsx, js, sass, etc.), you migt
have to run `yarn build` again.  To avoid this manually rebuilding in yarn,
you can run yarn in development mode with:

    $ yarn build:dev

When you do this yarn will watch for updated files and rebuild as required.
