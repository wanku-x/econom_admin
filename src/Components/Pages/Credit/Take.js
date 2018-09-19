import React, { Component } from 'react';
import { Col, Form, Input, Button, Select, message } from 'antd';
import { requestPOST } from '../../Requests';
import { PayPass, Secure3D } from '../../CardReader';
import { Loader } from '../../Loader';

class Take extends Component {
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

  changeCredit = (value, prevValue) => {
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

  checkCredit = (rule, value, callback) => {
    if (value <= 0) {
      callback('Не меньше 0')
    }
    callback();
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
          requestPOST('/api/v1/take_credit/', values).then((result)=>{
            if (result.success) {
              message.success('Команда взяла кредит на '+ values.credit_amount + '$');
              this.props.form.setFields({
                credit_amount: {
                  value: undefined,
                  errors: undefined,
                },
                term: {
                  value: undefined,
                  errors: undefined,
                },
                card: {
                  value: undefined,
                  errors: undefined,
                },
                card_type: {
                  value: undefined,
                  errors: undefined,
                },
              });
            } else {
              message.error(result.error);
              this.props.form.setFields({
                card: {
                  value: undefined,
                  errors: undefined,
                },
                card_type: {
                  value: undefined,
                  errors: undefined,
                },
              });
            }
            this.setState({ isReadingCard: false });
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
      <Form onSubmit={this.onSubmit}>
        <FormItem
          {...formItemLayout}
          label="Сумма"
        >
          {getFieldDecorator('credit_amount', {
            initialValue: 0 ,
            normalize: this.changeCredit,
            rules: [{ required: true, validator: this.checkCredit }],
          })(
            <Input
              suffix="$"
              size="large"
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Срок"
        >
          {getFieldDecorator('term', {
            rules: [{ required: true, message: 'Не выбран срок' }],
          })(
            <Select
              size="large"
            >
              <Option value={1}>1 год</Option>
              <Option value={2}>2 года</Option>
            </Select>
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
            <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
              Выдать
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
    )
  }
}

export default Form.create()(Take);