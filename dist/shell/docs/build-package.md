#How to build and run package

1. cd into your package
2. Run `lsc build package` which will copy shell into './dist/shell'
3. cd into './build' directory and run `gulp` which compiles and copies, templates, js, css into  '/dist' and './dist/shell/packages/packageName/
4. Add config.json file to the copied shell at '../dist/shell' with contents(replace package_name with name of your package):
```javascript
{
  "packages": [
    {
      "ui": "../../packages/<package_name>/js/app.js"
    }
  ]
}
```
5. cd into 'dist/shell' and run `atom-shell ./` Note: can also be run as web app for testing