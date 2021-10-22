/** **************************** Import Libs ****************************** */
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

/** **************************** Import Root Reducer ****************************** */
import { env } from "../config";
import rootReducer from "./rootReducer";

let middleware = [];
if (env === 0) {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
