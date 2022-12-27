import React from 'react'

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg  bg-dark text-light" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand" >Weather App</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar