import React, { Component, Fragment } from 'react';
import { Form, Modal, Row, message, Input } from 'antd';
import { Loader } from '../Loader';
import { requestPOST } from '../Requests';

class Secure3D extends Component {
  constructor(props) {
    super(props);
    this.locked = false;
  }
  
  state = {
    loading: false
  }

  toggleLock = (lock) => {
    this.locked = lock;
  }

  normalizeCard = (value, prevValue) => {
    const card = [...value.replace(/\D/g, '')].reduce((result, next, index) => (!index || index % 4) ? result + next : `${result} ${next}`, '');
    if (card.length > 19) {
      return prevValue;
    } else {
      return card;
    }
  }

  validateCard = (rule, value, callback) => {
    if (value.length !== 19) {
      callback('Вы не ввели номер карты');
    } else {
      callback();
    }
  }

  onOk = (e) => {
    e.preventDefault();
    if (!this.locked) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.toggleLock(true);
          const card = values.card.replace(/\s/g, '');
          this.setState({ loading: true }, () => {
            requestPOST('/api/v1/check_card/', {
              card: card,
              card_type: 'card_number',
            }).then((result) => {
              this.props.onOk({
                card: card,
                card_type: 'card_number',
                success: result.success,
                error: result.error,
                team_name: result.team_name,
              });
            }).catch((err) => {
              console.log(err);
              message.error('Ошибка соединения с сервером. Повторите позже');
            }).finally(() => {
              this.setState({
                loading: false,
              });
              this.toggleLock(false);
            });
          });
        }
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    return (
      <Fragment>
        <Modal
          title="Номер карты"
          centered
          closable={false}
          confirmLoading={this.state.loading}
          visible={this.props.visible}
          okText={this.props.okText}
          cancelText="Отмена"
          onOk={this.onOk}
          onCancel={this.props.onCancel}
        >
          <Row type="flex" style={{ flexDirection: 'column' }} justify="center" className="credit-card">
            <Form onSubmit={this.onOk}>
              <FormItem style={{ textAlign: "center" }}>
                {getFieldDecorator('card', {
                  initialValue: "5496 3800 7658",
                  normalize: this.normalizeCard,
                  rules: [{ required: true, validator: this.validateCard }],
                })(
                  <Input
                    autoFocus
                    autoComplete="off"
                    className="credit-card-input"
                    size={17}
                  />
                )}
              </FormItem>
            </Form>
          </Row>
        </Modal>
        <Loader isOpen={this.state.loading} />
      </Fragment>
    )
  }
}

export default Form.create()(Secure3D);