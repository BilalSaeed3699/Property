import React from "react";
import { getParamsData } from "../services/City";



 
function TextFieldSt(props) {
  const [value, setValue] = React.useState(null);
  const [ischecked, setchecked] = React.useState(null);
  const [ischecked1, setchecked1] = React.useState(null);
  React.useEffect(() => {
    console.log("Props. value", props);
    if (props.value) {
      setValue(props.value);
    }
    
     
      //let val = props.wholeEl.ischecked.slice(1, props.wholeEl.ischecked.length - 1);
      
      setchecked(props.wholeEl.ischecked === true ? "checked" : false);
      setchecked1(props.wholeEl.ischecked);
  }, []);



  
  const onChange = (e) => {
    setValue(e.target.value);
   
      props.setData({...props.wholeEl,value : e.target.value,ischecked:ischecked1})

     
    // console.log(props.data.find((item) => item.ParameterId == props.id));
  };

  const onChange1 = (e) => {
    setchecked(e.target.checked);
    setchecked1(e.target.checked);
    props.setData({...props.wholeEl,...props.wholeEl.ischecked,ischecked : e.target.checked,value : value})
   

  };
  return (
    <div class="form-group col-md-4">
      <label class="checkbox-container">{props.name}
      <input type="checkbox"  key={"c"+props.structureType + props.id}
       id={"c"+props.structureType + props.id} onChange={onChange1} checked={ischecked} />
        <span class="checkmark"></span>
      </label>
       
      <input
        type="text"
       key={props.structureType + props.id}
       id={props.structureType + props.id}
        value={value}
       onChange={onChange}
        //placeholder={props.name}
       
        class="form-control"

      />
    </div>
  );
}

export default TextFieldSt;
