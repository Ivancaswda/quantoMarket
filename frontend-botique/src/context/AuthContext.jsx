import {useState, useEffect, useContext} from "react";
import {createContext} from "react";
import {db, auth} from "../../firebase.js";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,
    sendPasswordResetEmail, onAuthStateChanged, signOut} from 'firebase/auth'
import {doc, getDoc, setDoc} from "firebase/firestore";

import {toast} from "react-toastify";

export const AuthContext = createContext()

export default function AuthProvider(props) {
    const [email, setEmail] = useState(()  => {
        return localStorage.getItem("email") || ""; // Если email есть в localStorage, берем его
    });
    const {children} = props
    const [userName, setUserName] = useState('')

    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [closeModal, setCloseModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const backendUrl = import.meta.env.VITE_BACKNED_URL
    async function signup(email, password) {
        setError('')
        setMessage('')
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log(`user has been created`, userCredential.user)
            const user = userCredential.user
            localStorage.setItem('user', JSON.stringify(user))
            setUserName(user.displayName)
            localStorage.setItem("email", JSON.stringify(email))
            return userCredential.user
        } catch (error) {
            setMessage(error.message)
            toast.error('Пользователь с такой email уже существует!', {
                style: {
                    background: '#000000',
                    color: 'white'
                }
            })
        }

    }

    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    async function saveUsername(userId, userName) {
        try {
            const docRef = doc(db, 'users', userId)
        } catch (error) {
            setError(`Error with saving Username function: ${error}`)
        }

    }
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function logout() {
        toast.success('Вы успешно вышли из аккаунта!')
        setGlobalUser(null)
        setGlobalUser(null)
        localStorage.removeItem('userName');
        setUserName('');
        localStorage.removeItem("email"); // Удаление email из localStorage
        setEmail('')

        return signOut(auth)
    }

    const value = {userName, setUserName, globalUser, setGlobalUser,
        globalData, setGlobalData, isLoading, setIsLoading,signup, logout, login,
       phoneNumber, setPhoneNumber, email, setEmail, backendUrl}




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.log('No active User')
                setGlobalUser(null)
                setGlobalUser(null)
                return;
            }

            console.log('Current user in Auth has been changed:', user)
            setGlobalUser(user);


            try {
                setIsLoading(true)

                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}

                if (docSnap.exists()) {
                    firebaseData = docSnap.data()

                    console.log('Found user Data:', firebaseData)
                }
                setGlobalData(firebaseData)
            } catch (error) {
                setError('Error fetching user data:', error.message)
            } finally {

                setIsLoading(false)

            }
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )



}

