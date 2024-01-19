import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Flight, FlightState } from '../features/flights/interfaces';

// Define the initial state
const initialState: FlightState = {
    records: [],
    loading: false,
    error: null,
    selectedRecord: { id: 0, airline: '', code: '', date: '', capacity: '' },
};

export const fetchFlights = createAsyncThunk('flights/fetchFlights', async () => {
    try {
        const response = await fetch('http://localhost:5000/flights');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch flights');
    }
});

export const fetchFlight = createAsyncThunk('flights/fetchFlight', async (id: string | undefined) => {
    try {
        const res = await fetch(`http://localhost:5000/flights/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch flight');
    }
});


export const deleteFlight = createAsyncThunk("flights/deleteFlight", async (id: number) => {
    try {
        await fetch(`http://localhost:5000/flights/${id}`, {
            method: "DELETE",
        });
        return id;
    } catch (error) {
        throw new Error('Failed to delete flight');
    }
});

export const addFlight = createAsyncThunk("flights/addFlight", async (newFlight: Flight) => {
    try {
        const res = await fetch("http://localhost:5000/flights", {
            method: "POST",
            body: JSON.stringify(newFlight),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error('Failed to add a new flight');
    }
});


export const updateFlight = createAsyncThunk("flights/updateFlight", async (item: Flight) => {
    try {
        const res = await fetch(`http://localhost:5000/flights/${item.id}`, {
            method: "PATCH",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error('Failed to update a flight');
    }
});


// Create the flight slice
const flightSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle the async thunk actions for fetch flights
        builder
            .addCase(fetchFlights.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFlights.fulfilled, (state, action) => {
                state.loading = false;
                state.records = action.payload;
            })
            .addCase(fetchFlights.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch flights';
            });


        // Handle the async thunk actions for fetch selected flight
        builder
            .addCase(fetchFlight.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFlight.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRecord = action.payload;
            })
            .addCase(fetchFlight.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch flights';
            });
        // Handle the async thunk actions for delete flight
        builder
            .addCase(deleteFlight.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFlight.fulfilled, (state, action) => {
                state.loading = false;
                state.records = state.records.filter((el) => el.id !== action.payload);
            })
            .addCase(deleteFlight.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to delete flights';
            });

        // Handle the async thunk actions for add a new flight
        builder
            .addCase(addFlight.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFlight.fulfilled, (state, action) => {
                const newFlight = action.payload;
                state.records = { ...state.records, [newFlight.id]: newFlight };
                state.loading = false;
            })
            .addCase(addFlight.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to add flights';
            });


        // Handle the async thunk actions for update selected flight
        builder
            .addCase(updateFlight.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFlight.fulfilled, (state, action) => {
                const updatedFlight = action.payload;
                state.records[updatedFlight.id] = updatedFlight;
                state.loading = false;
            })
            .addCase(updateFlight.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to update flight';
            });
    },
});


export const flightReducer = flightSlice.reducer;


