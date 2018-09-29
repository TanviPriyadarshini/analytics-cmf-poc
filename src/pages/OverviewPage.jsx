import React, { Component } from 'react'
import styled from 'styled-components'
import { Router, Route, Switch, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

// Components
import AnalyticsPage from './AnalyticsPage'
import CardSection from './CardSection'

import logoImage from '../static/CMF_logo_en_rev_cmyk.gif'

import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col } from 'antd';
const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const history = createBrowserHistory()

const Page = styled(Layout) `
    min-height: 100vh;
    width: 100vw;
`

const NavTabs = styled(Menu) `
    line-height: 64px;
    display: flex;
    justify-content: flex-end;
`

const CardGridItem = styled(Card.Grid) `
  width: 25%;
  text-align: center;
`


const SectionWrap = styled.div``

const Logo = styled.img`
    float: left;
    height: 100%;
    width: 10rem;
    object-fit: contain;
`

class OverviewPage extends Component {

    render() {
        return (
            <Router history={history}>
                <Page>
                    <Header>
                        <Link to='/'>
                            <Logo src={logoImage} />
                        </Link>
                        <NavTabs
                            theme="dark"
                            mode="horizontal"
                        >
                            <div className="logo"></div>
                            <Menu.Item key="2">About Us</Menu.Item>
                            <Menu.Item key="3">Logout</Menu.Item>
                        </NavTabs>
                    </Header>

                    <SectionWrap>
                        <Switch>
                            <Route exact path="/" component={CardSection} />
                            <Route path="/analysis/:id" component={AnalyticsPage} />
                        </Switch>
                    </SectionWrap>

                    <Footer style={{ textAlign: 'center' }}>
                        CMF ⓒ 2018
                </Footer>
                </Page>
            </Router>
        )
    }
}

export default OverviewPage