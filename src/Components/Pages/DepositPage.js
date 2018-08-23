import React, { Component } from 'react';
import { Row, Col, Card, Tabs, Form, Input, Button } from 'antd';

class DepositPage extends Component {
  changeDeposit = (value, prevValue) => {
    const number = parseInt(value || 0, 10);
    if (
      isNaN(number) ||
      (number < 0) ||
      (number > 999999999999)
    ) {
      return prevValue;
    }
    return number;
  }

  checkDeposit = (rule, value, callback) => {
    if (value <= 0) {
      callback('Депозит должен быть больше 0')
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const TabPane = Tabs.TabPane;
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

    return (
      <Row
        style={{ minHeight: '100%' }}
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col xs={{ span: 24 }}>
          <Card className="card" title="Депозит">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Вложить средства" key="1">
                <Form>
                  <FormItem
                    {...formItemLayout}
                    label="Сумма"
                  >
                    {getFieldDecorator('deposit', {
                      initialValue: 0 ,
                      normalize: this.changeDeposit,
                      rules: [{ validator: this.checkDeposit }],
                    })(
                      <Input
                        suffix="$"
                        size="large"
                      />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Тип оплаты"
                  >
                    <ButtonGroup style={{display: 'block'}}>
                      <Button
                        type="primary"
                        size="large"
                        style={{width: '50%'}}
                      >
                        3D Secure
                      </Button>
                      <Button
                        type="primary"
                        size="large"
                        style={{width: '50%'}}
                      >
                        PayPass
                      </Button>
                    </ButtonGroup>
                  </FormItem> 
                </Form>
              </TabPane>
              <TabPane tab="Снять средства" key="2">
              
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(DepositPage);