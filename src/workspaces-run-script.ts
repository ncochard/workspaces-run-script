import { error } from "./feedback";
import { main } from "./main";

((): void => {
    try {
        main();
    } catch (e) {
        error("Something went wrong!");
        error(e);
        process.exit(1);
    }
})();
