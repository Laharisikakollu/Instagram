const initialState = {
    userName: '',
    password: '',
    role: '',
    localStorageData: '',
    success: '',
    requests:'',
    users:'',
    toggle:false
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
            
            return {
                ...state,
                role:state.role
               
            }
        }

        case "TOGGLEUSER":{
            state.toggle=!state.toggle
            return{
                ...state,
                toggle:state.toggle
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                userName: '',
                password: ''
            }
        }
        case "GETREQUESTS": {
            let a1 = JSON.parse(localStorage.getItem("admin"))
            return {
                ...state,
                localStorageData: JSON.parse(localStorage.getItem(state.userName)),
                requests: a1.requests
            }
        }

       

        case "SET": {
            return {
                ...state,
                localStorageData: localStorage.setItem(state.userName, JSON.stringify(action.payload))
            }
        }

        
        case "ACCEPT": {
           
            let l = JSON.parse(localStorage.getItem("admin"));
            if (action.payload.value === true) {
                let l2=l.requests.splice(action.payload.index, 1);
                let l3=JSON.parse(localStorage.getItem(l2[0]))
                l3.accept=true;
                localStorage.setItem(l2[0],JSON.stringify(l3))
                console.log(l2)
                l.users=(l.users.concat(l2))
                console.log(l.users);
                localStorage.setItem("admin",JSON.stringify(l))
                return {
                    ...state,
                    localStorageData: l,
                }
            }
            return {
                ...state,
                localStorageData:l
            }
        }

        case "REJECT": {
            let l = JSON.parse(localStorage.getItem("admin"));
            if (action.payload.value === true) {
                
                l.requests.splice(action.payload.index, 1);
                localStorage.setItem("admin",JSON.stringify(l))
                return {
                    ...state,
                    localStorageData: l,
                }
            }
            return {
                ...state,
                localStorageData:l
            }
        }

        case "GETUSERS": {
            let a2 = JSON.parse(localStorage.getItem("admin"))
            return {
                ...state,
                localStorageData: JSON.parse(localStorage.getItem(state.userName)),
                users: a2.users
            
            }
            
            
        }

        
       
        
        default: return state;
    }
}
export default reducer; 