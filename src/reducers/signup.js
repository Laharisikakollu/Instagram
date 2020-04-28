const initialState = {
  userName: "",
  password: "",
  role: "",
  email: "",
  phone: "",
  localStorageData: "",
  success: "",
  userNameValidated: "",
  passwordValidated: "",
  roleValidated: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERNAMECHANGE": {
      return {
        ...state,
        userNameValidated: action.payload.success,
        userName: action.payload.userName,
      };
    }

    case "PASSWORDCHANGE": {
      return {
        ...state,
        passwordValidated: action.payload.success,
        password: action.payload.password,
      };
    }

    case "SUBMIT": {
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

    case "EMAIL": {
      return {
        ...state,
        emailValidated: action.payload.success,
        email: action.payload.email,
      };
    }

    case "PHONE": {
      return {
        ...state,
        phoneValidated: action.payload.success,
        phone: action.payload.phone,
      };
    }

    case "ROLE": {
      return {
        ...state,
        roleValidated: action.payload.success,
        role: action.payload.role,
      };
    }

    default:
      return state;
  }
};
export default reducer;
