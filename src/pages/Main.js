import MUIDataTable from "mui-datatables";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getTableData } from "../services/City";

const columns = [
  "Name",
  "Creator",
  "Created At",
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

function Main() {
  const history = useHistory();
  const location = useLocation();
  // const { data } = location.state

  const [formData, setFormData] = React.useState(null);

  React.useEffect(() => {
    getTableData().then((res) => {
      console.log(res);
      setFormData(res);
    });
  }, []);

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
            title={"Registered Properties"}
            data={
              formData &&
              formData.map((item, index) => {
                return {
                  Name: item.form_name,
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
                        style={{margin:'1%',padding: '9px'}}
                      >
                        <span class="fa fa-eye"> View</span>
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
      </div>
    </Layout>
  );
}

export default Main;
