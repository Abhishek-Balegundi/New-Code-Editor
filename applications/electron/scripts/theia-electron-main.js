const fs = require('fs');
const path = require('path');
const os = require('os');

var javaPath = path.resolve(__dirname, '../resources/jdk');
console.log(process.platform);
if(process.platform=='darwin'){
    javaPath = javaPath = path.resolve(__dirname, '../resources/jdk/Contents/Home');
}
const settingsPath = path.resolve(os.homedir(), '.theia-ide', 'settings.json');

let settings = {};
try {
    if (fs.existsSync(settingsPath)) {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    } else {
        fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    }

    const runtimes = settings['java.configuration.runtimes'] || [];
    let javaRuntimeExists = false;

    for (const runtime of runtimes) {
        if (runtime.name === 'JavaSE-17') {
            javaRuntimeExists = true;

            if (!fs.existsSync(runtime.path)) {
                runtime.path = javaPath;
                runtime.default = true;
            }
            break;
        }
    }

    if (!javaRuntimeExists) {
        settings['java.configuration.runtimes'] = [
            ...runtimes,
            {
                'name': 'JavaSE-17',
                'path': javaPath,
                'default': true
            }
        ];
    }

    if(settings['java.jdt.ls.java.home'] !== javaPath){
        settings['java.jdt.ls.java.home'] = javaPath;
    }

    if ('java.home' in settings) {
        delete settings['java.home'];
    }
    const autoSaveValue = settings['files.autoSave'];
        if(autoSaveValue !== 'afterDelay'){
            settings['files.autoSave'] = 'afterDelay';
        }
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');

} catch (error) {
    console.error('Error updating settings.json:', error);
}

process.env.THEIA_DEFAULT_PLUGINS = `local-dir:${path.resolve(__dirname, '../', 'plugins')}`;
process.env.THEIA_PLUGINS = [
    process.env.THEIA_PLUGINS, `local-dir:${path.resolve(os.homedir(), '.theia-ide', 'plugins')}`
].filter(Boolean).join(',');

require('../lib/backend/electron-main.js');
