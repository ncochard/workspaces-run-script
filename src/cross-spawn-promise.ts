import { ChildProcess, SpawnOptions } from "child_process";
import crossSpawn from "cross-spawn";
import split from "split";
import chalk from "chalk";

const insertPrefix = (prefix: string) => chalk.bold(`[${prefix}]`);

export class CrossSpawnError extends Error {
    exitStatus?: number;
}

const closeArgsToError = (code: number | null, signal: NodeJS.Signals | null): CrossSpawnError | null => {
    if (signal !== null) {
        return new CrossSpawnError(`Exited with signal ${signal}`);
    }
    if (code !== 0 && code !== null) {
        const err = new CrossSpawnError(`Exited with status ${code}`);
        err.exitStatus = code;
        return err;
    }
    return null;
};

export interface CrossSpawnOptions extends SpawnOptions {
    encoding?: string;
}
const mapper = (prefix: string) => (line: string) => `${insertPrefix(prefix)} ${line}\n`;

export function executeCommand(cmd: string, args: string[], prefix: string): Promise<void> {
    let childProcess: ChildProcess;
    return new Promise<void>((resolve, reject) => {
        childProcess = crossSpawn(cmd, args, {});

        childProcess.stdout?.pipe(split(null, mapper(prefix))).pipe(process.stdout);
        childProcess.stderr?.pipe(split(null, mapper(prefix))).pipe(process.stderr);

        childProcess.once("exit", (code, signal) => {
            const error = closeArgsToError(code, signal);
            if (error != null) {
                reject(error);
            } else {
                resolve();
            }
        });

        childProcess.once("error", reject);
    });
}
