import React from "react";
import { getParamsData } from "../services/City";

function ToggleField(props) {
  const [value, setValue] = React.useState(false);
  React.useEffect(() => {
    // getParamsData(props.id, 1).then((res) => {
    //   setValue(res[0].Value);
    // });
    if (props.value) {
     
      let val = props.value.slice(1, props.value.length - 1);
      setValue(val === "Yes" ? "checked" : "");
    }
  }, []);

  const onChange = (e) => {
    setValue(e.target.checked);
    console.log("Heee",e.target.checked);
    props.setData(
      props.data.map((item) => {
        return item.ParameterId === props.id
          ? { ...item, Value: e.target.checked ? "Yes" : "No" }
          : item;
      })
    );
    console.log(props.data.find((item) => item.ParameterId == props.id));
  };
  return (
    <div class="col-md-4">
      <label class="checkbox-container">
        {props.name}
        <input type="checkbox" onChange={onChange} checked={value} />
        <span class="checkmark"></span>
      </label>
    </div>
  );
}

export default ToggleField;
