const initialState = {
  userName: "",
  password: "",
  localStorageData: "",
  success: false,
  role: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERNAMECHANGE": {
      state.userName = action.payload;
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
      state.role = action.payload.role;

      localStorage.setItem("token", JSON.stringify(action.payload.token));

      return {
        ...state,
        uSuccess: action.payload.uSuccess,
        pSuccess: action.payload.pSuccess,
        success: action.payload.success,
        role: action.payload.role,
      };

      return {
        ...state,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        userName: "",
        password: "",
      };
    }
    case "GET": {
      return {
        ...state,
        localStorageData: JSON.parse(localStorage.getItem(state.userName)),
      };
    }
    case "SET": {
      state.userName = action.payload;

      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
export default reducer;
