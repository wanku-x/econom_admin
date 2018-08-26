import React, { Component } from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd';

class GiveMoney extends Component {
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
          <Card className="card" title="Выдать деньги">
            <Row
              style={{ flexDirection: 'column' }}
              type="flex"
              justify="center"
              className="card-content-wrapper"
            >
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
                      Выдать
                    </Button>
                  </Col>
                </FormItem>
              </Form>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(GiveMoney);