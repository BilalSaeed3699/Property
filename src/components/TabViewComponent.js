import React from "react";
import Components from "../services/Components";
import { amazonUpload } from "../utils/amazonUpload";

function TabViewComponent({
  name,
  object,
  index,
  useVals,
  setTabs,
  tabsImage,
  active,
  setTabsImage,
}) {
  // object[name].where iamage_type == amazon pe image uplaod ki hai
  const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    setImages(tabsImage[active]);
  }, [tabsImage[active]]);
  return (
    <div className="card">
      <div class="card-header" id="headingOne">
        <h2 class="mb-0">
          <button
            class="btn btn-link btn-block text-left"
            type="button"
            data-toggle="collapse"
            data-target={`#collapse${index}`}
            aria-expanded="true"
            aria-controls={`collapse${index}`}
          >
            {name === "StructureImages" ? "Structure Images" : name}
          </button>
        </h2>
      </div>
      {name !== "StructureImages" ? (
        <div
          id={`collapse${index}`}
          class="my-4 accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="flex row px-4 py-4 align-items-center ">
            {object &&
              object[name].map((item) => (
                <div className="w-50 px-5 flex row justify-content-between  align-items-center">
                  <p className="font-weight-bold">{item.ParameterName}:</p>
                  <p>{item.value.replace(/['"]+/g, "")}</p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div  class="row white-box">
          {images &&
            images.map((item) => (

              <div class="col-md-5" style={{ margin: "2%",marginBottom:"5%" }}>
                  <div class="user-pic">
                  <img src={item.image_url} alt="User Image" class="img-fluid" style={{ height: "330px" }}></img>
                  
                  <div class="user-det">
                  <h5>{item.image_type}</h5>
                  </div>
                  </div>
                  </div>
              
             
            ))}
        </div>

      )}
    </div>
  );
}

export default TabViewComponent;
