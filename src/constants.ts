export const projectName = "workspaces-run-script";

export const commands = {
    script: {
        label: "script",
        description: "name of the script to be executed on each package",
        initials: "s",
    },
    package: {
        label: "package",
        description: "name of the package on which to execute the script",
        initials: "p",
    },
    parallel: {
        label: "parallel",
        description: "executes the command on all dependencies in parallel",
    },
    sequential: {
        label: "sequential",
        description: "executes the command on all dependencies sequentially",
    },
    max: {
        label: "max",
        description: "maximum number of parallel processes",
        initials: "m",
    },
};
