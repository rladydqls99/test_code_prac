import { render } from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
render(<App totalItems={9} itemsPerPage={3} />, rootElement);
