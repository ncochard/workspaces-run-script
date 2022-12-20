export function makeString(value: any): string | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new Error(`Value is not a string: ${typeof value}`);
    }
    const trimmed = value.trim();
    if (trimmed.length === 0) {
        return undefined;
    }
    return trimmed;
}
export function makeBoolean(value: any): boolean {
    if (value === undefined) {
        return false;
    }
    if (value === null) {
        return false;
    }
    if (typeof value === "boolean") {
        return value;
    }
    if (typeof value === "string") {
        switch (value.toLowerCase()) {
            case "y":
            case "yes":
            case "true":
                return true;
            default:
                return false;
        }
    }
    return false;
}

export const unique = (input: string[]): string[] => input.filter((item, pos) => input.indexOf(item) === pos);

export function makeNumber(value: any, defaultValue: number): number {
    if (value === undefined) {
        return defaultValue;
    }
    if (value === null) {
        return defaultValue;
    }
    if (typeof value !== "string") {
        throw new Error(`Value is not a string: ${typeof value}`);
    }
    const trimmed = value.trim();
    if (trimmed.length === 0) {
        return defaultValue;
    }
    const result = Number.parseInt(trimmed, 10);
    if (isNaN(result)) {
        throw new Error(`Invalid number: ${trimmed}`);
    }
    return result;
}
