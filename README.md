# workspaces-run-script

Use this utility in a mono-repo. Install this utility in your mono-repo using the command `yarn add -D workspaces-run-script`.

The command `workspaces-run-script --script test --package my-app --parallel` will run the `yarn run test` command in the projects `my-app` and any other project that are dependencies of `my-app` in the mono-repo.

The command above is similar to `yarn workspaces foreach -ptR --from '{my-app}' run test` except it will not fail if one of the workspace projects does not have a `test` script.

If you are using [NX](https://nx.dev/), the command abose is also similar to `npx nx test my-app` except that you do not need to create a `nx.json` file to indicate that the `test` script should be executed on all dependencies of the `my-app` project.

    Usage: workspaces-run-script [options]

    Options:
        -s, --script <script>    name of the script to be executed on each package
        -p, --package <package>  name of the package on which to execute the script
        --parallel               executes the command on all dependencies in parallel
        --sequential             executes the command on all dependencies sequentially
        -m, --max <max>          maximum number of parallel processes
        -h, --help               display help for command