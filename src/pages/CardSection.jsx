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

const defaultThumbnail = `https://www.mettle.com/wp-content/uploads/Avalanche-music-video-SkyBox-Studio-After-Effects-1920x957-31kuj8abah8ep5ww5u4zre.jpg`

class CardSection extends Component {

    renderCard = id => {
        const PrimaryBtn = <Link to={`analysis/${id}`}>
            <Icon type="arrow-right" theme="outlined" />
        </Link>

        return <VideoCard
            hoverable
            cover={<img alt="example" src={defaultThumbnail} />}
            actions={[PrimaryBtn]}
        >
            <Meta
                title="The default VR video"
                description="www.instagram.com"
            />
        </VideoCard>
    }



    render() {
        return (
            <Container>
                <Row gutter={16}>
                    {new Array(12).fill('').map((_, i) =>
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