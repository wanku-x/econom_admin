import React, { Component } from 'react';
import { Row, Col, Card, Form, Button, Input, message } from 'antd';
import { Loader } from '../Loader';
import { requestPOST } from '../Requests';
import { PayPass, Secure3D } from '../CardReader';

class ConfirmTransaction extends Component {
  state = {
    loading: false,
    isReadingCard: false,
    visibleSecure3D: false,
    visiblePayPass: false,
  }

  showSecure3D = (visibleSecure3D) => {
    this.setState({ visibleSecure3D });
  }

  showPayPass = (visiblePayPass) => {
    this.setState({ visiblePayPass });
  }

  cancelSecure3D = () => {
    this.setState({ visibleSecure3D: false })
  }

  cancelPayPass = () => {
    this.setState({ visiblePayPass: false })
  }

  okCard = (cardObject) => {
    if (cardObject.success) {
      this.props.form.setFieldsValue({
        card: cardObject.card,
        card_type: cardObject.card_type,
      });
      this.setState({
        isReadingCard: true,
        visibleSecure3D: false,
        visiblePayPass: false,
      });
    } else {
      message.error(cardObject.error);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true }, () => {
          requestPOST('/api/v1/confirm_transaction/', values).then((result)=>{
            if (result.success) {
              message.success('Все транзакции подтверждены. Начисленно: ' + result.won_money_amount + '$');
              this.forceUpdate();
            } else {
              message.warning('Подтвержденных транзакций нет. Начисленно: ' + result.won_money_amount + '$');
              this.forceUpdate();
            }
          }).catch((err)=>{
            console.log(err);
            message.error('Ошибка соединения с сервером. Повторите позже');
          }).finally(()=>{
            this.setState({ loading: false });
          });
        });
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const ButtonGroup = Button.Group;
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
    const formButtonLayout = {
      xs: { span: 24 },
      sm: { span: 18 },
    }

    return (
      <Row
        style={{ minHeight: '100%' }}
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col xs={{ span: 24 }}>
          <Card className="card" title="Подтвердить транзакции">
            <Row
              style={{ flexDirection: 'column' }}
              type="flex"
              justify="center"
              className="card-content-wrapper"
            >
              <Form onSubmit={this.onSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="Карта"
                >
                  <ButtonGroup style={{display: 'block'}}>
                    <Button
                      type="primary"
                      size="large"
                      style={{width: '50%'}}
                      onClick={() => this.showSecure3D(true)}
                      disabled={this.state.isReadingCard}
                    >
                      3D Secure
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      style={{width: '50%'}}
                      onClick={() => this.showPayPass(true)}
                      disabled={this.state.isReadingCard}
                    >
                      PayPass
                    </Button>
                  </ButtonGroup>
                  {getFieldDecorator('card', {
                    rules: [{ required: true, message: 'Не выбрана карта' }],
                  })(
                    <Input style={{ display: 'none' }} autoComplete="off" />
                  )}
                  {getFieldDecorator('card_type', {
                    rules: [{ required: true }],
                  })(
                    <Input style={{ display: 'none' }} autoComplete="off" />
                  )}
                </FormItem>
                <FormItem>
                  <Col {...formButtonLayout}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ float: 'right' }}
                    >
                      Подтвердить
                    </Button>
                  </Col>
                </FormItem>
                <Secure3D
                  visible={this.state.visibleSecure3D}
                  onOk={this.okCard}
                  onCancel={this.cancelSecure3D}
                  okText="Считать"
                />
                <PayPass
                  visible={this.state.visiblePayPass}
                  onOk={this.okCard}
                  onCancel={this.cancelPayPass}
                  okText="Считать"
                />
                <Loader isOpen={this.state.loading} />
              </Form>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(ConfirmTransaction);