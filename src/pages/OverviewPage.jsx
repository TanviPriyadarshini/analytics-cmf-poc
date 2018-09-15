import React, { Component } from 'react'
import styled from 'styled-components'

import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col } from 'antd';
const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Page = styled(Layout) `
    min-height: 100vh;
    width: 100vw;
`

const NavTabs = styled(Menu) `
    line-height: 64px;
    display: flex;
    justify-content: flex-end;
`

const Container = styled(Content) `
    width: 80%;
    max-width: 960px;
    margin: 3rem auto;
`

const CardGridItem = styled(Card.Grid) `
  width: 25%;
  text-align: center;
`

const VideoCard = styled(Card) `
    width: 100%;
    margin: 1rem 0;
`

const defaultThumbnail = `https://www.mettle.com/wp-content/uploads/Avalanche-music-video-SkyBox-Studio-After-Effects-1920x957-31kuj8abah8ep5ww5u4zre.jpg`

class OverviewPage extends Component {

    renderCard = () => <VideoCard
        hoverable
        cover={<img alt="example" src={defaultThumbnail} />}
        actions={[<Icon type="arrow-right" theme="outlined" />]}
    >
        <Meta
            title="The default VR video"
            description="www.instagram.com"
        />
    </VideoCard>

    render() {
        return (
            <Page>
                <Header>
                    <div className="logo" />
                    <NavTabs
                        theme="dark"
                        mode="horizontal"
                    >
                        <Menu.Item key="2">About Us</Menu.Item>
                        <Menu.Item key="3">Logout</Menu.Item>
                    </NavTabs>
                </Header>

                <Container>
                    <Row gutter={16}>
                        <Col span={8}>
                            {this.renderCard()}
                        </Col>
                        <Col span={8}>
                            {this.renderCard()}
                        </Col>
                        <Col span={8}>
                            {this.renderCard()}
                        </Col>
                        <Col span={8}>
                            {this.renderCard()}
                        </Col>
                        <Col span={8}>
                            {this.renderCard()}
                        </Col>
                        <Col span={8}>
                            {this.renderCard()}
                        </Col>
                        <Col span={8}>
                            {this.renderCard()}
                        </Col>
                        <Col span={8}>
                            {this.renderCard()}
                        </Col>
                        <Col span={8}>
                            {this.renderCard()}
                        </Col>
                    </Row>
                </Container>
                <Footer style={{ textAlign: 'center' }}>
                    LumiereVR ⓒ 2018
                </Footer>
            </Page>
        )
    }
}

export default OverviewPage