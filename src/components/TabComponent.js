import React from "react";
import Components from "../services/Components";
import { amazonUpload } from "../utils/amazonUpload";

function TabComponent({
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
  const setObject = async (image, active, item) => {
    // object[name].find((item) => item.image_type == image.image_type);
    let uploadedImage = await amazonUpload(image);
    let tabsimages = tabsImage;
    let newArr = tabsImage[active].map((item2) =>
      item2.image_type === item.image_type
        ? {
            ...item2,
            image_url: uploadedImage.location,
            image_name: uploadedImage.key,
          }
        : item2
    );
    tabsimages[active] = newArr;
    setTabsImage(tabsimages);
    setImages(newArr);
  };
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
              object[name].map((item) => Components(item, null, null, useVals))}
          </div>
        </div>
      ) : (
        <div style={{ margin: "3%" }} class="row">
          {images &&
            images.map((item) => (
              <div class="col-md-6">
                <div class="profile-pic-change d-flex">
                  <img
                    src={item.image_url}
                    alt="User Image"
                    class="user-avatar"
                    id={`${
                      item.image_type + item.structure_type_id + item.image_url
                    }`}
                    key={`${
                      item.image_type + item.structure_type_id + item.image_url
                    }`}
                  ></img>
                  <div class="form-group">
                    <label class="ml-3">{item.image_type}</label>
                    <input
                      type="file"
                      class="form-control-file ml-3"
                      id={`${item.image_type + item.structure_type_id}`}
                      onChange={(e) => setObject(e, active, item)}
                      key={`${
                        item.image_type +
                        item.structure_type_id +
                        item.image_url
                      }`}
                    ></input>
                   </div>
                  {/* <i class="far fa-trash-alt icon-del"></i> */}
                </div> 
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default TabComponent;
