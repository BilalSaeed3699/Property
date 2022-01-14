import Cookies from "js-cookie";
import axios from "axios";
import { getParamsData } from "./City";
import { response } from "../utils/sampleresponse";
const GetURL =
  "https://u0yo62ijdc.execute-api.us-west-2.amazonaws.com/DEV/get-form-values";
const DelURL =
  "https://u0yo62ijdc.execute-api.us-west-2.amazonaws.com/DEV/delete";

const URL =
  "https://u0yo62ijdc.execute-api.us-west-2.amazonaws.com/DEV/singlefamily";

export async function addFormPost(arr, formId, imageArr = null) {
  let params = {
    formId: formId,
    username: Cookies.get("username"),
    CityId: JSON.parse(Cookies.get("city")).CityId,
    parameters: [],
    // StructureImages: [],
  };
  console.log("Form", arr);
  let Arr = [];
  arr.map(async (item) => {
    Arr.push({
      ParameterId: item.ParameterId,
      ParameterName: item.ParameterName,
      value: item.Value,
    });
  });
  params.parameters = Arr;

  if (Object.keys(imageArr).length != 0) {
    let keysArr = Object.keys(imageArr);
    let arr = [];
    keysArr.forEach((key, index) => {
      arr = arr.concat(imageArr[key]);
    });
    params.StructureImages = arr;
  }
  params.StructureTypes=[];
  console.log("fff", params);
  params = JSON.stringify({
    Body: params,
  });
  console.log(params);

  // return response;

  return axios
    .post(URL, params, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      crossorigin: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      alert(e.response.data);
    });
}

export async function editFormPost(arr, formId, imageArr = null, tabs = null) {
  let params = {
    formId: formId,
    username: Cookies.get("username"),
    CityId: JSON.parse(Cookies.get("city")).CityId,
    parameters: [],
    // StructureImages: [],
  };

  let Arr = [];
  arr.map(async (item) => {
    Arr.push({
      ParameterId: item.ParameterId,
      ParameterName: item.ParameterName,
      value: item.Value.replace(/['"]+/g, ""),
    });
  });
  params.parameters = Arr;

  if (Object.keys(imageArr).length != 0) {
    let keysArr = Object.keys(imageArr);
    let arr = [];
    keysArr.forEach((key, index) => {
      arr = arr.concat(imageArr[key]);
    });
    params.StructureImages = arr;
  }

  if (tabs) {
    console.log(tabs);
    params.StructureTypes = Object.entries(tabs).map((item) => {
      let keysArr = Object.keys(item[1]);
      let arr = [];
      keysArr.forEach((key, index) => {
        arr = arr.concat(
          item[1][key].map((item) => ({
            ParameterId: item.ParameterId.toString(),
            ParameterName: item.ParameterName,
            value: item.value,
            ischecked:item.ischecked,
            
          }))
        );
      });
      return {
        StructureType: item[0],
        Calculations: arr,
      };
    });
  }
  else{
    params.StructureTypes=[]
  }
  console.log(params);

  params = JSON.stringify({
    Body: params,
  });
  console.log(params);

  // return response;

  return axios
    .post(URL, params, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      crossorigin: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      alert(e.response.data);
    });
}

export async function getFormData(form_id) {
  let params = {
    FormId: form_id,
  };
  params = JSON.stringify({
    Body: params,
  });
  return axios
    .post(GetURL, params, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      crossorigin: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      alert(e.message);
    });
}

export async function deleteFormData(form_id) {
  let params = {
    FormId: form_id,
  };
  params = JSON.stringify({
    Body: params,
  });
  return axios
    .post(DelURL, params, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      crossorigin: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      alert(e.message);
    });
}
