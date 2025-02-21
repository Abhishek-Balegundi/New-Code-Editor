# Publishing

This guide contains the steps to publish a new version of the SimplifyQA Code Editor IDE. The preview, testing and release process is described in [README FILE](README.md)

Every commit to master will be published as a preview version.
Updates will only work when there was a version change.

## Update Package Versions and SimplifyQA Code Editor

If there was *no* SimplifyQA Code Editor release we usually want to increment the patch version by 1, e.g. 1.47.100 -> 1.47.101.

If there was a new SimplifyQA Code Editor *minor* release, e.g. 1.48.0, we want to use the same version as SimplifyQA Code Editor.

If there was a new SimplifyQA Code Editor *patch* release, e.g. 1.48.1, we use SimplifyQA Code Editor's patch version multiplied by 100, e.g. 1.48.100.

```sh
# Update mono repo version
yarn version --no-git-tag-version

# Update version of all packages
yarn lerna version --exact --no-push --no-git-tag-version

# Update yarn.lock
yarn
```

If there was a SimplifyQA Code Editor Release

* check if there are any breaking changes
* check if new built-ins are available
* check if any changes were made to the sample applications (e.g. new packages or additional configuration)

and adapt the code/built-ins accordingly.

Next, update the `Jenkinsfile`'s `copyInstallerAndUpdateLatestYml` invocation for windows. Here we have to specficy for which olders versions we want to enable direct (incremental) updates to this version on Windows.\
See <https://download.eclipse.org/theia/ide-preview/> for the available old versions.\
*We plan to automate this, but at the moment it's a manual step.*

E.g.:\
`copyInstallerAndUpdateLatestYml('windows', 'SimplifyQA-Code-Editor-Setup', 'exe', 'latest.yml', '1.46.0,1.46.100,1.47.0')`\
->\
`copyInstallerAndUpdateLatestYml('windows', 'SimplifyQA-Code-Editor-Setup', 'exe', 'latest.yml', '1.46.0,1.46.100,1.47.0,1.47.100')`

Finally, open a PR with your changes.

## Upgrade Dependencies

We want to run `yarn upgrade` regularily to get the latest versions of our dependencies.
You may want to keep this in a separate PR as this might require IP Reviews from the Eclipse Foundation and may take some time.
After an upgrade you should check the used `electron` version in the `yarn.lock`.
If there was an update, update `electronVersion` in `applications/electron/electron-builder.yml` accordingly.

## Preview, Testing and Release Process for the SimplifyQA Code Editor IDE

Once a new SimplifyQA Code Editor Platform release is available, the SimplifyQA Code Editor IDE is updated to the new version. This automatically makes a new preview build available (see above). Once the preview build is successfully tested by the preview testers, it is published as a new official version, also available for automatic update. The detailed steps for this process are described in the following:

1. Create a new preview version of the SimplifyQA Code Editor IDE as decribed above (do not publish as stable yet)
2. Create a new discussion [here](https://github.com/eclipse-theia/theia/discussions) based on the following template:
>SimplifyQA Code Editor IDE 1.xz preview testing</br></br>
>The new version 1.XZ.0 of the SimplifyQA Code Editor IDE is available on the preview channel now, please join the preview testing! You can download it here: {link to the download}. You can update your existing installation by setting the preference *updates.channel* to *preview*. 
Please respond here when you were able to test the preview without finding blockers, by commenting with a :heavy_check_mark:. If you find any issues, please mention them in this thread and report them as an issue once confirmed by other testers.

3. Announce availability of the preview release on theia-dev@eclipse.org based on the following template:
>SimplifyQA Code Editor IDE 1.xz preview</br></br>
>Hi,</br></br>The new version 1.XZ.0 of the SimplifyQA Code Editor IDE is available on the preview channel now. Please join the preview test and help us stabilizing the release. Please visit this discussion for more information and for coordination: {link to the Github discussion created above}</br></br>best regards,

4. Fix reported blockers and create patch releases (This is a community effort and typically takes 1-2 weeks)
5. Once no blockers are left, declare the release final (see publishing above).
6. Post official release announcement

**If too many issues are found, fixes take too long or no corresponding ressources are available to fix things, a SimplifyQA Code Editor IDE release might be skipped. This means, it will not update to a new SimplifyQA Code Editor version, but wait for the next version.**
