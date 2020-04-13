const initialState = {
    userName:'',
    password:'',
    userPosts:'',
    description:'',
    followers: '',
    following: '',
    searchValue: '',
    likeCounter: '',
    followRequests:''
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

     case "SETUSERNAME":{

        state.userName=action.payload
         return{
             ...state,
             userName:state.userName
         }
     }

     case "GETUSERPOSTS":{

        let a1 = JSON.parse(localStorage.getItem(action.payload))
        if(a1){
            state.userPosts=a1.posts
        }
        else{
            state.userPosts=null;
        }
        return {
            ...state,
            userPosts: state.userPosts,
            userName: state.userName,
        }
    }

     case "NEWDESCRIPTION": {
        console.log("entered new descriprion")
        console.log(action.payload)
        state.description = action.payload;
        console.log(state.description)
        return {
            ...state,
            description: state.description
        }
    }

     case "UPLOADPOST":{

        let a1=JSON.parse(localStorage.getItem(state.userName))
        console.log(state.description)
        let a2={...action.payload,description:state.description,likeCounter:[]}
       
        state.userPosts.push(a2)
        console.log(state.userPosts)
        a1.posts=state.userPosts
        localStorage.setItem(state.userName,JSON.stringify(a1))
        state.description=''
         return{
             ...state,
             userPosts:state.userPosts
         }
     }

     case "DELETEPOST":{

        let userName=action.payload.userName
        let a1=JSON.parse(localStorage.getItem(userName))
      
        console.log(a1)
        let a2={...action.payload,description:state.description,likeCounter:[]}
       
        let index=action.payload.key
        console.log(index)
        a1.posts.splice(index,1)
        
       
        console.log(a1)
        localStorage.setItem(userName,JSON.stringify(a1))
        
         return{
             ...state,
             userPosts:a1.posts
         }
     }

     case "LIKEUSERPOST": {
        let l = JSON.parse(localStorage.getItem(action.payload.postUserName))
        console.log(action.payload.key)
        console.log(action.payload.postUserName)
        let index = action.payload.key
        console.log(index)

        console.log("object   :   " + l.posts[index].likeCounter);
        let index2=l.posts[index].likeCounter.indexOf(action.payload.presentUser)
        if(index2>-1){
            l.posts[index].likeCounter.splice(index2,1);
        }
        else{
            l.posts[index].likeCounter.push(action.payload.presentUser);
        }
        console.log(l.posts)
        state.userPosts = l.posts
        localStorage.setItem(action.payload.postUserName, JSON.stringify(l))
        return {
            ...state,
        }
    }

    case "GETFOLLOWREQUESTS": {
        let l = JSON.parse(localStorage.getItem(action.payload))
        if (l)
            state.followRequests = l.followRequests
        return {
            ...state,
            localStorageData: JSON.parse(localStorage.getItem(action.payload)),
        }
    }
    case "ACCEPTFOLLOW": {
       
        let l = JSON.parse(localStorage.getItem(state.userName));
        if (action.payload.value === true) {
          
            let l2 = l.followRequests.splice(action.payload.index, 1);
            console.log(l.followRequests)

            l.followers = (l.followers.concat(l2))
            console.log(l.users);
            let l3 = JSON.parse(localStorage.getItem(l2[0]))
            l3.following.push(state.userName);
            localStorage.setItem(state.userName, JSON.stringify(l))
            localStorage.setItem(l2[0], JSON.stringify(l3))
            state.localStorageData = l;
            state.followRequests = l.followRequests;
            state.followers = l.followers
            return {
                ...state,
                localStorageData: l,
            }
        }
        return {
            ...state,
            localStorageData: l
        }
    }
    case "DECLINEFOLLOW": {
        let l = JSON.parse(localStorage.getItem(state.userName));
        if (action.payload.value === true) {
            console.log("entered decline if")
            let l2 = l.followRequests.splice(action.payload.index, 1);
            localStorage.setItem(state.userName, JSON.stringify(l))
            state.followRequests = l.followRequests;
            state.followers = l.followers
            return {
                ...state,
                localStorageData: l,
            }
        }
        return {
            ...state,
            localStorageData: l
        }
    }

    case "SEARCHUSERNAME": {
        state.searchValue = action.payload;
        return {
            ...state
        }
    }

    case "FOLLOWANDUNFOLLOW": {
        let searchedUser = JSON.parse(localStorage.getItem(action.payload));
        if (!searchedUser) {
            return {
                ...state
            }
        }
        let loggedUser = JSON.parse(localStorage.getItem(state.userName));
        if (action.payload === state.userName) {
            return {
                ...state
            }
        }
        if (searchedUser) {
            console.log(action.payload)
            if (searchedUser.followers.find(element => element === state.userName)) {
                let index = searchedUser.followers.indexOf(state.userName);
                if (index > -1) {
                    searchedUser.followers.splice(index, 1);

                }
                index = loggedUser.following.indexOf(action.payload)
                if (index > -1) {
                    loggedUser.following.splice(index, 1);
                }
            }
            else {
                searchedUser.followRequests.push(state.userName);
                // localStorage.setItem("admin", JSON.stringify(l));
                // searchedUser.followers.push(state.userName)
                // loggedUser.following.push(action.payload)
            }
            console.log(searchedUser.followers)
            state.followers = searchedUser.followers;
            state.following = searchedUser.following;
        }
        else {
            state.followers = [];
            state.following = [];
        }
        localStorage.setItem(action.payload, JSON.stringify(searchedUser));
        localStorage.setItem(state.userName, JSON.stringify(loggedUser));
        return {
            ...state
        }
    }
    case "GETUSERFOLLOWERSANDFOLLOWING": {
        let l = JSON.parse(localStorage.getItem(action.payload))
        if (l) {
            console.log(l.followers)
            state.followers = l.followers;
            state.following = l.following
        }
        else {
            state.followers = [];
            state.following = [];
        }
        return {
            ...state
        }
    }

        
        default: return state;
    }
}
export default reducer; 