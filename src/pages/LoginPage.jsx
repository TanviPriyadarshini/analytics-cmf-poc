import React, { Component } from 'react'
import styled from 'styled-components'

import { Card, Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

const LoginPageWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100vw;

    background: #212121;
`

const LoginCard = styled(Card) `
    width: 300px;
`

const LoginForm = styled(Form) `
    margin: 0;
`

const LoginFormButton = styled(Button) `
    width: 100%;
    margin: 0;
`

class LoginPage extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) this.props.login()
        });
    }

    renderLoginForm = () => <LoginForm onSubmit={this.handleSubmit}>
        <FormItem>
            {this.props.form.getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
            {this.props.form.getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
        </FormItem>

        <LoginFormButton type="primary" htmlType="submit">
            Log in
        </LoginFormButton>
    </LoginForm>

    render() {
        return (
            <LoginPageWrap>
                <LoginCard title="Login" bordered={false}>
                    {this.renderLoginForm()}
                </LoginCard>
            </LoginPageWrap>
        )
    }
}

export default Form.create()(LoginPage)