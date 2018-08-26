import React, { Component } from 'react';
import { Row, Col, Card, Tabs, Form, Input, Button, Select, InputNumber } from 'antd';

class SharesPage extends Component {
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
    const Option = Select.Option;
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
          <Card className="card">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Выдать акции" key="1">
                <Row
                  style={{ flexDirection: 'column' }}
                  type="flex"
                  justify="center"
                  className="card-content-wrapper"
                >
                  <Form>
                    <FormItem
                      {...formItemLayout}
                      label="Акции"
                    >
                      <Select
                        defaultValue={1}
                        style={{ width: '100%' }}
                        size="large"
                      >
                        <Option value={1}>Акция 1</Option>
                        <Option value={2}>Акция 2</Option>
                        <Option value={3}>Акция 3</Option>
                        <Option value={4}>Акция 4</Option>
                        <Option value={5}>Акция 5</Option>
                        <Option value={6}>Крипта</Option>
                      </Select>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Количество"
                    >
                      <InputNumber
                        size="large"
                      />
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
                    <FormItem>
                      <Col {...formButtonLayout}>
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                          Выдать
                        </Button>
                      </Col>
                    </FormItem>
                  </Form>
                </Row>
              </TabPane>
              <TabPane tab="Изъять акции" key="2">
                <Row
                  style={{ flexDirection: 'column' }}
                  type="flex"
                  justify="center"
                  className="card-content-wrapper"
                >
                  <Form>
                  <FormItem
                      {...formItemLayout}
                      label="Акции"
                    >
                      <Select
                        defaultValue={1}
                        style={{ width: '100%' }}
                        size="large"
                      >
                        <Option value={1}>Акция 1</Option>
                        <Option value={2}>Акция 2</Option>
                        <Option value={3}>Акция 3</Option>
                        <Option value={4}>Акция 4</Option>
                        <Option value={5}>Акция 5</Option>
                        <Option value={6}>Крипта</Option>
                      </Select>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Количество"
                    >
                      <InputNumber
                        size="large"
                      />
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
                    <FormItem>
                      <Col {...formButtonLayout}>
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                          Изъять
                        </Button>
                      </Col>
                    </FormItem>
                  </Form>
                </Row>
              </TabPane>
              <TabPane tab="Информация" key="3">
                <Row
                  style={{ flexDirection: 'column' }}
                  type="flex"
                  justify="center"
                  className="card-content-wrapper"
                >
                  <Form>
                    <FormItem
                      {...formItemLayout}
                      label="Карта"
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
                    <FormItem>
                      <Col {...formButtonLayout}>
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                          Показать
                        </Button>
                      </Col>
                    </FormItem>
                  </Form>
                </Row>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(SharesPage);