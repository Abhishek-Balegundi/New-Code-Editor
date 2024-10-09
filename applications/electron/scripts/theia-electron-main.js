const fs = require('fs');
const path = require('path');
const os = require('os');

const javaPath = path.resolve(__dirname, '../resources/jdk');
const settingsPath = path.resolve(os.homedir(), '.theia-ide', 'settings.json');

let settings = {};
try {
    if (fs.existsSync(settingsPath)) {
        // Load existing settings
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    } else {
        // Ensure the .theia directory exists
        fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    }

    // Check if 'JavaSE-15' is already present in java.configuration.runtimes
    const runtimes = settings['java.configuration.runtimes'] || [];
    const javaRuntimeExists = runtimes.some(runtime => runtime.name === 'JavaSE-17');

    // Only write if 'JavaSE-17' is not already present
    if (!javaRuntimeExists) {
        settings['java.configuration.runtimes'] = [
            ...runtimes,
            {
                'name': 'JavaSE-17', // Actually Java 17
                'path': javaPath,
                'default': true
            }
        ];

        // Update the java home path
        settings['java.home'] = javaPath;

        // Write the updated settings back to settings.json
        // eslint-disable-next-line no-null/no-null
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
    }

} catch (error) {
    console.error('Error updating settings.json:', error);
    // Handle the error (like file permission issues), but proceed with the editor launch
}

// Theia plugin and environment setup
process.env.THEIA_DEFAULT_PLUGINS = `local-dir:${path.resolve(__dirname, '../', 'plugins')}`;
process.env.THEIA_PLUGINS = [
    process.env.THEIA_PLUGINS, `local-dir:${path.resolve(os.homedir(), '.theia-ide', 'plugins')}`
].filter(Boolean).join(',');

// Handover to the auto-generated electron application handler
require('../lib/backend/electron-main.js');
