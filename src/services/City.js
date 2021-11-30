import Cookies from 'js-cookie';
import axios from './API'

export async function getCities() {
    return axios.get('city').then(res => {
        return res.data;
    })
    .catch(e => {
        console.log(e)
        alert(e.message)
    })
}

export async function getParams(cityId = JSON.parse(Cookies.get('city')).CityId) {
    return axios.get('parameters',{
        params: {CityId: cityId}
    }).then(res => {
        return res.data;
    })
    .catch(e => {
        console.log(e)
        alert(e.message)
    })
}

export async function getParamsData(paramId,cityId) {
    return axios.get('parameter-values',{
        params: {
            CityId: cityId,
            ParameterId: paramId
        }
    }).then(res => {
        return res.data;
    })
    .catch(e => {
        console.log(e)
        alert(e.message)
    })
}

export async function getTableData() {
    let cityId = JSON.parse(Cookies.get('city')).CityId
    let params = {
        CityId: cityId}

    params = JSON.stringify({
        Body: params,
      })
    return axios.post('forms',params, {
        headers: {
          'Content-Type': 'application/json ; charset=utf-64',
          'Accept': 'application/json',
          
        },
        crossorigin: true,
      }).then(res => {
        return res.data;
    })
    .catch(e => {
        console.log(e)
        alert(e.message)
    })
}