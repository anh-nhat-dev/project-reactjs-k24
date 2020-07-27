import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";

import reducers from "./reducers";

const persistConfig = {
  key: "redux-store",
  storage: storage,
  keyPrefix: "vietpro:",
};

const store = createStore(
  persistReducer(persistConfig, reducers),
  composeWithDevTools()
);

persistStore(store);

export default store;
