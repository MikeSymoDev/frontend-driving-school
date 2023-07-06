import './styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import DriverDetail from './pages/driverDetail';
import DriverOverview from './pages/driverOverview';
import DriverProfile from './pages/driverProfile';
import SignUpForm from './pages/signUpForm';
import SignUpStart from './pages/signUpStart';
import StudentProfile from './pages/studentProfile';

function App() {
  return (
    <>
      <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='alldrivers' element={<DriverOverview />} />
          <Route path='driverdetail' element={<DriverDetail />} />
          <Route path='driverprofile' element={<DriverProfile />} />
          <Route path='signup' element={<SignUpStart />} />
          <Route path='signupform' element={<SignUpForm />} />
          <Route path='studentprofile' element={<StudentProfile />} />


        </Routes>
        
      </div>
      
      </BrowserRouter>
      
    </>
  );
}

export default App;
