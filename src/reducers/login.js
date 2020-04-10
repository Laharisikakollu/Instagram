const initialState = {
    userName: '',
    password: '',
    localStorageData: '',
    success: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAMECHANGE": {
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
            let l=JSON.parse(localStorage.getItem(state.userName))
            console.log(state.userName)
            state.role=l.role
            
            console.log(state.role)
            if(!l){
               
                return{
                    ...state,
                    uSuccess:false
                }
            }
            else{
               
                if(l.password===state.password)
                {
                    if(l.role==="admin"){
                        localStorage.setItem("role","admin")
                        return{
                            ...state,
                            uSuccess:true,
                            pSuccess:true,
                            success:true,
                            role:l.role,
                        }
                    }
                    else if(l.accept)
                    {
                        localStorage.setItem("role","user")
                        return{
                            ...state,
                            uSuccess:true,
                            pSuccess:true,
                            success:true,
                            role:l.role
                        }
                    }
                    else{
                        
                        return{
                            ...state,
                            uSuccess:true,
                            pSuccess:true,
                            success:false
                        }
                    }
                }
                else{
                   
                    return{
                        ...state,
                        uSuccess:true,
                        pSuccess:false
                    }
                }
            }
           
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
            return {
                ...state,
                localStorageData: localStorage.setItem(state.userName, JSON.stringify(action.payload))
            }
        }
        
        
        default: return state;
    }
}
export default reducer;