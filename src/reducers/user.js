const initialState = {
  userName: "",
  password: "",
  userPosts: "",
  description: "",
  followers: "",
  following: [],
  searchValue: "",
  likeCounter: "",
  followRequests: "",
  followingPosts: "",
  comment: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSERNAME": {
      state.userName = action.payload;
      return {
        ...state,
        userName: state.userName,
      };
    }

    case "GETUSERPOSTS": {
      return {
        ...state,
        userPosts: action.payload,
      };
    }

    case "NEWDESCRIPTION": {
      state.description = action.payload;
      return {
        ...state,
        description: state.description,
      };
    }

    case "UPLOADPOST": {
      state.description = "";
      return {
        ...state,
      };
    }

    case "DELETEPOST": {
      return {
        ...state,
      };
    }

    case "LIKEUSERPOST": {
      return {
        ...state,
      };
    }

    case "GETFOLLOWREQUESTS": {
      let l = action.payload;
      if (l) {state.followRequests = l.followrequest;}
      return {
        ...state,
        localStorageData: JSON.parse(localStorage.getItem("token")),
      };
    }

    case "ACCEPTFOLLOW": {
      return {
        ...state,
      };
    }
    case "DECLINEFOLLOW": {
      return {
        ...state,
      };
    }

    case "SEARCHUSERNAME": {
      state.searchValue = action.payload;
      return {
        ...state,
      };
    }

    case "FOLLOWANDUNFOLLOW": {
      
      return {
        ...state,
      };
    }
    case "GETUSERFOLLOWERSANDFOLLOWING": {
      let l = action.payload;
      if (l) {
        state.followers = l.names;
        state.following = l.followings;
      } else {
        state.followers = [];
        state.following = [];
      }
      return {
        ...state,
      };
    }

    case "SETUSERUSERNAME": {
      state.userName = action.payload;
      return {
        ...state,
      };
    }

   

    case "GETFOLLOWERPOSTS": {
      return {
        ...state,
        followingPosts: action.payload.posts1,
      };
    }

    case "ADDCOMMENT": {
      return {
        ...state,
      };
    }

    case "GETCOMMENT": {
      return {
        ...state,
        comment: action.payload,
      };
    }

    default:
      return state;
  }
};
export default reducer;
