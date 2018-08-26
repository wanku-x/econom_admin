import React, { Component } from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import { PayPass, Secure3D } from '../CardReader';

class AddGroup extends Component {
  state = {
    visibleSecure3D: false,
    visiblePayPass: false,
  }

  showSecure3D = (visibleSecure3D) => {
    this.setState({ visibleSecure3D });
  }

  showPayPass = (visiblePayPass) => {
    this.setState({ visiblePayPass });
  }

  okCard = (creditCard) => {
    return new Promise((resolve, reject) => {
      resolve;
    });
  }

  cancelSecure3D = () => {
    this.setState({ visibleSecure3D: false })
  }

  cancelPayPass = () => {
    this.setState({ visiblePayPass: false })
  }

  checkString = (rule, value, callback) => {
    if (value.length < 3) {
      callback('Не менее 3 символов');
    }
    if (value.length > 150) {
      callback('Не более 150 символов');
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const ButtonGroup = Button.Group;
    const FormItem = Form.Item;
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
          <Card className="card" title="Добавление команды">
            <Form>
              <FormItem
                {...formItemLayout}
                label="Название"
              >
                {getFieldDecorator('name', {
                  initialValue: '',
                  rules: [{ validator: this.checkString }],
                })(
                  <Input
                    size="large"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Капитан"
              >
                {getFieldDecorator('owner', {
                  initialValue: '',
                  rules: [{ validator: this.checkString }],
                })(
                  <Input
                    size="large"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Факультет"
              >
                {getFieldDecorator('faculty', {
                  initialValue: '',
                  rules: [{ validator: this.checkString }],
                })(
                  <Input
                    size="large"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Группа"
              >
                {getFieldDecorator('group', {
                  initialValue: '',
                  rules: [{ validator: this.checkString }],
                })(
                  <Input
                    size="large"
                  />
                )}
              </FormItem>
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
                  >
                    3D Secure
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    style={{width: '50%'}}
                    onClick={() => this.showPayPass(true)}
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
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(AddGroup);