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
      this.props.updateFormData({
        name: 'creditCard',
        value: creditCard
      });

      this.props.debitMoney().then(() => {
        this.setState({
          success: true,
          visibleSecure3D: false,
          visiblePayPass: false,
        });
        this.props.next();
        resolve();
      },() => {
        this.props.updateFormData({
          name: 'creditCard',
          value: ''
        });
        reject();
      });
    });
  }

  cancelSecure3D = () => {
    this.setState({ visibleSecure3D: false })
  }

  cancelPayPass = () => {
    this.setState({ visiblePayPass: false })
  }

  render() {
    const FormItem = Form.Item
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
        <div>
          <FormItem
            {...formItemLayout}
            label="Тип оплаты"
          >
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
          </FormItem>
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
        </div>
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