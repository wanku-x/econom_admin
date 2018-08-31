import React, { Component, Fragment } from 'react';
import { Form, Modal, Row, message } from 'antd';
import { Loader } from '../Loader';
import { requestPOST } from '../Requests';
import MaskedInput from 'react-maskedinput';

class Secure3D extends Component {
  state = {
    creditCard: '',
    loading: false
  }

  onChange = (e) => {
    this.setState({ creditCard: e.target.value });
  }

  onOk = (creditCard) => {
    const card = creditCard.replace(/\s/g, '').replace(/_/g, '');
    if (card.length !== 16) {
      message.error('Вы не ввели номер карты!');
      return;
    }
    this.setState({ loading: true }, () => {
      requestPOST('/api/v1/check_card/', {
        card: card,
        card_type: 'card_number',
      }).then((result) => {
        console.log(result);
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
      });
    });
  }

  render() {
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
          onOk={() => this.onOk(this.state.creditCard)}
          onCancel={() => this.props.onCancel()}
        >
          <Row type="flex" style={{flexDirection: 'column'}} justify="center" className="credit-card">
            <FormItem>
              <MaskedInput
                autoFocus
                autoComplete="off"
                className="credit-card-input ant-input ant-input-lg"
                mask="1111 1111 1111 1111"
                name="card"
                onChange={this.onChange}
              />
            </FormItem>
          </Row>
        </Modal>
        <Loader isOpen={this.state.loading} />
      </Fragment>
    )
  }
}

export default Secure3D;