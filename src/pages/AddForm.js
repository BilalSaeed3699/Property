import React from "react";
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import { groupBy } from "../utils";
import TabComponent from "../components/TabComponent";
import Components from "../services/Components";
import { getParams, getParamsData } from "../services/City";
import Loader from "../components/Loader";
import { addFormPost, editFormPost } from "../services/Form";
import { useHistory } from "react-router-dom";
import { info } from "daisyui/colors/colorNames";
import { amazonUpload } from "../utils/amazonUpload";
import customSortFunction from "../utils/arrays";

function AddForm(props) {
  const history = useHistory();
  const [object, setObject] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [tabs, setTabs] = React.useState([]);
  const [tabsImage, setTabsImage] = React.useState({});

  const [active, setActive] = React.useState(null);

  const [submit, setSubmit] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [formId, setFormId] = React.useState(0);

  const [response, setResponse] = React.useState(null);

  React.useEffect(() => {
    getParams().then((res) => {
      let resp = res.sort((a, b) => (a.ParamOrder > b.ParamOrder ? 1 : -1));
      setData(resp.map((item) => ({ ...item, Value: "No" })));
      let obj = groupBy(resp, "Phase");
      setObject(obj);
    });
  }, []);

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    addFormPost(data, formId, tabsImage).then((res) => {
      setResponse(res);

      console.log(res);
      setFormId(res.FormId);
      let structures = {};
      res.StructureTypes.map((str, index) => {
        let newArr = [];
        str.Calculations.map((item) => {
          newArr.push({
            Phase: item.Phase,
            ParameterTypeId: item.ParameterTypeId,
            ParameterId: item.ParameterId,
            ParameterName: item.ParameterName,
            value: item.value,
            ischecked: false,
            structureType: str.StructureType,
          });
        });
        structures[str.StructureType] = groupBy(newArr, "Phase");
        structures[str.StructureType].StructureImages = [];
        let imgs = tabsImage;
        imgs[str.StructureType] = [
          {
            structure_type_id: str.StructureType,
            image_type: "Google Map Location",
            image_name: "",
            image_url:
              "https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg",
          },
          {
            structure_type_id: str.StructureType,
            image_type: "Lot Dimension",
            image_name: "",
            image_url:
              "https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg",
          },
          {
            structure_type_id: str.StructureType,
            image_type: "Water Main",
            image_name: "",
            image_url:
              "https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg",
          },
          {
            structure_type_id: str.StructureType,
            image_type: "Sewer Main",
            image_name: "",
            image_url:
              "https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg",
          },
        ];
        setTabsImage(imgs);
      });
      setTabs(structures);
      console.log("MeraData", data);
      console.log("Myphase",structures)
      setActive(Object.keys(structures)[0]);

      setSubmit(true);
      setLoading(false);
      document.getElementById("collapseADD").classList.toggle("collapse");
    });
  };
  const onSubmit1 = (e) => {
    setLoading(true);
    e.preventDefault();
    setTabsImage({})

    
    editFormPost(data, formId, tabsImage,tabs).then((res) => {
      setResponse(res);
      setFormId(res.FormId);
      console.log("Mera response123", res);
      let resp = res.FormValues.sort((a, b) => a.ParamOrder - b.ParamOrder);
      setData(resp.map((item) => ({ ...item, Value: item.value })));
      let obj = groupBy(resp, "Phase");
      setObject(obj);
      console.log("Mera data", data);
      let structures = {};
      res.StructureTypes.map((str, index) => {
        let newArr = [];
        str.Calculations.map((item) => {
          newArr.push({
            Phase: item.Phase,
            ParameterTypeId: item.ParameterTypeId,
            ParameterId: item.ParameterId,
            ParameterName: item.ParameterName,
            value: item.value,
            ischecked: item.ischecked,
            structureType: str.StructureType,
          });
        });
        structures[str.StructureType] = groupBy(newArr, "Phase");
        structures[str.StructureType].StructureImages = [];
        let imgs = tabsImage;
        let imagesArrayFromResponse = res.StructureImages.map((item) => ({
          ...item,
          structure_type_id: item.structure_type_id.replace(/['"]+/g, ''),
        }));
        imgs[str.StructureType] = imagesArrayFromResponse.filter(
          (item) => item.structure_type_id === str.StructureType
        );
        imgs[str.StructureType] = imgs[str.StructureType].map(item => ({...item,image_url: item.image_url.replace(/['"]+/g, ''),image_type: item.image_type.replace(/['"]+/g, '')}))
        setTabsImage(imgs);
        console.log(imgs[str.StructureType]);

      });
      console.log("MeraData", data);
      console.log("Myphase",structures)
      setTabs(structures);
      setActive(Object.keys(structures)[0]);

      setSubmit(true);
      setLoading(false);
      document.getElementById("collapseADD").classList.toggle("collapse");
    });
  };
  if (object == null) return <Loader />;

  return (
    <Layout title="Add Property" subtitle="Add Properties">
      <div className="page-wrapper">
        <div className="container">
          <div style={{ margin: "1%" }} className="text-right">
            <button
              onClick={() => history.goBack()}
              class="btn-lg btn btn-secondary mb-12 "
            >
              <span class="fa fa-list"> Properties List</span>
            </button>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-12  ">
            <form id="accordion" class=" white-box mb-30">
              <div
                style={{ backgroundColor: "#f67828", padding: "10px" }}
                id="headingADD"
                className="rounded"
              >
                <button
                  onClick={(e) => e.preventDefault()}
                  class={"btn btn-link  "}
                  style={{ color: "white" }}
                  data-toggle="collapse"
                  data-target="#collapseADD"
                  aria-controls="collapseADD"
                >
                  Add Property Form
                </button>
              </div>
              <div
                id="collapseADD"
                aria-labelledby="headingADD"
                data-parent="#accordion"
                class="flex row px-4 py-4  align-items-center "
              >
                {Object.keys(object).map((name, index) => {
                  return (
                    <div className="shadow-lg col-12 p-3 mb-2 bg-white rounded">
                      <h6 style={{ color: "#f67828" }}>{name}</h6>
                      <div class="flex row px-4 py-4 align-items-center ">
                        {object &&
                          object[name].map((item) =>
                            Components(item, data, setData, true)
                          )}
                      </div>
                    </div>
                  );
                })}
                {/* {!submit && (
                  <button
                    class="btn btn-secondary text-right"
                    onClick={onSubmit}
                  >
                    {loading && (
                      <span
                        class="spinner-border spinner-border-sm mr-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Calculate
                  </button>
                )} */}
                 {
                  <button
                    class="btn btn-secondary text-right"
                    onClick={onSubmit}
                  >
                    {loading && (
                      <span
                        class="spinner-border spinner-border-sm mr-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Calculate
                  </button>
                }
              </div>
            </form>

            {submit && (
              <form class="white-box mb-30">
                <div class="btn-group py-2" role="group">
                  {Object.keys(tabs).map((name) => {
                    let style = "btn mx-auto ";
                    if (active === name) style += "btn-secondary";
                    else style += "btn-primary";
                    return (
                      <button
                        type="button"
                        className={style}
                        onClick={() => setActive(name)}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>

                <div className="accordion" id="accordionExample">
                  {customSortFunction(Object.keys(tabs[active])).map(
                    (item, index) => {
                      return (
                        <>
                          <TabComponent
                            key={JSON.stringify(tabsImage) + index.toString()}
                            name={item}
                            object={tabs[active]}
                            index={index}
                            useVals={true}
                            setTabsImage={setTabsImage}
                            tabsImage={tabsImage}
                            active={active}
                            setObject2={(data) => {
                              console.log(data);
                              let t = tabs;
                              tabs[data.structureType][data.Phase] = tabs[
                                data.structureType
                              ][data.Phase].map((item) =>
                                item.ParameterId === data.ParameterId
                                  ? data
                                  : item
                              );
                              setTabs(t);
                            }}
                          />
                        </>
                      );
                    }
                  )}
                </div>

                <div className="flex row p-3 align-items-end justify-content-end">
                  <button
                    class="btn align-self-end btn-secondary text-right"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   setSubmit(false);
                    //   document
                    //     .getElementById("collapseADD")
                    //     .classList.toggle("collapse");
                    // }}
                    onClick={onSubmit1}
                    disabled={loading}
                  >
                    {loading && (
                      <span
                        class="spinner-border spinner-border-sm mr-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddForm;
