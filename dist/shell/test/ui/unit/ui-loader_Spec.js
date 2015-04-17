define([
    'ui-loader'
], function (uiLoader) {
    'use strict';

    describe('ui-loader', function () {

        describe('.loadJSON', function () {

            var onSuccess,
                onFailure,
                request,
                responses;

            beforeEach(function () {
                responses = {
                    success: {
                        status: 200,
                        responseText: '{"packages": []}'
                    },
                    failure: {
                        status: 404,
                        responseText: ''
                    }
                };
                jasmine.Ajax.install();
                onSuccess = jasmine.createSpy('onSuccess');
                onFailure = jasmine.createSpy('onFailure');
            });

            it('can retrieve a JSON file', function () {
                uiLoader.loadJSON('../../config.json', onSuccess);
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith(responses.success);
                expect(onSuccess).toHaveBeenCalledWith(null, JSON.parse(responses.success.responseText));
            });

            it('returns an error if it fails to retrieve the JSON file', function () {
                uiLoader.loadJSON('../../config.json', onFailure);
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith(responses.failure);
                expect(onFailure).toHaveBeenCalledWith(jasmine.any(Object), null);
            });

        });

        describe('.setDependencies', function () {

            it('retrieves modules from the given args then sets them as dependencies of the app', function () {
                var args = [{name: 'mod1'}, {name: 'mod2'}],
                    app = {requires: []};
                uiLoader.setDependencies(args, app);
                expect(app.requires).toEqual(['mod1', 'mod2']);
            });

        });

        describe('.getPackageData', function () {

            it('retrieves package metadata', function () {
                var pkgData = {
                    'packages': [
                        {
                            name: 'pack1',
                            ui: 'path/to/ui/module1',
                            styles: 'path/to/stylesheet1'
                        },
                        {
                            name: 'pack1',
                            ui: 'path/to/ui/module2',
                            styles: 'path/to/stylesheet2'
                        }
                    ]
                };
                var result = uiLoader.getPackageData(pkgData);
                expect(result.styleSheetPaths).toContain('path/to/stylesheet1', 'path/to/stylesheet2');
                expect(result.uiModulePaths).toContain('path/to/ui/module1', 'path/to/ui/module2');
            });

            it('returns an object with empty array property values if there was no metadata', function () {
                var emptyData = {
                    'packages': []
                };
                var result = uiLoader.getPackageData(emptyData);
                expect(result.styleSheetPaths.length).toBe(0);
                expect(result.uiModulePaths.length).toBe(0);

                result = uiLoader.getPackageData(null);
                expect(result.styleSheetPaths.length).toBe(0);
                expect(result.uiModulePaths.length).toBe(0);
            });

        });

        describe('.link', function () {

            it('adds a stylesheet link to the HTML', function () {
                var cssUrl = 'url/to/app.css',
                    tag = {rel: null, href: null},
                    document = {
                        createElement: jasmine.createSpy('createElement').and.returnValue(tag),
                        head: {
                            appendChild: jasmine.createSpy('appendChild')
                        }
                    };
                uiLoader.link(cssUrl, document);
                expect(document.createElement).toHaveBeenCalledWith('link');
                expect(document.head.appendChild).toHaveBeenCalledWith({rel: 'stylesheet', href: cssUrl});
            });

        });

    });

});