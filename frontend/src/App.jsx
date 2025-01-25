import { useState } from 'react'

import './App.css'
import AdminDashBoard from './components/AdminDashBoard'
import SubmissionForm from "./components/SubmissionForm";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider>
    
       <AdminDashBoard />
        <SubmissionForm />
  
     
    </MantineProvider>
  )
}

export default App
