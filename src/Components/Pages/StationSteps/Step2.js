import React, { Component, Fragment } from 'react';
import { Form, Button, Row, Col } from 'antd';
import { Secure3D, PayPass } from '../../CardReader';

class Step2 extends Component {
  state = {
    success: false,
    visibleSecure3D: false,
    visiblePayPass: false,
    creditCard: ''
  }

  showSecure3D = (visibleSecure3D) => {
    this.setState({ visibleSecure3D });
  }

  showPayPass = (visiblePayPass) => {
    this.setState({ visiblePayPass });
  }

  okCard = (creditCard) => {
    return new Promise((resolve, reject) => {
      setTimeout(async ()=> {
        this.props.updateFormData({
          name: 'creditCard',
          value: creditCard
        });
        console.log('Обновлен стейт StationPage');
        if (!(await this.props.debitMoney())) {
          console.log('Отмена оплаты пользователем или сервером');
          this.props.updateFormData({
            name: 'creditCard',
            value: ''
          });
          reject;
        }
        console.log('Закрываем модалку и ставим успешность 2 этапа');
        this.setState({
          success: true,
          visibleSecure3D: false,
          visiblePayPass: false,
        });
        resolve;
      }, 5000);
    }).catch(() => console.log('Step2.js > okCard() - Error'));
  }

  cancelSecure3D = () => {
    this.setState({ visibleSecure3D: false })
  }

  cancelPayPass = () => {
    this.setState({ visiblePayPass: false })
  }

  render() {
    const ButtonGroup = Button.Group
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    return (
      <Fragment>
        <Row type="flex" style={{flexDirection: 'column'}} justify="center" className="steps-content">
          <Col xs={{span: 24}}>
            <Col {...formItemLayout.labelCol} className="ant-form-item-label">
              <label>
                Тип оплаты
              </label>
            </Col>
            <Col {...formItemLayout.wrapperCol} className="ant-form-item-control">
              <ButtonGroup style={{display: 'block'}}>
                <Button
                  type="primary"
                  size="large"
                  style={{width: '50%'}}
                  disabled={this.state.success}
                  onClick={() => this.showSecure3D(true)}
                >
                  3D Secure
                </Button>
                <Button
                  type="primary"
                  size="large"
                  style={{width: '50%'}}
                  disabled={this.state.success}
                  onClick={()=> this.showPayPass(true)}
                >
                  PayPass
                </Button>
              </ButtonGroup>
              <Secure3D
                visible={this.state.visibleSecure3D}
                onOk={this.okCard}
                onCancel={this.cancelSecure3D}
              />
              <PayPass
                visible={this.state.visiblePayPass}
                onOk={this.okCard}
                onCancel={this.cancelPayPass}
              />
            </Col>
          </Col>
        </Row>
        <div className="steps-action">
          <Button
            style={{ float: 'left' }}
            onClick={() => this.props.prev()}
            disabled={this.state.success}
          >
            Назад
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default Form.create()(Step2);