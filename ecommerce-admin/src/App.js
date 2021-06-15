
import Header from "./containers/Header";
import Contents from "./containers/Content";
import Footer from "./containers/Footer";
import './App.css'
import { BrowserRouter as Router} from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";

function App(props) {
  const {auth} = props

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <Header />
        <Contents isAuthenticated={auth.auth}/>
        <Footer />
      </Router>
    </Layout>
  );
}

const mapStateToProps = (state) =>{
  return {
    ...state
  }
}

export default connect(mapStateToProps)(App);
