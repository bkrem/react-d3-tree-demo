# react-d3-tree-demo

## Dev environment setup

### 1. Demo/playground
1. Clone this repo: `git clone https://github.com/bkrem/react-d3-tree-demo.git`
2. `cd react-d3-tree-demo`
3. Run `yarn` or `npm install` OR run `bash ./setup.sh` and skip to step 3

### 2. React-D3-Tree library
1. Inside the `react-d3-tree-demo` directory, clone the library: `git clone https://github.com/bkrem/react-d3-tree.git`
2. Run `yarn` or `npm install`

### 3. Running locally (+ hot reloading)
1. Set up 2 terminal windows, one in the `react-d3-tree-demo` directory, the other in `react-d3-tree-demo/react-d3-tree` (i.e. the sub-directory into which we cloned the library itself)
2. Run `yarn dev`/`npm run dev` in both
3. Any changes made to the demo app or the library should now automatically rebuild the library and reload the app with the fresh build.
