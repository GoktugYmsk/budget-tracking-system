import React from 'react'
import { useNavigate } from 'react-router-dom'

import Content from '../content'
import Header from '../header'
import './index.scss'

function CustomComponent() {

    const navigate = useNavigate()
    return (
        <>
            <Header navigate={navigate} />
            <Content />
        </>
    )
}

export default CustomComponent