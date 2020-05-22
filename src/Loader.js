import React from 'react'
import {Spinner } from 'react-bootstrap'

const Loader = () => (
    <div className="preloader-overlay">
        <div className="preloader">
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </div>
  </div>
)

export default Loader