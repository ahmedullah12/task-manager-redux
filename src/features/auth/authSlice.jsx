import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
    user: {},
    isLoading: true,
    isError: false,
    error: "",
    email: "",
};




export const createUser = createAsyncThunk("auth/createUser", async({email, password}) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
});
export const loginUser = createAsyncThunk("auth/loginUser", async({email, password}) => {
    const data = await signInWithEmailAndPassword(auth, email, password)
    return data.user.email;
});

export const googleLogin = createAsyncThunk("auth/googleLogin", async() => {
    const googleProvider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, googleProvider);
    return data.user;
})

export const getUser = createAsyncThunk("auth/getUser", async(email) => {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_DEV_URL}/user/${email}`);
    const data = await res.json();
    return data

})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {email: "", name: ""};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        })
        .addCase(createUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.email = payload;
            state.isError = false;
            state.error = "";
        })
        .addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.email = "";
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        })
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.email = payload;
            state.isError = false;
            state.error = "";
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.email = "";
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(googleLogin.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        })
        .addCase(googleLogin.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.email = payload.email;
            state.isError = false;
            state.error = "";
        })
        .addCase(googleLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.email = "";
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(getUser.pending, (state) => {
            state.isLoading =  true;
            state.isError = false;
            state.error = '';
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading =  false;
            state.user = action.payload;
            state.isError = false;
            state.error = '';
        })
        .addCase(getUser.rejected, (state, action) => {
            state.isLoading =  false;
            state.email = '';
            state.isError = true;
            state.error = action.error.message;
        })
    }
});
export const {logout} = authSlice.actions;

export default authSlice.reducer