import { ScriptFailed } from "./errors";
import { error } from "./feedback";
import { main } from "./main";

((): void => {
    try {
        main();
    } catch (e) {
        if (error instanceof ScriptFailed) {
            error(`ERROR: ${error.getScript()}`);
        } else {
            error("Something went wrong!");
            error(e);
        }
        process.exit(1);
    }
})();
