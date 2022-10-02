import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    objectID: 13406,
    apiData: {}

}

export const dataSlice = createSlice({
    //Setting API data to state
    name: 'data',
    initialState,
    reducers: {
        //use initialstate to set data
        setData: (state, action) => {
            return { ...state, apiData: action.payload }
        },
        //Re-setting state back to initial values
        clearData: () => {
            return initialState
        },

        //Incrementing the ID by one
        incrementID: (state) => {
            return { ...state, objectID: state.objectID + 1 }
        },

        //Decrementing the ID by one
        decrementID: (state) => {
            return { ...state, objectID: state.objectID - 1 }
        },

        //Entering a custom ID
        inputID: (state, action) => {
            return { ...state, objectID: action.payload }
        }
    }
})

//export everthing out as a slice action 
export const { setData, clearData, incrementID, decrementID, inputID } = dataSlice.actions

export const fetchData = () => {
    const fetchDataThunk = async (dispatch, getState) => {
        let state = getState()
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectID}`)
        const resData = await response.json()
        dispatch(setData(resData))
    }
    return fetchDataThunk
}

export default dataSlice.reducer