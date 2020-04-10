const initialState = {
    userName: '',
    password: '',
    role: '',
    email: '',
    phone: '',
    localStorageData: '',
    success: '',
    
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
                // userName: '',
                // password: ''
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
            if(state.role === "user")
            {
                let a1=JSON.parse(localStorage.getItem("admin"))
                a1.requests.push(state.userName)
                localStorage.setItem("admin", JSON.stringify(a1))
            }
           
            return {
                ...state,
                localStorageData: localStorage.setItem(state.userName, JSON.stringify(action.payload))
            }
        }
        case "EMAIL": {

            return {
                ...state,
                email: action.payload
            }
        }
        case "PHONE": {

            return {
                ...state,
                phone: action.payload
            }
        }
        case "ROLE": {

            return {
                ...state,
                role: action.payload
            }
        }
        case "VALIDATE": {
            
            if (!state.userName) {
               
                return {
                    ...state,
                    success: false
                }
            }
            if (!state.email) {
                
                return {
                    ...state,
                    success: false
                }
            }
            console.log("enterd p1-1")
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
               
                return {
                    ...state,
                    success: false
                }
            }
            if (!/^\d{10}$/.test(state.phone)) {
          
                return {
                    ...state,
                    success: false
                }
            }
            
            if (state.userName.length < 4) {
               
                return {
                    ...state,
                    success: false
                }
            }
            if (state.userName.length > 30) {
               
                return {
                    ...state,
                    success: false
                }
            }
            if (!/^[A-Z0-9_-]{3,30}$/i.test(state.username)) {
                
                return {
                    ...state,
                    success: false
                }
            } // Add uniqueness
            if (!state.password) {
                
                return {
                    ...state,
                    success: false
                }
            }
            if (state.password.length < 8) {
                
                return {
                    ...state,
                    success: false
                }
            }
          
            return {
                ...state,
                success: true
            }
        }
        default: return state;
    }
}
export default reducer;