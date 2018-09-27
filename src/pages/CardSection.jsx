import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Container } from '../sharedComponents/commonStyles'

import defaultThumbnail from "../static/fistfulOfStarsScreenShot.png"
import videoList from "../utils/videoList.json"

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


class CardSection extends Component {

    renderCard = ({ id, thumbnail, title, description }) => {
        const PrimaryBtn = <Icon type="arrow-right" theme="outlined" />

        return <Link to={`analysis/${id}`}>
            <VideoCard
                hoverable
                cover={<img alt={title} src={defaultThumbnail} />}
                actions={[PrimaryBtn]}
            >
                <Meta
                    title={title}
                    description={description.substring(0, 100) + `...`}
                />
            </VideoCard>
        </Link>
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
