import Cookies from 'js-cookie'
import React from 'react'
import { useHistory } from 'react-router'

function Navbar(props) {

    const history = useHistory()
    function handleLogout() {
        Cookies.remove('username')
        Cookies.remove('city')
        history.push('/login')
    }
    //{JSON.parse(Cookies.get('city')).CityName || "New York"}

    if (props.main === true) {
        return (
            <div class="login-menu fixed-top">
                <div class="container">
                    <header class="index-menu">
                        <nav class="navbar navbar-expand-lg">
                            <a class="navbar-brand" href="#">
                                <img className='img-fluid' src="/assets/img/logo.png" alt="Logo" />
                            </a>
                            <button class="navbar-toggler p-0" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon text-right"><i class="fas fa-ellipsis-v"></i></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav ml-auto">
                                    <li class="close-icon-li">
                                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                                            data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                            aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"><i class="fas fa-times header-fas"></i></span>
                                        </button>
                                    </li>

                                    <li class="nav-item">
                                        <a
                                            class="nav-link"
                                        >
                                            Hey, {Cookies.get('username') || "John Doe"}
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class="nav-link"
                                            role="button"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </div>
            </div>
        )
    }
    return (


        <header class="index-menu">
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#">
                    <img className='img-fluid' src="assets/img/logo.png" alt="Logo" />
                </a>
                <button class="navbar-toggler p-0" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon text-right"><i class="fas fa-ellipsis-v"></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="close-icon-li">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"><i class="fas fa-times header-fas"></i></span>
                            </button>
                        </li>

                        <li class="nav-item">
                            <a class="btn btn-ghost btn-sm rounded-btn">
                                Hey, {Cookies.get('username') || "John Doe"}
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="btn btn-outline-primary"
                                onClick={handleLogout}
                            >Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
