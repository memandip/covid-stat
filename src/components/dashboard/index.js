import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import RCard from '../../partials/RCard'
import CovidPieChart from './CovidPieChart'
import { mainApi } from '../../apiUrls'
import { formatNumberNp, getColors } from '../../helpers'

export default class Dashboard extends Component {

    state = {
        data: null
    }

    async componentDidMount() {
        await fetch(mainApi)
            .then(res => res.json())
            .then(data => this.setState({ data }))
    }

    render() {
        let { data } = this.state,
            COLORS = getColors()
        return (
            <Container>
                {data && (
                    <Row>
                        <Col>
                            <RCard title='Total Cases'
                                value={formatNumberNp(data.confirmed.value)}
                                color={COLORS[0]} />
                        </Col>
                        <Col>
                            <RCard title='Active Cases'
                                value={formatNumberNp(data.confirmed.value - (data.deaths.value + data.recovered.value))}
                                color={COLORS[1]} />
                        </Col>
                        <Col>
                            <RCard title='Recovered'
                                value={formatNumberNp(data.recovered.value)}
                                color={COLORS[2]} />
                        </Col>
                        <Col>
                            <RCard title='Deaths'
                                value={formatNumberNp(data.deaths.value)}
                                color={COLORS[3]} />
                        </Col>
                    </Row>
                )}
                {this.state.data && <CovidPieChart data={this.state.data} />}
            </Container>
        )
    }
}
