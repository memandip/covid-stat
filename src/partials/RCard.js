import React from 'react'
import { Card } from 'react-bootstrap'

const RCard = ({ title, value, bodyClass, color }) => (
    <Card>
        <Card.Title>
            <h4 style={{ color }}>{title}</h4>
        </Card.Title>
        <Card.Body className={bodyClass}>
            <h4 style={{ color }}>{value}</h4>
        </Card.Body>
    </Card>
)

export default RCard