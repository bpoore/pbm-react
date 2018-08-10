import {
    FETCHING_LOCATION_TRACKING_ENABLED,
    FETCHING_LOCATION_TRACKING_SUCCESS,
    FETCHING_LOCATION_TRACKING_FAILURE,
} from '../actions/types'

export const initialState = {
    isFetchingLocationTrackingEnabled: false,
    lat: null,
    lon: null,
    locationTrackingServicesEnabled: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_LOCATION_TRACKING_ENABLED: 
            return {
                ...state,
                isFetchingLocationTrackingEnabled: true,
            }
        case FETCHING_LOCATION_TRACKING_SUCCESS:
            return {
                ...state,
                isFetchingLocationTrackingEnabled: false,
                lat: action.lat,
                lon: action.lon,
                locationTrackingServicesEnabled: true,
            }
        case FETCHING_LOCATION_TRACKING_FAILURE:
            return {
                ...state,
                isFetchingLocationTrackingEnabled: false,
                lat: null,
                lon: null,
                locationTrackingServicesEnabled: false,
            }
        default:
            return state
    }
}