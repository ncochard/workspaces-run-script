import { CommandOptions, Mode } from "./types";
import { program } from "commander";
import { makeBoolean, makeNumber, makeString } from "./utilities";
import { commands } from "./constants";
import { bail } from "./feedback";

export function getCommand(): CommandOptions {
    program.option(
        `-${commands.script.initials}, --${commands.script.label} <${commands.script.label}>`,
        commands.script.description
    );
    program.option(
        `-${commands.package.initials}, --${commands.package.label} <${commands.package.label}>`,
        commands.package.description
    );
    program.option(`--${commands.parallel.label}`, commands.parallel.description);
    program.option(`--${commands.sequential.label}`, commands.sequential.description);
    program.option(
        `-${commands.max.initials}, --${commands.max.label} <${commands.max.label}>`,
        commands.max.description
    );

    program.parse(process.argv);
    const options = program.opts();
    const pkg = makeString(options[commands.package.label]);
    const max = makeNumber(options[commands.max.label], 10);
    const script = makeString(options[commands.script.label]);
    let parallel = makeBoolean(options[commands.parallel.label]);
    const sequential = makeBoolean(options[commands.sequential.label]);
    if (sequential && parallel) {
        bail(`--${commands.sequential.label} and --${commands.parallel.label} are incompatible`);
    }
    if (!sequential && !parallel) {
        parallel = true;
    }
    if (!script?.length) {
        bail(`missing --${commands.script.label} parameter`);
        throw new Error(`script is mandatory`);
    }
    if (!pkg?.length) {
        bail(`missing --${commands.package.label} parameter`);
        throw new Error(`package is mandatory`);
    }
    return { package: pkg, script, mode: parallel ? Mode.Parallel : Mode.Sequential, max };
}
