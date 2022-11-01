import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomTokenContextProvider } from "./contexts/TokenContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
import ProfilePage from "./pages/ProfilePage";
import NewLinkPage from "./pages/NewLinkPage";
import { CustomAlertContextProvider } from "./contexts/AlertContext";
import Alert from "./components/Alert";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
import gemaVerde from "./assets/images/gemaverde.png";
import gemaRoja from "./assets/images/gemaroja.png";
import { useState } from "react";

function App() {
  const [useGemaVerde, setUseGemaVerde] = useState(gemaVerde);
  const [useGemaRoja, setUseGemaRoja] = useState(gemaRoja);
  return (
    <BrowserRouter>
      <CustomTokenContextProvider>
        <CustomAlertContextProvider>
          <Header
            useGemaRoja={useGemaRoja}
            setUseGemaRoja={setUseGemaRoja}
            useGemaVerde={useGemaVerde}
            setUseGemaVerde={setUseGemaVerde}
          />
          <main>
            <Routes>
              <Route
                path="/user/register"
                element={
                  <RegisterPage
                    setUseGemaRoja={setUseGemaRoja}
                    setUseGemaVerde={setUseGemaVerde}
                  />
                }
              />
              <Route
                path="/user/login"
                element={
                  <LoginPage
                    setUseGemaRoja={setUseGemaRoja}
                    setUseGemaVerde={setUseGemaVerde}
                  />
                }
              />
              <Route path="/" element={<Landing />} />
              <Route path="/user/profile/:userId" element={<ProfilePage />} />
              <Route path="/link/new" element={<NewLinkPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Alert></Alert>
          <Footer></Footer>
        </CustomAlertContextProvider>
      </CustomTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
