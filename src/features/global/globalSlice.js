import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../instance";
import qs from 'qs';

const url = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  glbLoading: false,
  sideMenuCollapsed: false,
  resellerId: "",
  loading: false,
  legendClickStatus: "",
};

export const downloadFiles = createAsyncThunk(
  "graduate/downloadFiles",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${url}/api/v2/req/download?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

 

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleSideMenuCollapse: (state, action) => {
      state.sideMenuCollapsed = action.payload;
    },
    setResellerId: (state, action) => {
      state.resellerId = action.payload;
    },
    setLegendClickStatus: (state, action) => {
      state.legendClickStatus = action.payload;
    },

    cleanResellerId: (state, action) => {
      state.resellerId = initialState.resellerId;
    },
    cleanLegendClickStatus: (state, action) => {
      state.legendClickStatus = initialState.legendClickStatus;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(downloadFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadFiles.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(downloadFiles.rejected, (state) => {
        state.loading = false;
      })


      
      
  },
});

export default globalSlice.reducer;
export const {
  handleSideMenuCollapse,
  setResellerId,
  cleanResellerId,
  setLegendClickStatus,
  cleanLegendClickStatus,
} = globalSlice.actions;
