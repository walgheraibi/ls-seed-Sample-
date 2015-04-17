/**
 * @description Basic LabShare package generator that is based on the
 * APM package generator: https://github.com/atom/apm.
 */
var path = require('path'),
    _ = require('lodash'),
    wrench = require('wrench'),
    fs = require('fs-plus'),
    packageGenerator = module.exports,
    templatePath = path.resolve(__dirname, '..', '..', 'templates', 'package');

/**
 * @description Creates the basic structure of a LabShare package inside the given packagePath.
 *
 * Throws an exception if a file/directory read, write, or create fails.
 *
 * @param {String} packagePath is the path where the files and directories will be created
 * @param {String} packageName is the name that will be assigned to all the template placeholders
 */
packageGenerator.generateFromTemplate = function (packagePath, packageName) {
    fs.makeTreeSync(packagePath);

    _.each(wrench.readdirSyncRecursive(templatePath), function (childPath) {
        var templateChildPath = path.resolve(templatePath, childPath),
            relativePath = templateChildPath.replace(templatePath, '').replace(/^\//, '');
        relativePath = packageGenerator._replacePackageNamePlaceholders(relativePath, packageName);

        var sourcePath = path.join(packagePath, relativePath);
        if (fs.existsSync(sourcePath)) {
            return;
        }
        if (fs.isDirectorySync(templateChildPath)) {
            fs.makeTreeSync(sourcePath);
        } else if (fs.isFileSync(templateChildPath)) {
            fs.makeTreeSync(path.dirname(sourcePath));
            var contents = fs.readFileSync(templateChildPath).toString();
            contents = packageGenerator._replacePackageNamePlaceholders(contents, packageName);
            fs.writeFileSync(sourcePath, contents);
        }
    });
};

packageGenerator._replacePackageNamePlaceholders = function (string, packageName) {
    var placeholderRegex = /__(?:(package-name)|([pP]ackageName))__/g;
    return string.replace(placeholderRegex, function (match, dash, camel) {
       if (dash) {
           return dasherize(packageName);
       } else if (camel) {
           if(/[a-z]/.test(camel[0])) {
               packageName = packageName[0].toLowerCase() + packageName.slice(1);
           } else if (/[A-Z]/.test(camel[0])) {
               packageName = packageName[0].toUpperCase() + packageName.slice(1);
           }
           return camelize(packageName);
       }
    });
};

function camelize(string) {
    return string.replace(/[_-]+(\w)/g, function(match) {
        return match[1].toUpperCase();
    });
}

function dasherize(string) {
    string = string[0].toLowerCase() + string.slice(1);
    return string.replace(/([A-Z])|(_)/g, function (match, letter) {
        return letter ? '-' + letter.toLowerCase() : '-';
    });
}
