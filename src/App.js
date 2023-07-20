import './styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import DriverDetail from './pages/driverDetail';
import DriverOverview from './pages/driverOverview';
import SignUpForm from './pages/signUpForm';
import SignUpStart from './pages/signUpStart';
import Login from './pages/login';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import CallToAction from './components/callToAction/callToAction';
import MyProfile from './pages/myProfile';
import RequireAuth from './app/requireAuth';

function App() {
  return (
    <>
      <BrowserRouter>

        <Header />
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='alldrivers' element={<DriverOverview />} />
          <Route path='driverdetail/:id' element={<DriverDetail />} />
          <Route path='myprofile' element={<RequireAuth><MyProfile /></RequireAuth>} />
          <Route path='signup' element={<SignUpStart />} />
          <Route path='signupform' element={<SignUpForm />} />
          <Route path='login' element={<Login />} />


        </Routes>

        <CallToAction />
        
      </div>

      <Footer />
      
      </BrowserRouter>
      
    </>
  );
}

export default App;
