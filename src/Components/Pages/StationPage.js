import React, { Component } from 'react';
import { Card, Steps, Modal, Row, Col, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faCoins, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Step1, Step2, Step3 } from './StationSteps';
import { NotFound } from './index';
import { requestPOST, requestGET } from '../Requests';
import { Loader } from '../Loader';

const Step = Steps.Step;
const confirm = Modal.confirm;

class StationPage extends Component {
  state = {
    checkStationInfo: 'not_rendered',
    current: 0,
    formData: {
      bet: 0,
      card: '',
      card_type: '',
      team_name: '',
    },
    stationInfo: {},
  }

  componentDidMount = () => {
    requestGET('/api/v1/get_station_info/').then((result) => {
      if (result.success) {
        this.setState({
          stationInfo: result.station,
          checkStationInfo: 'rendered',
        });
      } else {
        this.setState({
          checkStationInfo: 'not_found',
        });
      }
    }).catch((err)=>{
      console.log(err);
      this.setState({
        checkStationInfo: 'not_found',
      });
      message.error('Ошибка соединения с сервером. Обновите страницу');
    });
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  clear = () => {
    this.setState({
      loading: false,
      current: 0,
      formData: {
        bet: 0,
        card: '',
        card_type: '',
        team_name: '',
      }
    });
  }

  updateFormData = (e) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [e.name]: e.value,
      }
    }));
  }

  debitMoney = (cardObject) => {
    let self = this;
    return new Promise((resolve, reject) => {
      confirm({
        title: 'Вы действительно хотите снять средства у команды ' + cardObject.team_name + '?',
        content: 'Если данная карта не принадлежит текущей команде, обратитесь к организаторам.',
        okText: 'Да',
        cancelText: 'Отмена',
        onOk() {
          requestPOST('/api/v1/make_bet/', {
            bet_amount: self.state.formData.bet,
            card: cardObject.card,
            card_type: cardObject.card_type,
          }).then((result) => {
            if (result.success) {
              self.setState((prevState) => ({
                formData: {
                  ...prevState.formData,
                  card: cardObject.card,
                  card_type: cardObject.card_type,
                  team_name: cardObject.team_name,
                }
              }));
              message.success('Оплата прошла успешно');
              resolve();
            } else {
              message.error(result.error);
              reject();
            }
          }).catch((err) => {
            console.log(err);
            message.error('Ошибка соединения с сервером. Повторите позже');
            reject();
          });
        },
        onCancel() {
          reject();
        },
      });
    });
  }

  confirmResult = (result) => {
    let self = this;
    return new Promise((resolve, reject) => {
      const answer = result ? 'победу' : 'поражение';   
      confirm({
        title: `Вы подтвержадете ${answer} команды ${self.state.formData.team_name}?`,
        okText: 'Подтвердить',
        cancelText: 'Отмена',
        onOk() {
          requestPOST('/api/v1/victory/', {
            card: self.state.formData.card,
            card_type: self.state.formData.card_type,
            victory: result,
          }).then((result) => {
            if (result.success) {
              message.success('Оплата прошла успешно');
              self.clear();
              resolve();
            } else {
              message.error(result.error);
              reject();
            }
          }).catch((err) => {
            console.log(err);
            message.error('Ошибка соединения с сервером. Повторите позже');
            reject();
          });
        },
        onCancel() {
          reject();
        },
      });
    });
  }

  render() {
    const { current, formData, stationInfo } = this.state;

    const stationSteps = [
      {
        title: 'Ставка',
        content: (
          <Step1
            bet={formData.bet}
            minBet={stationInfo.min_bet}
            maxBet={stationInfo.max_bet}
            multiplier={stationInfo.complexity}
            updateFormData={this.updateFormData}
            next={this.next}
          />
        ),
        icon: <FontAwesomeIcon icon={faCoins} size={'1x'} />
      },
      {
        title: 'Оплата',
        content: (
          <Step2
            updateFormData={this.updateFormData}
            debitMoney={this.debitMoney}
            prev={this.prev}
            next={this.next}
          />
        ),
        icon: <FontAwesomeIcon icon={faCreditCard} size={'1x'} />
      },
      {
        title: 'Выигрыш',
        content: (
          <Step3
            confirmResult={this.confirmResult}
          />
        ),
        icon: <FontAwesomeIcon icon={faTrophy} size={'1x'} />
      }
    ];

    return this.state.checkStationInfo == 'rendered' ? (
      <Row
        style={{ minHeight: '100%' }}
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col xs={{ span: 24 }}>
          <Card className="card">
            <Row
              style={{ flexDirection: 'column' }}
              type="flex"
              justify="space-between"
              className="card-content-wrapper"
            >
              <Steps current={current}>
                {stationSteps.map((item, index) => (
                  <Step key={index} title={item.title} icon={item.icon} />
                ))}
              </Steps>
              {stationSteps[current].content}
            </Row>
          </Card>
        </Col>
      </Row>
    ) : (this.state.checkStationInfo == 'not_found' ? (
      <NotFound />
    ) : (
      <Loader isOpen={true} />
    ));
  }
}

export default StationPage;