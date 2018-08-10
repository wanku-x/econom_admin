import React, { Component } from 'react';
import { Modal, Row, message } from 'antd';
import MaskedInput from 'react-maskedinput';

class PayPass extends Component {
  state = {
    creditCard: ''
  }

  onChange = (e) => {
    this.setState({creditCard: e.target.value});
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const card = this.state.creditCard.replace(/_/g, '').substr(-10);
    if (card.length!=10) {
      this.setState({creditCard: ''});
      message.error('Попробуйте считать карту снова');
      return;
    }
    // if (!fetch) { message.error('Данной карты нет в базе данных'); return;}
    this.props.onOk(card);
  }

  focusInput = () => {
    this.payPass.focus();
  }

  render() {
    return (
      <Modal
        title="Считать карту"
        centered
        destroyOnClose={true}
        visible={this.props.visible}
        closable={false}
        okText="Оплатить"
        cancelText="Отмена"
        okButtonProps={{style: {display: 'none'}}}
        onCancel={() => this.props.onCancel()}
      >
        <Row type="flex" style={{flexDirection: 'column'}} justify="center">
          <p>Поднесите карту к устройству</p>
          <form onSubmit={this.onSubmit}>
            <MaskedInput
              autoFocus
              autoComplete="off"
              type="text"
              mask={'1'.repeat(1024)}
              name="card"
              style={{opacity: 0}}
              ref={(input) => { this.payPass = input }}
              onChange={this.onChange}
              onBlur={this.focusInput}
            />
          </form>
        </Row>
      </Modal>
    )
  }
}

export default PayPass;