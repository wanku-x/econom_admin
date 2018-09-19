import React, { Component } from 'react';
import { Col, Form, Input, Button, message } from 'antd';
import { requestPOST } from '../../Requests';
import { PayPass, Secure3D } from '../../CardReader';
import { Loader } from '../../Loader';
import { ModalInfo } from './index';

class Info extends Component {
  state = {
    loading: false,
    info: null,
    isReadingCard: false,
    visibleSecure3D: false,
    visiblePayPass: false,
    visibleInfo: false,
  }

  showSecure3D = () => {
    this.setState({ visibleSecure3D: true });
  }

  showPayPass = () => {
    this.setState({ visiblePayPass: true });
  }

  cancelSecure3D = () => {
    this.setState({ visibleSecure3D: false })
  }

  cancelPayPass = () => {
    this.setState({ visiblePayPass: false })
  }

  cancelInfo = () => {
    this.setState({ visibleInfo: false })
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
          requestPOST('/api/v1/get_deposit_info/', values).then((result)=>{
            this.setState({
              visibleInfo: true,
              info: result,
            }, () => {
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
              this.setState({ isReadingCard: false });
            });
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
              onClick={this.showSecure3D}
              disabled={this.state.isReadingCard}
            >
              3D Secure
            </Button>
            <Button
              type="primary"
              size="large"
              style={{width: '50%'}}
              onClick={this.showPayPass}
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
            <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
              Показать
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
        <ModalInfo
          visible={this.state.visibleInfo}
          onCancel={this.cancelInfo}
          info={this.state.info}
        />
        <Loader isOpen={this.state.loading} />
      </Form>
    )
  }
}

export default Form.create()(Info);