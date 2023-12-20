import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlicer";
import commentSlice from "./commentSlicer";


const store = configureStore({

    reducer:{
        auth:authSlice,
        comments : commentSlice
    }

})

export default store;