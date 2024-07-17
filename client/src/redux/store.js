import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import badgeSlice from "./badge/badgeSlice";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";
import globalSlice from "./global/globalSlice";
import organizationReducer from "./organization/organizationSlice";
// import { createStore, applyMiddleware, compose } from "redux";

// import thunk from "redux-thunk";
// import { RootReducer } from "./reducers/index";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   RootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default store;

const store = configureStore({
  reducer: {
    auth: authSlice,
    // badge: badgeSlice,
    // user: userSlice,
    // post: postSlice,
    global: globalSlice,
    organization: organizationReducer,
  },
});

export default store;
