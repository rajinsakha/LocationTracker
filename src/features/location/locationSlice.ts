import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type {RootState} from "../../app/store";

interface Marker {
    lat: number;
    lng: number;
  }
  
  interface AppState {
    customMarkers: Marker[];
    // locationList: Marker[];
  }
const initialState: AppState = {
    customMarkers:[],
    // locationList:[]
}

export const locationSlice = createSlice({
    name:'location',
    initialState,
    reducers:{
        addCustomMarker(state, action:PayloadAction<Marker>){
            state.customMarkers.push(action.payload);
        },
        clearCustomMarker(state){
            state.customMarkers = [];
        }
    }
})

export const {addCustomMarker, clearCustomMarker} = locationSlice.actions;

// export const selectMarkers = (state:RootState)=>state.location.customMarkers

export default locationSlice.reducer;