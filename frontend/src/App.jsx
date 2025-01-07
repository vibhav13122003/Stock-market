
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { isSignin } from "./Store/Action/user";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

const login = useSelector((state) => state.user.login);
const user = useSelector((state) => state.user.user);
 const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isSignin());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter className='container'>
    
       
        
          {login ? (
            <>
                  <Route path='/dashboard' element={<Dashboard />} exact />
                  <Route path='/' element={<Navigate to='/dashboard' />} />
                </>
              )}
            </>
          ) : (
            <Route path='/' element={<AuthenticationPage />} exact />
          )}
      
        {login && user.role === "client" && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App
