export enum Mode {
    Sequential,
    Parallel,
}

export interface CommandOptions {
    script: string;
    package: string;
    mode: Mode;
    max: number;
}

export interface PackageDetails {
    name: string;
    dependencies: string[];
    scripts: string[];
}
export interface SequentialScript {
    name: string;
    dependencies: string[];
    execute: () => Promise<void>;
}
