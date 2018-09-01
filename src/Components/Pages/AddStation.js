import React, { Component } from 'react';
import { Row, Col, Card, Form, Input, Select, Button, message } from 'antd';
import { requestPOST } from '../Requests';
import { Loader } from '../Loader';

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

  checkMaxBet = (rule, max_bet, callback) => {
    const min_bet = this.props.form.getFieldValue('min_bet');
    if (min_bet > max_bet) {
      callback('Максимальная ставка меньше минимальной');
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true }, () => {
          requestPOST('/api/v1/create_station/', values).then((result)=>{
            if (result.success) {
              message.success('Станция успешно создана');
            } else {
              message.error(result.error);
            }
          }).catch((err)=>{
            console.log(err);
            message.error('Ошибка соединения с сервером. Повторите позже');
          }).finally(()=>{
            this.setState({ loading: false });
          });
        });
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
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
          <Card className="card" title="Добавление станции">
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="Название"
              >
                {getFieldDecorator('name', {
                  initialValue: '',
                  rules: [{ required: true, validator: this.checkString }],
                })(
                  <Input
                    size="large"
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Ответственный"
              >
                {getFieldDecorator('owner', {
                  initialValue: '',
                  rules: [{ required: true, validator: this.checkString }],
                })(
                  <Input
                    size="large"
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="E-mail"
              >
                {getFieldDecorator('email', {
                  initialValue: '',
                  rules: [{ required: true, validator: this.checkString }],
                })(
                  <Input
                    size="large"
                    autoComplete="off"
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
                  rules: [{ required: true }]
                })(
                  <Input
                    suffix="$"
                    size="large"
                    autoComplete="off"
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
                  rules: [{ required: true, validator: this.checkMaxBet }],
                })(
                  <Input
                    suffix="$"
                    size="large"
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Коэффициент"
              >
                {getFieldDecorator('complexity', {
                  rules: [{ required: true, message: 'Не выбран коэффициент' }],
                })(
                  <Select
                    size="large"
                  >
                    <Option value={1.50}>1,50</Option>
                    <Option value={1.75}>1,75</Option>
                    <Option value={2.00}>2,00</Option>
                    <Option value={2.50}>2,50</Option>
                    <Option value={3.00}>3,00</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem>
                <Col {...formButtonLayout}>
                  <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                    Добавить
                  </Button>
                </Col>
              </FormItem>
            </Form>
            <Loader isOpen={this.state.loading} />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(AddStation);