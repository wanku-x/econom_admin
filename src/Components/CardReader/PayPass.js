import React, { Component, Fragment } from 'react';
import { Modal, Row, Alert, message } from 'antd';
import { Loader } from '../Loader';
import { requestPOST } from '../Requests';
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

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.locked) {
      this.toggleLock(true);
      const card = this.state.creditCard.replace(/_/g, '').substr(-10);
      if (card.length !== 10) {
        this.setState({ creditCard: '' });
        message.error('Попробуйте считать карту снова');
        this.toggleLock(false);
        return;
      }
      this.setState({ loading: true }, () => {
        requestPOST('/api/v1/check_card/', {
          card: card,
          card_type: 'chip_number',
        }).then((result) => {
          this.props.onOk({
            card: card,
            card_type: 'chip_number',
            success: result.success,
            error: result.error,
            team_name: result.team_name,
          });
        }).catch((err) => {
          console.log(err);
          message.error('Ошибка соединения с сервером. Повторите позже');
        }).finally(() => {
          this.setState({
            creditCard: '',
            loading: false,
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
          cancelText="Отмена"
          okButtonProps={{style: {display: 'none'}}}
          onCancel={() => this.props.onCancel()}
        >
          <Row type="flex" style={{flexDirection: 'column'}} justify="center">
            <Alert
              message="Помощь"
              description="Поднесите карту к считывающему устройству. Удостоверьтесь, что считывающее устройство подключено к компьютеру"
              type="info"
              showIcon
            />
            <form onSubmit={this.onSubmit}>
              <MaskedInput
                autoFocus
                autoComplete="off"
                type="text"
                mask={'1'.repeat(1024)}
                name="card"
                style={{opacity: 0, width: '1px'}}
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