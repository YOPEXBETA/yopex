
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getCurrentOrganization} from "./organizationService";

export const fetchCurrentOrganization = createAsyncThunk(
    'organization/fetchCurrentOrganization',
    async (organizationId, thunkAPI) => {
        try {
            const response = await getCurrentOrganization(organizationId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    currentOrganization: null,
    loading: false,
    error: null,
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        resetOrganizationState: (state) => {
            state.currentOrganization = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentOrganization.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentOrganization.fulfilled, (state, action) => {
                state.currentOrganization = action.payload;
                state.loading = false;
            })
            .addCase(fetchCurrentOrganization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrganizationState } = organizationSlice.actions;
export default organizationSlice.reducer;
