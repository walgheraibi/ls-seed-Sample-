var path = require('path');
var temp = require('temp').track();
var fs = require('fs-plus');

describe("PackageGenerator", function () {

    var packageGenerator,
        packagePath,
        currentDir;

    beforeEach(function () {
        packageGenerator = require('../../src/lib/package-generator');
        currentDir = temp.mkdirSync('lsc-package-create-');
        spyOn(process, 'cwd').andReturn(currentDir);
        packagePath = path.join(currentDir, 'fake-package');
    });

    afterEach(function () {
        temp.cleanupSync();
    });

    describe('when creating a package', function () {

        it('generates the proper file structure', function () {
            packageGenerator.generateFromTemplate(packagePath, 'fake-package');

            expect(fs.existsSync(packagePath)).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'src', 'lib'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'src', 'api'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'src', 'cli'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'src', 'ui'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'test'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'docs'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'build'))).toBeTruthy();

            expect(fs.existsSync(path.join(packagePath, 'src', 'lib', 'window.js'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'src', 'ui', '.bowerrc'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'src', 'ui', 'bower.json'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, '.npmignore'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'package.json'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, '.gitignore'))).toBeTruthy();
            expect(fs.existsSync(path.join(packagePath, 'LICENSE'))).toBeTruthy();

            var pkg = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json')));
            var bowerPkg = JSON.parse(fs.readFileSync(path.join(packagePath, 'src', 'ui', 'bower.json')));

            expect(pkg.name).toBe('fake-package');
            expect(pkg.bugs).toEqual({ 'url': 'https://github.com/LabShare/fake-package/issues' });
            expect(pkg.contributors).toBe('https://github.com/LabShare/fake-package/graphs/contributors');
            expect(pkg.repository).toEqual({ type : 'git', url : 'https://github.com/LabShare/fake-package.git' });
            expect(pkg['labshare-package']).toBeDefined();

            expect(bowerPkg.name).toBe('fake-package');
            expect(bowerPkg.homepage).toBe('https://github.com/LabShare/fake-package.git');
        });

    });
});
