// src/App.js
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import TokenValidator from "./components/TokenValidator";

const App = () => {
  return (
    <Provider store={store}>
      <TokenValidator />
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
};

export default App;
