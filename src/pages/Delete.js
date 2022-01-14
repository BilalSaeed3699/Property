import React, { Component } from "react";
import { Modal, Button } from "../components/Modal";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useHistory, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { DeleteFormData } from "../services/Form";


function Delete() {

    const [modalShow, setModalShow] = React.useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
    







export default Delete;


