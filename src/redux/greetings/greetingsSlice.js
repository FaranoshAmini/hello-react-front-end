import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000/api/greetings/random_greeting";

export const fetchGreetings = createAsyncThunk(
  "messages/fetchGreetings",
  async (thunkAPI) => {
    try {
      const resp = await axios.get(url);
      console.log(resp)
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const initialState = {
  loading: false,
  messages: [],
  errors: null,
  isLoading: false,
};

const messagesSlice = createSlice({
  name: "messageList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGreetings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGreetings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    }).addCase(fetchGreetings.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error.message
    });
  },
});

export default messagesSlice.reducer;
