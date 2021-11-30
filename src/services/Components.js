import React from "react";

import SelectField from "../components/SelectField";
import TextField from "../components/TextField";
import ToggleField from "../components/ToggleField";
import MultiToggleField from "../components/MultiToggleField";

const Components = {
  1: SelectField,
  2: TextField,
  3: ToggleField,
  4: MultiToggleField,
};

export default (item, data, setData, useVals) => {
  if (typeof Components[item.ParameterTypeId] !== "undefined") {
    return React.createElement(Components[item.ParameterTypeId], {
      id: item.ParameterId,
      name: item.ParameterName,
      setData: setData,
      data: data,
      value: useVals ? item.value : null,
    });
  }
  return React.createElement(
    () => <div>The component {item.component} has not been created yet.</div>,
    { key: item._uid }
  );
};
