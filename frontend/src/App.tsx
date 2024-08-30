import { Route, Routes } from 'react-router-dom'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'

function App() {

  return (
    <div className="app">
      <h1>App for User Authentication</h1>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
