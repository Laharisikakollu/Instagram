import { JsonWebTokenError } from "jsonwebtoken"

const initialState = {
    userName: '',
    password: '',
    localStorageData: '',
    success: false,
    role:''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAMECHANGE": {
            state.userName=action.payload
            return {
                ...state,
                userName: action.payload
            }
        }

        case "PASSWORDCHANGE": {
            return {
                ...state,
                password: action.payload
            }
        }
        case "SUBMIT": {
            // let l= localStorage.setItem("token",JSON.stringify(action.payload))
            // let l=action.payload
            // console.log(l)
            // console.log(state.userName)
            // state.role=l.role
            
            // console.log(action.payload)
            // localStorage.setItem("token",JSON.stringify(action.payload.token))

            state.role=action.payload.role;
            // localStorage.setItem("role",state.role);
            localStorage.setItem("token",JSON.stringify(action.payload.token));
            // console.log(action.payload.token)
            return {
                ...state,
                uSuccess: action.payload.uSuccess,
                pSuccess: action.payload.pSuccess,
                success: action.payload.success,
                role: action.payload.role
            }

            // if(!l){
               
            //     return{
            //         ...state,
            //         uSuccess:false
            //     }
            // }
            // else{
               
            //     if(l.password===state.password)
            //     {
            //         if(l.user.role==="admin"){
            //             localStorage.setItem("role","admin")
            //             return{
            //                 ...state,
            //                 uSuccess:true,
            //                 pSuccess:true,
            //                 success:true,
            //                 role:l.user.role,
            //             }
            //         }
            //         else if(l.user.isaccept)
            //         {
            //             localStorage.setItem("role","user")
            //             return{
            //                 ...state,
            //                 uSuccess:true,
            //                 pSuccess:true,
            //                 success:true,
            //                 role:l.user.role
            //             }
            //         }
            //         else{
                        
            //             return{
            //                 ...state,
            //                 uSuccess:true,
            //                 pSuccess:true,
            //                 success:false
            //             }
            //         }
            //     }
            //     else{
                   
            //         return{
            //             ...state,
            //             uSuccess:true,
            //             pSuccess:false
            //         }
            //     }
            // }
           
            return {
                ...state,
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                userName: '',
                password: ''
            }
        }
        case "GET": {
            return {
                ...state,
                localStorageData: JSON.parse(localStorage.getItem(state.userName))
            }
        }
        case "SET": {
            
                // ...state,
                // localStorageData: localStorage.setItem(state.userName, JSON.stringify(action.payload))
                state.userName = action.payload;
                console.log(state.userName)
                return {
                        ...state,
                        }
            }
        
        
        
        default: return state;
    }
}
export default reducer;