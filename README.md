# react-d3-tree-demo

Demo/Debug application for [react-d3-tree](github.com/bkrem/react-d3-tree)

> ⚠️ **DEPRECATED** ⚠️  
> This auxilliary demo repo has been archived and is no longer maintained.  
> This demo now lives in the `react-d3-tree` repo's [`/demo` directory](https://github.com/bkrem/react-d3-tree/tree/master/demo).  

## Dev environment setup

### react-d3-tree library
1. Clone the `react-d3-tree` library to your local machine: `git clone https://github.com/bkrem/react-d3-tree.git`
2. Run `yarn` or `npm install`
3. Run `yarn/npm link`

### Demo/playground
1. Clone this repo: `git clone https://github.com/bkrem/react-d3-tree-demo.git`
2. `cd react-d3-tree-demo`
3. Run `yarn` or `npm install`
4. Run `yarn/npm link react-d3-tree`
5. You should see a confirmation that `node_modules/react-d3-tree` has been symlinked to your local copy.

### Running locally (+ hot reloading)
1. Set up 2 terminal windows, one in the `react-d3-tree-demo` directory, the other in `react-d3-tree`.
2. To continously build the library, use `yarn build:watch` in the `react-d3-tree` directory.
3. To automatically re-build the demo in response changes in `react-d3-tree`, use `yarn dev` in the `react-d3-tree-demo` directory.
4. Any changes made to the demo app or the library should now automatically rebuild the library and reload the app with the fresh build (via `nodemon`).
