import React from "react";
import { getParamsData } from "../services/City";

function ToggleField(props) {
  const [value, setValue] = React.useState(false);
  React.useEffect(() => {
    // getParamsData(props.id, 1).then((res) => {
    //   setValue(res[0].Value);
    // });
    if (props.value) {
      console.log("There is a value in props");
      let val = props.value.slice(1, props.value.length - 1);
      setValue(val === "Yes" ? "checked" : "");
    }
  }, []);

  const onChange = (e) => {
    setValue(e.target.checked);
    props.setData(
      props.data.map((item) => {
        return item.ParameterId === props.id
          ? { ...item, Value: e.target.checked ? "Yes" : "No" }
          : item;
      })
    );
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
