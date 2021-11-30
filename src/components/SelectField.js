import React from "react";
import { getParamsData } from "../services/City";

const SelectField = React.memo((props) => {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    getParamsData(props.id, 1).then((res) => {
      setData(res);
    });
    console.log("slectfield", props.value);
    if (props.value) setValue(props.value.slice(1, props.value.length - 1));
  }, []);

  const onChange = (e) => {
    console.log(props.data);
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
    <>
      <div className="form-group col-md-4 ">
        <label class="label">{props.name}</label>
        <select className="form-control" onChange={onChange} required>
          <option selected="selected">Choose Your {props.name}</option>
          {data &&
            data?.map((item, index) => {
              return (
                <option selected={item.Value === value} value={item.Value}>
                  {item.Value}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
});

export default SelectField;
