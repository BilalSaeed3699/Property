import React from 'react'
import { getCities, getParams } from '../services/City'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'

function Home() {
    const [city, setCity] = React.useState(null)
    const [cities, setCities] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const history = useHistory()

    React.useEffect(() => {
        getCities().then(data => {
            setCities(data);
        })
    }, [])

    const [alert,setAlert] = React.useState(false)
    function handlePress() {

        if (city === null) {
            setAlert(true)
            return;
        }
        setLoading(true)
        const cityData = cities.find(u => u.CityId == city);
        Cookies.set('city', JSON.stringify(cityData))
        getParams(city).then(data => {
            setLoading(false)
            history.push('/main', { data })
        })
    }

    if (cities === null) return <Loader />

    return (
        <div>
        <Navbar main={true}/>
        <div class="login-wrapper">

            <div class="logo-section">
                {/* <h2><img src="assets/img/logo1.png" alt="Logo" /></h2> */}
            </div>


            <div class="login-box" >
             
            <h4>Select City you<span class="blue-text"> want to explore</span></h4>
                <form class="mt-5">
                    <div class="form-group">
                        <label> {alert &&<span style={{color: 'red'}} >Please Select City</span>}</label>
                        <select style={{background: "white" , color:"black"}} onChange={e => setCity(e.target.value)} class="form-control" >
                                    <option>Select City</option>
                                    {cities.map(item => {
                                        return (
                                            <option value={item.CityId} >{item.CityName}</option>
                                        )
                                    })}
                                </select>
                    </div>
                  

                    <div class="form-group text-right mt-4 w-100">
                        <a
                            class="btn btn-secondary"
                            onClick={handlePress}
                            >
                                {loading && <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>}
                                Search
                                </a>
                    </div>

                </form>
            </div>
        </div>
        </div>
    )
}

export default Home;
