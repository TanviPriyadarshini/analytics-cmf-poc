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

const UploadCard = styled.div`
    height: calc(100% - 2rem);
    width: 100%;
    margin: 1rem 0;
    border: 4px dashed #212121;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 2rem;
    transition: all .3s ease-in-out;
    opacity: .3;

    cursor: pointer;

    &:hover{
        opacity: .7;
    }
`

const videoList = [
    {
        id: `wjsb324jk23bn4kj23`,
        title: `Fistful of Stars`,
        thumbnail: defaultThumbnail,
        description: `FISTFUL OF STARS is the world's first Virtual Reality exploration 
        of the cosmos alongside the Hubble Telescope that transports you inside of the
        Orion Nebula and reveals the cosmic connections between humans and the stars`
    }
]

class CardSection extends Component {

    renderCard = ({ id, thumbnail, title, description }) => {
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
                description={description.substring(0, 100) + `...`}
            />
        </VideoCard>
    }




    render() {
        return (
            <Container>
                <Row gutter={28} type="flex">
                    {videoList.map(card =>
                        <Col key={card.id} span={8}>{this.renderCard(card)} </Col>
                    )}
                    <Col span={8}>
                        <UploadCard>Upload Video</UploadCard>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default CardSection
