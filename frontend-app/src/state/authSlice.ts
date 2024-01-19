import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, Credentials } from '../features/auth/interfaces';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};


export const loginUser = createAsyncThunk('auth/loginUser', async (credentials: Credentials) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status == 401) {
        const errorMessage = 'Email or Password is wrong please try again';
        throw new Error(errorMessage);
      }
      throw new Error('Login failed');
    }
    const { access_token, ...userData } = await response.json();
    localStorage.setItem('access_token', access_token);
    return userData;
  } catch (error) {
    throw new Error(error);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData: Credentials) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        const errorMessage = 'Email already exist, Please Try another one';
        throw new Error(errorMessage);
      }
      throw new Error('Registration failed');
    }

    // Assuming the response contains relevant registration data
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action?.error?.message ?? '';
      })
      .addCase(registerUser.pending, (state) => {
        state.user = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action?.error?.message ?? '';
      });
  },
});

export const authReducer = authSlice.reducer;
