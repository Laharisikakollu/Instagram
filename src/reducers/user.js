const initialState = {
    userName:'',
    password:'',
    userPosts:'',
    description:'',
    
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
            ...state
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

        
        default: return state;
    }
}
export default reducer; 