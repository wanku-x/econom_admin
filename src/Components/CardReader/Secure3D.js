import React, { Component, Fragment } from 'react';
import { Form, Modal, Row, message } from 'antd';
import { Loader } from '../Loader';
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
    // check card valid
    this.setState({loading: true}, ()=>{
      this.props.onOk(card.substr(-10)).finally(() => {
        this.setState({loading: false});
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
          okText="Оплатить"
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