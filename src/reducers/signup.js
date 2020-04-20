const jwt = require('jsonwebtoken');
const initialState = {
    userName: '',
    password: '',
    role: '',
    email: '',
    phone: '',
    localStorageData: '',
    success: '',
    userNameValidated:'',
    passwordValidated:'',
    roleValidated:''
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAMECHANGE": {
            let success="warning"
            state.userName=action.payload
            console.log("a1")
            if (state.userName.length < 4) {
               state.userNameValidated=success
               console.log("a2")
                return {
                    ...state,
                   userNameValidated:success
                }
            }
            if (state.userName.length > 30) {
                state.userNameValidated=success
                console.log("a3")
                return {
                    ...state,
                    userNameValidated:success
                }
            }
            if (!/^[A-Z0-9_-]{3,30}$/i.test(state.username)) {
                state.userNameValidated=success
                console.log("a4")
                return {
                    ...state,
                     userNameValidated:success
                }
            } 
            state.userNameValidated="success"
            return {
                ...state,
                userNameValidated:"success",
                userName: action.payload
            }
        }

        case "PASSWORDCHANGE": {

            let success="warning"
            state.password=action.payload
            if (!state.password) {
                
                return {
                    ...state,
                    passwordValidated:success
                }
            }
            if (state.password.length < 8) {
                
                return {
                    ...state,
                    passwordValidated:success
                }
            }
            state.passwordValidated="success"
            return {
                ...state,
                passwordValidated:"success",
                password: action.payload
            }
        }
        case "SUBMIT": {
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
        // case "SET": {
        //     if(state.role === "user")
        //     {
        //         let a1=JSON.parse(localStorage.getItem("admin"))
        //         a1.requests.push(state.userName)
        //         localStorage.setItem("admin", JSON.stringify(a1))
        //     }
           
        //     return {
        //         ...state,
        //         localStorageData: localStorage.setItem(state.userName, JSON.stringify(action.payload))
        //     }
        // }
        case "EMAIL": {

            let success="warning"
            state.email=action.payload
            if (!state.email) {
                
                return {
                    ...state,
                    emailValidated:success
                }
            }
            console.log("enterd p1-1")
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
               
                return {
                    ...state,
                    emailValidated:success
                }
            }
            state.emailValidated="success"

            return {
                ...state,
                emailValidated:"success",
                email: action.payload
            }
        }
        case "PHONE": {
            let success="warning"
            state.phone=action.payload
            if (!/^\d{10}$/.test(state.phone)) {
          
                return {
                    ...state,
                    phoneValidated:success
                }
            }
            state.phoneValidated="success"
            return {
                ...state,
                phoneValidated:"success",
                phone: action.payload
            }
        }
        case "ROLE": {

            // let role=jwt.decode(JSON.parse(localStorage.getItem("token")))
            // console.log(role)
            let success="warning"
           
            state.role=action.payload
            console.log(state.role)
            if (!state.role) {
                
                return {
                    ...state,
                    roleValidated:success
                }
            }
            state.roleValidated="success"
            return {
                ...state,
                roleValidated:"success",
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