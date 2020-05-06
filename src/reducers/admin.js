
const initialState = {
  userName: "",
  password: "",
  role: "",
  localStorageData: "",
  success: "",
  requests: "",
  toggle: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERNAMECHANGE": {
      return {
        ...state,
        userName: action.payload,
      };
    }

    case "PASSWORDCHANGE": {
      return {
        ...state,
        password: action.payload,
      };
    }

    case "SUBMIT": {
      return {
        ...state,
        role: state.role,
      };
    }

    case "TOGGLEUSER": {
      state.toggle = !state.toggle;
      return {
        ...state,
        toggle: state.toggle,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        userName: "",
        password: "",
      };
    }
    case "GETREQUESTS": {
      state.requests = action.payload;
      return {
        ...state,
      };
    }

    case "SET": {
      return {
        ...state,
        localStorageData: localStorage.setItem(
          state.userName,
          JSON.stringify(action.payload)
        ),
      };
    }


    default:
      return state;
  }
};
export default reducer;
