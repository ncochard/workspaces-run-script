import { CommandOptions, Mode, SequentialScript } from "./types";

interface State {
    successes: string[];
    failures: string[];
    inProgress: string[];
}

const isInProgress =
    (state: State) =>
    (script: string): boolean =>
        state.inProgress.includes(script);
const isExecuted =
    (state: State) =>
    (script: string): boolean =>
        state.successes.includes(script) || state.failures.includes(script);
const isNotExecuted =
    (state: State) =>
    (script: string): boolean =>
        !isExecuted(state)(script);
const onStart =
    (state: State) =>
    (script: string): void => {
        const index = state.inProgress.indexOf(script);
        if (index >= 0) {
            throw new Error(`"${script}" should not be in the list.`);
        }
        state.inProgress.push(script);
    };
const onFinish =
    (state: State) =>
    (script: string): void => {
        const index = state.inProgress.indexOf(script);
        if (index < 0) {
            throw new Error(`"${script}" should be in the list.`);
        }
        state.inProgress.splice(index, 1);
    };
const onSuccess =
    (state: State) =>
    (script: string): void => {
        const index = state.successes.indexOf(script);
        if (index >= 0) {
            throw new Error(`"${script}" should not be in the list.`);
        }
        state.successes.push(script);
        onFinish(state)(script);
    };
const onFailure =
    (state: State) =>
    (script: string): void => {
        const index = state.failures.indexOf(script);
        if (index >= 0) {
            throw new Error(`"${script}" should not be in the list.`);
        }
        state.failures.push(script);
        onFinish(state)(script);
    };

const isNext =
    (state: State, command: CommandOptions) =>
    (script: SequentialScript): boolean => {
        if (state.failures.length > 0) {
            return false;
        }
        if (isExecuted(state)(script.name) || isInProgress(state)(script.name)) {
            return false;
        }
        if (state.inProgress.length > command.max) {
            return false;
        }
        switch (command.mode) {
            case Mode.Parallel:
                return true;
            case Mode.Sequential: {
                const outstandingDependencies = script.dependencies.filter(isNotExecuted(state));
                return outstandingDependencies.length === 0;
            }
            default:
                throw new Error(`Invalid mode: ${command.mode}`);
        }
    };

export async function executeScripts(scripts: SequentialScript[], command: CommandOptions): Promise<void> {
    const state: State = { failures: [], successes: [], inProgress: [] };
    async function triggerNextScripts(): Promise<void> {
        const nextScripts = scripts.filter(isNext(state, command));
        if (nextScripts.length === 0) {
            return;
        }
        await Promise.all(
            nextScripts.map(async s => {
                if (isExecuted(state)(s.name)) {
                    return;
                }
                try {
                    onStart(state)(s.name);
                    await s.execute();
                    onSuccess(state)(s.name);
                    await triggerNextScripts();
                } catch (error) {
                    onFailure(state)(s.name);
                    throw error;
                }
            })
        );
    }
    await triggerNextScripts();
}
