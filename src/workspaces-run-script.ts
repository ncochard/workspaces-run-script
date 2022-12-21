import { ScriptFailed } from "./errors";
import { error, prefixed } from "./feedback";
import { main } from "./main";

((): void => {
    try {
        main();
    } catch (e) {
        if (error instanceof ScriptFailed) {
            prefixed(error.getScript(), `ERROR!`);
        } else {
            error("Something went wrong!");
            error(e);
        }
        process.exit(1);
    }
})();
