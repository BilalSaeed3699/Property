import React from 'react'
import Footer from './Footer';
import Navbar from './Navbar';


function Layout(props) {
    return (
        <div class="main-wrapper">

        <Navbar main={true}/>


        <div class="breadcrump-section">
            <div class="container">
                <h2>{props.title}</h2>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        {/* <li class="breadcrumb-item"><a href="index-2.html">Home</a></li> */}
                    </ol>
                </nav>
            </div>
        </div>


        <div class="page-wrapper"  style={{marginBottom : 0}} >
            {props.children}
        </div>





        <Footer/>

    </div>
    )
}

export default Layout
