import React from "react";
import { getParamsData } from "../services/City";
import Select from "react-select";

const MultiToggleField = React.memo((props) => {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    getParamsData(props.id, 1).then((res) => {
      setData(res);
    });
    if (props.value) {
      let arr;
      arr = props.value.slice(1, props.value.length - 1).split(",");
      arr = arr.map((item) => ({ value: item, label: item }));
      console.log(arr);
      setValue(arr);
    }
  }, []);

  const onChange = (e) => {
    console.log(props.data);
    console.log(e);
    let arr;
    e.map((item) => {
      arr = arr + "," + item.value;
    });
    props.setData(
      props.data.map((item2) => {
        return item2.ParameterId === props.id
          ? { ...item2, Value: arr }
          : item2;
      })
    );
    console.log(props.data);
    //console.log(props.data.find((item) => item.ParameterId == props.id))
  };

  return (
    <>
      <div className="form-group col-md-4 ">
        <label class="label">{props.name}</label>
        {props.value ? (
          <Select
            options={
              data &&
              data.map((item) => ({ value: item.Value, label: item.Value }))
            }
            onChange={onChange}
            isMulti
            value={value}
          />
        ) : (
          <Select
            options={
              data &&
              data.map((item) => ({ value: item.Value, label: item.Value }))
            }
            onChange={onChange}
            isMulti
          />
        )}
      </div>
    </>
  );
});

export default MultiToggleField;
