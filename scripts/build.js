({
    mainConfigFile: '../systemModules/main.js',
    appDir: '../',
    baseUrl: 'systemModules',
    dir: '../demobuild',
    paths: {
        
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