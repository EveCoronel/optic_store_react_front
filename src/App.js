import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './components/register/register';
import Login from './components/login/login';
import Footer from './components/footer/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/navbar';
import Chat from './components/chat/chat';
import { AuthContextProvider } from './context/authContext';

function App() {
  return (
    <body className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
        <ToastContainer />
      </AuthContextProvider>
    </body>
  );
}

export default App;
