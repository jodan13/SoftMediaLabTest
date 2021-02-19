import { connect } from 'react-redux';

import Header from "../header";
import Footer from "../footer";
import Form from "../form";
import "./app.scss";


const App = (props: any) => {
  const submit = (values: any) => {
    console.log(values)
  }
  return (
    <>
      <Header />
      <Form onSubmit={submit} {...props}/>
      <Footer />
    </>
  )
}

export default connect(null)(App);
