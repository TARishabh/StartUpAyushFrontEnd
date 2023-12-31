// import ChatForm from "./components/ChatForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import MidNavbar from "./components/MidNavbar";
import LowerNavbar from './components/LowerNavbar';
import HomePage from './components/HomePage';
import IndividualStartupDetails from './components/IndividualStartupDetails';


const App = () => {
  return (
    <Router>
      <Header/>
      <MidNavbar/>
      <LowerNavbar/>
      <Routes>
      <Route path="/" element={<HomePage />} caseSensitive />
      <Route path="/startup/:id" element={<IndividualStartupDetails />}caseSensitive />
      </Routes>
    </Router>
  );
};

export default App;
