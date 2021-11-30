import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Cookies from "js-cookie";
import Main from "./pages/Main";
import AddForm from "./pages/AddForm";
import ViewForm from "./pages/ViewForm";
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import Pdf from "./pages/Pdf";
function checkUser() {
  let user = Cookies.get("username");
  console.log(user);
  if (user) {
    return true;
  }
  return false;
}
function printDocument() 
  {
    //const input = document.getElementById('divToPrint');
  
        const doc = new jsPDF();
       
        //get table html
        const pdfTable = document.getElementById('divToPrint');
        //html to pdf format
        var html = htmlToPdfmake(pdfTable.innerHTML);
      
        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();
      
  }
function App() {
  
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route
        render={(props) =>
          checkUser() == true ? (
            <>
              <Route exact path="/" component={Home} />
              <Route exact path="/main" component={Main} />
              <Route exact path="/form/:id" component={Form} />
              <Route exact path="/view/:id" component={ViewForm} />
              <Route exact path="/form" component={Form} />
              <Route exact path="/add-form" component={AddForm} />
              <Route exact path="/Pdf" component={Pdf} />
            </>
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    </Switch>
  );
}

export default App;

// render={props =>
//   checkUser() !=undefined ? (
//     <>
//     <Route path="/admin" component={Admin2} />
//     <Redirect from="/" to={props.location} />
//     </>
//   ) : (
//     <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//   )
// }
