import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AuthenticationPage from "./components/Authentication";
import { isSignin } from "./Store/Action/user";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const login = useSelector((state) => state.user.login); // Access `login` from `user`
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isSignin());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {login ? (
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<Navigate to='/dashboard' />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
