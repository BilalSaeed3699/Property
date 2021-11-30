import Cookies from "js-cookie";
import axios from "axios";
import { getParamsData } from "./City";
import { response } from "../utils/sampleresponse";
const GetURL =
  "https://u0yo62ijdc.execute-api.us-west-2.amazonaws.com/DEV/get-form-values";

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

export async function editFormPost(arr, formId, imageArr = null) {
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
      value: item.value.replace(/['"]+/g, ""),
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
