import React from "react";
import Layout from "../components/Layout";
import { groupBy, tabs } from "../utils";
import { useLocation } from "react-router-dom";
import TabComponent from "../components/TabComponent";
import { editFormPost, getFormData,addFormPost } from "../services/Form";
import Components from "../services/Components";
import Loader from "../components/Loader";
import { useHistory, useParams } from "react-router-dom";
import customSortFunction from "../utils/arrays";




function AddForm(props) {
  const location = useLocation();
  // const { form_id } = location.state;
  const history = useHistory();
  const [data, setData] = React.useState(null);
  const [object, setObject] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const [tabs, setTabs] = React.useState([]);

  const [active, setActive] = React.useState(tabs[0]);

  const [tabsImage, setTabsImage] = React.useState({});

  const [formId, setFormId] = React.useState(0);

  const [response, setResponse] = React.useState(null);
  const [isSubmitting, setSubmitting] = React.useState(false)

  let form_id = useParams().id;

  React.useEffect(() => {
    getFormData(form_id).then(async (res) => {
      console.log("Mera response", res);
      setResponse(res);
      setFormId(res.FormId);
      let resp = res.FormValues.sort((a, b) => a.ParamOrder - b.ParamOrder);
      setData(resp.map((item) => ({ ...item, Value: item.value })));
      let obj = groupBy(resp, "Phase");
      setObject(obj);

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
        console.log(structures[str.StructureType])
        let imgs = tabsImage;
        let imagesArrayFromResponse = res.StructureImages.map((item) => ({
          ...item,
          structure_type_id: item.structure_type_id.replace(/['"]+/g, ""),
        }));
        imgs[str.StructureType] = imagesArrayFromResponse.filter(
          (item) => item.structure_type_id === str.StructureType
        );
        imgs[str.StructureType] = imgs[str.StructureType].map((item) => ({
          ...item,
          image_url: item.image_url.replace(/['"]+/g, ""),
          image_type: item.image_type.replace(/['"]+/g, ""),
        }));
        setTabsImage(imgs);
        console.log(imgs[str.StructureType]);
      });
      console.log("Myphase",structures)
      setTabs(structures);
      setActive(Object.keys(structures)[0]);

      setSubmit(true);
    });
  }, []);

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setTabsImage({})
    
    
    editFormPost(data, formId, tabsImage,tabs).then((res) => {
      setResponse(res);
      console.log("Mera response123", res);
      setFormId(res.FormId);
      let resp = res.FormValues.sort((a, b) => a.ParamOrder - b.ParamOrder);
      setData(resp.map((item) => ({ ...item, Value: item.value })));
      let obj = groupBy(resp, "Phase");
      setObject(obj);

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
        console.log(structures[str.StructureType])
        let imgs = tabsImage;
        let imagesArrayFromResponse = res.StructureImages.map((item) => ({
          ...item,
          structure_type_id: item.structure_type_id.replace(/['"]+/g, ""),
        }));
        imgs[str.StructureType] = imagesArrayFromResponse.filter(
          (item) => item.structure_type_id === str.StructureType
        );
        imgs[str.StructureType] = imgs[str.StructureType].map((item) => ({
          ...item,
          image_url: item.image_url.replace(/['"]+/g, ""),
          image_type: item.image_type.replace(/['"]+/g, ""),
        }));
        setTabsImage(imgs);
        console.log(imgs[str.StructureType]);
      });
      console.log("MeraData", data);
      console.log("Myphase",structures)
      setTabs(structures);
      setActive(Object.keys(structures)[0]);

      setSubmit(true);
      setLoading(false);
    });
  };
  const onSubmit1 = (e) => {
    setLoading(true);
    e.preventDefault();
    editFormPost(data, formId, tabsImage,tabs).then((res) => {
      setResponse(res);
      setFormId(res.FormId);
      setSubmit(true);
      setLoading(false)
       //window.location.reload()
      // getParams(JSON.parse(Cookies.get("city")).CityId).then((data) => {
      //   setLoading(false);
       // history.push("/main", { data });
      // });
    });
  };

  const onSubmit2 = (e) => {
    setLoading(true);
    e.preventDefault();
    setTabsImage({})

    
    editFormPost(data, formId, tabsImage,tabs).then((res) => {
      setResponse(res);
      setFormId(res.FormId);
      let resp = res.FormValues.sort((a, b) => a.ParamOrder - b.ParamOrder);
      setData(resp.map((item) => ({ ...item, Value: item.value })));
      let obj = groupBy(resp, "Phase");
      setObject(obj);

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
        console.log(structures[str.StructureType])
        let imgs = tabsImage;
        let imagesArrayFromResponse = res.StructureImages.map((item) => ({
          ...item,
          structure_type_id: item.structure_type_id.replace(/['"]+/g, ""),
        }));
        imgs[str.StructureType] = imagesArrayFromResponse.filter(
          (item) => item.structure_type_id === str.StructureType
        );
        imgs[str.StructureType] = imgs[str.StructureType].map((item) => ({
          ...item,
          image_url: item.image_url.replace(/['"]+/g, ""),
          image_type: item.image_type.replace(/['"]+/g, ""),
        }));
        setTabsImage(imgs);
        console.log(imgs[str.StructureType]);
      });
      console.log("Myphase",structures)
      setTabs(structures);
      setActive(Object.keys(structures)[0]);

      setSubmit(true);
      setLoading(false);
      document.getElementById("collapseADD").classList.toggle("collapse");
    });
  };

  if (!(object && data)) return <Loader />;
  else
    return (
      <Layout title="Edit Property" subtitle="Edit Properties">
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
                  <button
                    class="btn btn-secondary text-right"
                    onClick={onSubmit2}
                  >
                      {loading && <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>}
                    Re-Calculate
                  </button>
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
                    {customSortFunction(Object.keys(tabs[active])).map((item, index) => {
                      return (
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
                            console.log("mmm",data);
                            let t = tabs;
                            tabs[data.structureType][data.Phase] = tabs[
                              data.structureType
                            ][data.Phase].map((item) =>
                              item.ParameterId === data.ParameterId
                                ? data
                                : item
                            );
                            setTabs(t)
                          }}
                        />
                      );
                    })}
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
                      onClick={onSubmit}
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
