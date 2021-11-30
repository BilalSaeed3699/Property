import React from 'react'

function Modal(props) {
    return (
        <div>
            <input type="checkbox" id="my-modal-2" checked={props.open} class="modal-toggle"/> 
            <div class="modal">
                <div class="modal-box items-center ">
                    <p className='self-center text-center' >Please Wait</p> 
                </div>
            </div>
        </div>
    )
}

export default Modal
