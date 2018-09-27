import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Container } from '../sharedComponents/commonStyles'

import defaultThumbnail from "../static/fistfulOfStarsScreenShot.png"

import { Icon, Card, Row, Col, Menu, Layout } from 'antd';
const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content } = Layout;

const VideoCard = styled(Card) `
    width: 100%;
    margin: 1rem 0;
`

class CardSection extends Component {

    renderCard = ({ id, thumbnail, title }) => {
        const PrimaryBtn = <Link to={`analysis/${id}`}>
            <Icon type="arrow-right" theme="outlined" />
        </Link>

        return <VideoCard
            hoverable
            cover={<img alt={title} src={thumbnail} />}
            actions={[PrimaryBtn]}
        >
            <Meta
                title={title}
            />
        </VideoCard>
    }




    render() {
        return (
            <Container>
                <Row gutter={16}>
                    {new Array(2).fill('').map((_, i) =>
                        <Col key={i} span={8}>
                            {this.renderCard({ id: i, thumbnail: defaultThumbnail, title: `Fistful of Stars` })}
                        </Col>
                    )}
                </Row>
            </Container>
        )
    }
}

export default CardSection
