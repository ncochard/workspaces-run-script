export class ScriptFailed extends Error {
    private _script;
    constructor(script: string) {
        const msg = `ERROR: ${script}`;
        super(msg);
        this._script = script;
        Object.setPrototypeOf(this, ScriptFailed.prototype);
    }
    getScript() {
        return this._script;
    }
}
