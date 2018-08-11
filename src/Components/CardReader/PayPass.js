import React, { Component, Fragment } from 'react';
import { Modal, Row, message } from 'antd';
import { Loader } from '../Loader';
import MaskedInput from 'react-maskedinput';

class PayPass extends Component {
  constructor(props) {
    super(props);
    this.locked = false;
  }

  state = {
    creditCard: '',
    loading: false,
  }

  toggleLock = (lock) => {
    this.locked = lock;
  }

  onChange = (e) => {
    this.setState({creditCard: e.target.value});
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    if (!this.locked) {
      this.toggleLock(true);
      const card = this.state.creditCard.replace(/_/g, '').substr(-10);
      if (card.length!=10) {
        this.setState({creditCard: ''});
        message.error('Попробуйте считать карту снова');
        this.toggleLock(false);
        return;
      }
      // check card valid
      this.setState({loading: true}, () => {
        this.props.onOk(card).finally(() => {
          this.setState({
            creditCard: '',
            loading: false
          });
          this.toggleLock(false);
        });
      });
    }
  }

  focusInput = () => {
    this.payPass.focus();
  }

  render() {
    return (
      <Fragment>
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
        <Loader isOpen={this.state.loading} />
      </Fragment>
    )
  }
}

export default PayPass;