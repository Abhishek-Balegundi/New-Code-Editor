<br/>
<div id="theia-logo" align="center">
    <br />
    <img src="media\readmeImage.png" alt="Theia Logo" width="900" height="270"/>
    <h3>SimplifyQA Code Editor IDE</h3>
</div>

<div id="badges" align="center">

The SimplifyQA Code Editor IDE is built with this project.\
SimplifyQA Code Editor IDE also serves as a template for building desktop-based products based on the Eclipse Theia platform.

</div>

## Developers
#### Abhishek M Balegundi (abhishek.m@simplify3x.com)

## License

- [SimplifyQA Code Editor License](LICENSE)

## Trademark

"SimplifyQA Code Editor" is a trademark of the SimplifyQA
<https://www.simplify3x.com/>

## What is this?

SimplifyQA Code Editor IDE is a modern IDE for cloud and desktop. The SimplifyQA Code Editor IDE is based on the [Theia platform](https://theia-ide.org).
The Theia IDE is available as a [downloadable desktop application](https://theia-ide.org//#theiaidedownload). You can also try the latest version of the Theia IDE online. The online test version is limited to 30 minutes per session and hosted via Theia.cloud. Finally, we provide an [experimental Docker image](#docker) for hosting the Theia IDE online.

The SimplifyQA Code Editor IDE also serves as a **template** for building desktop-based products based on the Eclipse Theia platform, as well as to showcase SimplifyQA Code Editor capabilities. It is made up of a subset of existing Eclipse Theia features and extensions. [Documentation is available](https://theia-ide.org/docs/composing_applications/) to help you customize and build your own Eclipse Theia-based product.

## Development 

### Requirements

Please check SimplifyQA Code Editor's [prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites), and keep node versions aligned between Theia IDE and that of the referenced Theia version.

### Documentation

Documentation on how to package Theia as a Desktop Product may be found [here](https://theia-ide.org/docs/blueprint_documentation/)

### Repository Structure

- Root level configures mono-repo build with lerna
- `applications` groups the different app targets
  - `browser` contains a browser based version of SimplifyQA Code Editor IDE that may be packaged as a Docker image
  - `electron` contains the electron app to package, packaging configuration, and E2E tests for the electron target.
- `theia-extensions` groups the various custom theia extensions for the SimplifyQA Code Editor IDE
  - `product` contains a Theia extension contributing the product branding (about dialogue and welcome page).
  - `updater` contains a Theia extension contributing the update mechanism and corresponding UI elements (based on the electron updater).
  - `launcher` contains a Theia extension contributing, for AppImage applications, the option to create a script that allows to start the SimplifyQA Code Editor IDE from the command line by calling the 'theia' command.

### Build

For development and casual testing of the SimplifyQA Code Editor IDE, one can build it in "dev" mode. This permits building the IDE on systems with less resources, like a Raspberry Pi 4B with 4GB of RAM.

```sh
# Build "dev" version of the app. Its quicker, uses less resources, 
# but the front end app is not "minified"
yarn && yarn build:dev && yarn download:plugins
```

Production applications:

```sh
# Build production version of the Eclipse Theia IDE app
yarn && yarn build && yarn download:plugins
```

### Package the Applications

ATM we only produce packages for the Electron application.

```sh
yarn package:applications
# or
yarn electron package
```

The packaged application is located in `applications/electron/dist`.

### Create a Preview Electron Electron Application (without packaging it)

```sh
yarn electron package:preview
```

The packaged application is located in `applications/electron/dist`.

### Running E2E Tests on Electron

The E2E tests basic UI tests of the actual application.
This is done based on the preview of the packaged application.

```sh
yarn electron package:preview
yarn electron test
```

### Running Browser app

The browser app may be started with

```sh
yarn browser start
```

and connect to <http://localhost:3000/>

### Troubleshooting

- [_"Don't expect that you can build app for all platforms on one platform."_](https://www.electron.build/multi-platform-build)
- _Still didn't get how to build Code Editor? Contact developer Abhishek M Balegundi._ (abhishek.m@simplify3x.com)
