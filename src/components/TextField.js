import React from "react";
import { getParamsData } from "../services/City";



 
function TextField(props) {
  const [value, setValue] = React.useState(null);
  React.useEffect(() => {
    console.log("Props. value", props);
    if (props.value) {
      setValue(props.value);
    }
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
    props.setData(
      props.data.map((item) => {
        return item.ParameterId === props.id
          ? { ...item, Value: e.target.value }
          : item;
      })
    );
 
    console.log(props.data.find((item) => item.ParameterId == props.id));
  };
  return (
    <div class="form-group col-md-4">
      <label class="label">{props.name}</label>
      <input
        type="text"
       
        value={value}
        onChange={onChange}
        //placeholder={props.name}
       
        class="form-control"
      />
    </div>
  );
}

export default TextField;
