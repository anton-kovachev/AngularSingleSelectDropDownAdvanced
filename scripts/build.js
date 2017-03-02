({
    mainConfigFile: '../systemModules/main.js',
    appDir: '../',
    baseUrl: 'systemModules',
    dir: '../demobuild',
    paths: {
        //angular: 'empty:',
        //angularRoutes: 'empty:',
        //angularTable: 'empty:',
        //bootstrap: 'empty:',
        //uiBootstrap: 'empty:',
        //jqueryUI: 'empty:',
        //jqueryColorbox: 'empty:',
        //jquery: 'empty:',
        //domReady: 'empty:',
        //reactive: 'empty:',
        //moment: 'empty:',
        //ngDialog: 'empty:',
        //lodash: 'empty:',
        //angularDropdownMultiselect: 'empty:',
        //ngDraggable: 'empty:',
        //ngFlow: 'empty:',
        //angularLoadingBar: 'empty:',
        //angularUITree: 'empty:',
        //angularUiTreeFilter: 'empty:',
        //angularDragdrop: 'empty:',
        //ngSanitize: 'empty:',
        //fullCalendar: 'empty:',
        //chart: 'empty:',
        //textAngular: 'empty:',
        //angularChart: 'empty:',
        //textAngularSanitize: 'empty:',
        //textAngularRangy: 'empty:',
        //intro: 'empty:',
        //html2Canvas: 'empty:',
        //d3: 'empty:'
    },
    modules: [
        {
            name: 'main'
        }
    ],
    //fileExclusionRegExp: /^(r|build)\.js$/,
    fileExclusionRegExp: /^(testsResults|protractorTests|coverage|node_modules|(r|build)\.js)$/,
    optimizeCss: 'standard',
    //wrapShim: 'true',
    removeCombined: true,
    optimize: "uglify2",
    uglify2: {
        //Example of a specialized config. If you are fine
        //with the default options, no need to specify
        //any of these properties.
        output: {
            beautify: false
        },
        compress: {
            sequences: true,
            unsafe: false,
            global_defs: {
                DEBUG: false
            }
        },
        warnings: true,
        mangle: true
    }
})