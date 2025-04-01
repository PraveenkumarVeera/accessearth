import { SET_CENTER, SET_DESTINATION, SET_ZOOM } from "./mapaction";

const initalState = {
  destination: null,
  center: null,
  zoom:10,
};

const MapReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case SET_DESTINATION:
      return {
        ...state,
        destination: payload,
      };

      case SET_CENTER:
        return {
          ...state,
          center:payload
        }

        case SET_ZOOM:
          return {
             ...state,
             zoom:payload
        }

    default:
      return state;
  }
};

export default MapReducer;
