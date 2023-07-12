import './styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import DriverDetail from './pages/driverDetail';
import DriverOverview from './pages/driverOverview';
import DriverProfile from './pages/driverProfile';
import SignUpForm from './pages/signUpForm';
import SignUpStart from './pages/signUpStart';
import StudentProfile from './pages/studentProfile';
import Login from './pages/login';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
    <>
      <BrowserRouter>

        <Header />
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='alldrivers' element={<DriverOverview />} />
          <Route path='driverdetail' element={<DriverDetail />} />
          <Route path='driverprofile' element={<DriverProfile />} />
          <Route path='signup' element={<SignUpStart />} />
          <Route path='signupform' element={<SignUpForm />} />
          <Route path='studentprofile' element={<StudentProfile />} />
          <Route path='login' element={<Login />} />

{/* Driver Profile and Student Profile needs to be RequireAuth */}

        </Routes>
        
      </div>

      <Footer />
      
      </BrowserRouter>
      
    </>
  );
}

export default App;
