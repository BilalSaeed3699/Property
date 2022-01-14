import MUIDataTable from "mui-datatables";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getTableData } from "../services/City";
import "../index.css";
import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Typography,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { deleteFormData } from "../services/Form";

const columns = [
  {
    name: "Address",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Creator",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Created At",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Action",
    options: {
      filter: false,
      sort: false,
    },
  },
];

const options = {
  filterType: "dropdown",
  download: false,
  print: false,
  selectableRowsHeader: false,
  viewColumns: false,
  selectableRows: false,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Main() {
  const history = useHistory();
  const location = useLocation();
  // const { data } = location.state

  const [formData, setFormData] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  React.useEffect(() => {
    getTableData().then((res) => {
      console.log(res);
      setFormData(res);
    });
  }, []);

  const [loading,setLoading] = React.useState(false)

  if (formData === null) return <Loader />;

  return (
    <Layout title="Search Properties" subtitle="Search Properties">
      <div class="container">
        <div style={{ margin: "1%" }} className="text-right">
          <button
            class="btn-lg btn btn-secondary mb-12 "
            onClick={() => history.push("/add-form")}
          >
            <span class="fa fa-plus"> Add New Proforma</span>
          </button>
        </div>

        {formData && (
          <MUIDataTable
            style={{
              backgroundcolor: "black !important",
              color: "white !important",
            }}
            title={"Registered Properties"}
            data={
              formData &&
              formData.map((item, index) => {
                return {
                  Address: item.form_name.slice(1, item.form_name.length - 1),
                  Creator: item.form_creator,
                  "Created At": item.form_creation_date,
                  Action: (
                    <>
                      <button
                        onClick={() =>
                          history.push("/form/" + item.form_id, {
                            form_id: item.form_id,
                          })
                        }
                        className="btn btn-secondary"
                      >
                        <span class="fa fa-pen"> Edit</span>
                      </button>
                      <button
                        onClick={() =>
                          history.push("/view/" + item.form_id, {
                            form_id: item.form_id,
                          })
                        }
                        className="btn btn-primary"
                        style={{ margin: "1%", padding: "9px" }}
                      >
                        <span class="fa fa-eye"> View</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelected(item.form_id);
                          setModalShow(true);
                        }}
                        className="btn btn-danger"
                        style={{ margin: "1%", padding: "9px" }}
                      >
                        <span class="fa fa-trash"> Delete</span>
                      </button>
                    </>
                  ),
                };
              })
            }
            columns={columns}
            options={options}
          />
        )}

        <Dialog
          open={modalShow}
          onClose={() => setModalShow(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Proforma</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure You Want to Delete this Proforma ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => setModalShow(false)}
              className="btn btn-primary"
              style={{ margin: "1%", padding: "9px" }}
            >
              <span>Close</span>
            </button>
            <button
              onClick={() => {
                if (selected) {
                  setLoading(true);
                  deleteFormData(selected).then((res) => {
                    setModalShow(false);
                    setLoading(false)
                    window.location.reload()
                  });
                  
                }
              }}
              className="btn btn-danger"
              style={{ margin: "1%", padding: "9px" }}
              disabled={loading}
            >
               {loading && (
                      <span
                        class="spinner-border spinner-border-sm mr-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}Delete
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
}

export default Main;
