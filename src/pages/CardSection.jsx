import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Container } from '../sharedComponents/commonStyles'

import { Icon, Card, Row, Col, Menu, Layout } from 'antd';
const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content } = Layout;

const VideoCard = styled(Card) `
    width: 100%;
    margin: 1rem 0;
`
const defaultThumbnail = `fistfulOfStarsScreenShot.png`

class CardSection extends Component {

    renderCard = id => {
        const PrimaryBtn = <Link to={`analysis/${id}`}>
            <Icon type="arrow-right" theme="outlined" />
        </Link>

        return <VideoCard
            hoverable
            cover={<img alt="example" src="fistfulOfStarsScreenShot.png" />}
            actions={[PrimaryBtn]}
        >
            <Meta
                title="Fistful of Stars"
            />
        </VideoCard>
    }




    render() {
        return (
            <Container>
                <Row gutter={16}>
                    {new Array(2).fill('').map((_, i) =>
                        <Col key={i} span={8}>
                            {this.renderCard(i)}
                        </Col>
                    )}
                </Row>
            </Container>
        )
    }
}

export default CardSection
