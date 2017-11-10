#!/usr/bin/env bash

set -e # exit if a command fails

echo 'Installing react-d3-tree-demo dependencies...';
yarn
echo 'Demo dependencies installed!'

echo 'Cloning react-d3-tree library repo...'
git clone https://github.com/bkrem/react-d3-tree.git
echo 'Cloned sucessfully!'

echo 'Installing library dependencies...'
cd react-d3-tree
yarn
cd ..
echo 'Library dependencies installed successfully!'

exit 0
