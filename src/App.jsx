import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes/router'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import auth from './firebase/firebase.config'
import { getUser } from './features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        dispatch(getUser(user.email));
      }
    })
  }, [])

  return (
    <>
      <Toaster></Toaster>
      <RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App
