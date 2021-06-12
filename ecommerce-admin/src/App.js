
import Header from "./containers/Header";
import Contents from "./containers/Content";
import Footer from "./containers/Footer";
import './App.css'
import { BrowserRouter as Router} from "react-router-dom";
import { Layout } from "antd";

function App() {
  return (
    <Layout>
      <Router>
        <Header />
        <Contents />
        <Footer />
      </Router>
    </Layout>
  );
}

export default App;
