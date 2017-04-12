#!/usr/bin/env node

//
// This hook copies various resource files from our version control system directories into the appropriate platform specific location
//


// configure all the files to copy.  Key of object is the source file, value is the destination location.  It's fine to put all platforms' icons and splash screen files here, even if we don't build for all platforms on each developer's box.
var filestocopy = [{
    "config/android/res/drawable-land-hdpi/screen.png": "platforms/android/res/drawable-land-hdpi/screen.png"
}, {
    "config/android/res/drawable-land-ldpi/screen.png": "platforms/android/res/drawable-land-ldpi/screen.png"
}, {
    "config/android/res/drawable-land-mdpi/screen.png": "platforms/android/res/drawable-land-mdpi/screen.png"
}, {
    "config/android/res/drawable-land-xhdpi/screen.png": "platforms/android/res/drawable-land-xhdpi/screen.png"
}, {
    "config/android/res/drawable-port-hdpi/screen.png": "platforms/android/res/drawable-port-hdpi/screen.png"
}, {
    "config/android/res/drawable-port-ldpi/screen.png": "platforms/android/res/drawable-port-ldpi/screen.png"
}, {
    "config/android/res/drawable-port-mdpi/screen.png": "platforms/android/res/drawable-port-mdpi/screen.png"
}, {
    "config/android/res/drawable-port-xhdpi/screen.png": "platforms/android/res/drawable-port-xhdpi/screen.png"
}, {
    "config/android/res/mipmap-hdpi/icon.png": "platforms/android/res/mipmap-hdpi/icon.png"
}, {
    "config/android/res/mipmap-ldpi/icon.png": "platforms/android/res/mipmap-ldpi/icon.png"
}, {
    "config/android/res/mipmap-mdpi/icon.png": "platforms/android/res/mipmap-mdpi/icon.png"
}, {
    "config/android/res/mipmap-xhdpi/icon.png": "platforms/android/res/mipmap-xhdpi/icon.png"
} ];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile = path.join(rootdir, key);
        var destfile = path.join(rootdir, val);
        //console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
        }
    });
});
