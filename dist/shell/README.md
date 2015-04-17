# LabShare Shell

##Before you start
1. Globally install bower, gulp, and atom-shell: `npm install -g bower gulp atom-shell`
2. Clone shell: `git clone https://github.com/LabShare/shell.git`
3. In shell, run: `npm install` to install shell dependencies
4. Then in shell, run: `npm link`
5. Clone or create the repository in which the package will be kept
6. In that repository where your package will be kept, run: `npm link ls-shell` (this allows use of 'lsc' cli in your repo)
7. Then run: `lsc package create <package-name>` which will generate the template structure for your package
8. Then in the root of your package run `npm install` to install package dependencies

###[How to Create a LabShare Package](docs/create-package.md)
###[How to Build and Run a LabShare Package](docs/build-package.md)
