import React from 'react';
// import logo from './logo.svg';
import './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDetails } from "./store";
import UploadDocument from "./components/document/UploadDocument";
import Recording from "./components/associate-useful/Recording/RecordingMainComponent";
import Welcome from "./components/home/Welcome";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PageNotFound from "./views/PageNotFound";
import LoginComponent from "./components/auth/LoginComponent";
import "./styles/app.css";
import SampleDocuments from './components/document/SampleDocuments';
import Offboarding from './views/Offboarding';

function App() {
  const user = useSelector(userDetails);
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Offboarding />}>
            <Route path="/" element={<Welcome />} />
            {user && (
              <>
                <Route path="uploadDocuments" element={<UploadDocument />} />
                <Route path="sampleDocuments" element={<SampleDocuments />} />
                <Route path="recording" element={<Recording />} />
              </>
            )}
            <Route path="auth/login" element={<LoginComponent />} />
          </Route>
          {/* <Route path="sample" element={<Sample />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
