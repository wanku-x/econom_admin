import React, { Component } from 'react';
import { Row, Col, Card, Form, Input, InputNumber, Button, message } from 'antd';
import { requestPOST } from '../Requests';

class AddStation extends Component {
  state = {
    loading: false
  }

  normalizeBet = (value, prevValue) => {
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

  checkString = (rule, value, callback) => {
    if (value.length < 3) {
      callback('Не менее 3 символов');
    }
    if (value.length > 150) {
      callback('Не более 150 символов');
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      console.log(err);
      console.log(values);
      /*
      if (!err) {
        this.setState({ loading: true }, () => {
          requestPOST('/api/v1/create_station/', values).then((result)=>{
            if (result.success) {
              message.success('Станция успешно создана');
            } else {
              message.error(result.err);
            }
          }).catch((err)=>{
            console.log(err);
            message.error('Ошибка соединения с сервером. Повторите позже');
          }).finally(()=>{
            this.setState({ loading: false });
          });
        });
      }*/
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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

    return (
      <Row
        style={{ minHeight: '100%' }}
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col xs={{ span: 24 }}>
          <Card className="card" title="Добавление станции">
            <Form onSubmit={this.handleSubmit}>
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
                label="Ответственный"
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
                label="E-mail"
              >
                {getFieldDecorator('email', {
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
                label="Мин. ставка"
              >
                {getFieldDecorator('min_bet', {
                  initialValue: 0,
                  normalize: this.normalizeBet,
                })(
                  <Input
                    suffix="$"
                    size="large"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Макс. ставка"
              >
                {getFieldDecorator('max_bet', {
                  initialValue: 0 ,
                  normalize: this.normalizeBet,
                })(
                  <Input
                    suffix="$"
                    size="large"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Коэффициент"
              >
                {getFieldDecorator('complexity', {
                  initialValue: 2 ,
                  //normalize: () => {},
                  //rules: [{ validator: () => {} }],
                })(
                  <InputNumber
                    size="large"
                    min={2}
                    max={3}
                    step={0.5}
                  />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  Добавить
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(AddStation);