import React, { Component } from 'react';
import { Row, Col, Card, Form, Input, InputNumber, Button, message } from 'antd';
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

  normalizeComplexity = (value, prevValue) => {
    const roundNumber = (Math.round(value * 2) / 2).toFixed(1);
    if (
      isNaN(roundNumber) ||
      (roundNumber < 2) ||
      (roundNumber > 3)
    ) {
      return prevValue;
    }
    return roundNumber;
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
    if (min_bet >= max_bet) {
      callback('Максимальная ставка меньше минимальной');
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.complexity = parseFloat(values.complexity);
        this.setState({ loading: true }, () => {
          requestPOST('/api/v1/create_station/', values).then((result)=>{
            if (result.status) {
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
                  rules: [{ validator: this.checkMaxBet }],
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
                  initialValue: 2.0,
                  normalize: this.normalizeComplexity,
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