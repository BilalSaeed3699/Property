import React from 'react'

function Loader() {
    return (
        <div  style={{minHeight : "100vh"}}  className="h-100 d-flex align-items-center justify-content-center" >
            <div class="spinner-grow text-warning" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
