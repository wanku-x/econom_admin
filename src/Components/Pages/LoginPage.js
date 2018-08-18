import React, { Component } from 'react';
import { Row, Col, Card, Form, Icon, Input, Button, message } from 'antd';
import { requestPOST, requestGET } from '../Requests';
import { withAuthEnter } from '../AuthProvider';
import { Loader } from '../Loader';
import './LoginPage.css';

const FormItem = Form.Item;

class LoginPage extends Component {
  state = {
    success: false,
    loading: false,
  };

  checkUsername = (rule, value, callback) => {
    if ((value.length < 5) || (value.length > 150)) {
      callback('От 5 до 150 символов');
    }
    if (value.search(/[^a-zA-Z0-9@.+\-_]/) >= 0) {
      callback('Только a-z, A-Z, 0-9 и символы @/./+/-/_');
    }
    callback();
  }

  checkPassword = (rule, value, callback) => {
    if ((value.length < 8) || (value.length > 150)) {
      callback('От 8 до 150 символов');
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true}, () => {
          requestPOST('/login/', values).then((result)=>{
            if (result.success) {
              requestGET('/api/v1/is_logged_in/').then((result)=>{
                if (result.username) {
                  window.localStorage.setItem('username', result.username);
                  this.props.setLoggedIn(true);
                } else {
                  window.localStorage.setItem('username', null);
                  message.error('Непредвиденная ошибка. Обновите страницу и попробуйте снова');
                }
              }).catch((err)=>{
                console.log(err);
                message.error('Ошибка соединения с сервером. Повторите позже');
              });
            } else {
              message.error('Не верный логин или пароль');
            }
          }).catch((err)=>{
            console.log(err);
            message.error('Ошибка соединения с сервером. Повторите позже');
          }).finally(()=>{
            this.setState({loading: false});
          });
        });
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center" align="middle" className="row">
        <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 12 }} lg={{ span: 9 }} xl={{ span: 8 }}>
          <Card>
            <Form onSubmit={this.handleSubmit} className='login-form'>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{
                    validator: this.checkUsername
                  }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Логин" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ validator: this.checkPassword }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Пароль" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Войти
                </Button>
              </FormItem>
              <Loader isOpen={this.state.loading} />
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withAuthEnter(Form.create()(LoginPage));