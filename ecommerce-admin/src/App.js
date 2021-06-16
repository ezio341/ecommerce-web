
import Header from "./containers/Header";
import Contents from "./containers/Content";
import Footer from "./containers/Footer";
import './App.css'
import { BrowserRouter as Router} from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import {verifySession} from './Action/authAction'

function App(props) {
  const [auth, setAuth] = useState(false)
  const user = localStorage.getItem('auth')

  useEffect(()=>{
    props.verifySession()
  },[])

  useEffect(()=>{
    setAuth(props.auth.auth)
  },[props.auth])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <Header isAuthenticated={auth}/>
        <Contents isAuthenticated={auth}/>
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
const mapDispatchToProps = dispatch =>{
  return bindActionCreators({
    verifySession
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
