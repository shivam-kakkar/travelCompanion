import React from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Show from "./components/Show";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div id="appcontainer">
      <Header />
      <div id="middle">
        <List />
        <Show />
      </div>
      <Footer />
    </div>
  );
};

export default App;
