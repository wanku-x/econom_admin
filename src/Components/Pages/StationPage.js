import React, { Component } from 'react';
import { Card, Steps, Modal, Row, Col, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faCoins, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Step1, Step2, Step3 } from './StationSteps';

const Step = Steps.Step;
const confirm = Modal.confirm;

const initialValues = {
  stationId: 1,
  minBet: 1000,
  maxBet: 100000,
  multiplier: 2,
}

class StationPage extends Component {
  state = {
    current: 0,
    formData: {
      stationId: initialValues.stationId,
      bet: 0,
      creditCard: '',
    }
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  updateFormData = (e) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [e.name]: e.value,
      }
    }));
  }

  debitMoney = () => {
    return new Promise((resolve, reject) => {
      confirm({
        title: 'Вы действительно хотите снять средства у команды N?',
        content: 'Если данная карта не пренадлежит текущей команде, обратитесь к организаторам.',
        okText: 'Да',
        cancelText: 'Отмена',
        onOk() {
          setTimeout(() => {
            const random = Math.random();
            if (random > 0.5) {
              message.success('Оплата прошла успешно')
              resolve();
            } else {
              message.error('На счёте недостаточно средств')
              reject();
            }
          }, 1000);
        },
        onCancel() {
          reject();
        },
      });
    });
  }

  confirmResult = (result) => {
    return new Promise((resolve, reject) => {
      let answer;
      let data = {
        stationId: this.state.formData.stationId,
        creditCard: this.state.formData.creditCard,
      };

      if (result) {
        answer = 'победу';
        data.prize = this.state.formData.bet * initialValues.multiplier;
      } else {
        answer = 'поражение';
        data.prize = 0;
      }
      
      confirm({
        title: `Вы подтвержадете ${answer} команды N?`,
        okText: 'Подтвердить',
        cancelText: 'Отмена',
        onOk() {
          setTimeout(() => {
            message.success('Операция прошла успешно')
            resolve();
          }, 1000);
        },
        onCancel() {
          reject();
        },
      });
    });
  }

  render() {
    const { current, formData } = this.state;

    const stationSteps = [
      {
        title: 'Ставка',
        content: (
          <Step1
            bet={formData.bet}
            minBet={initialValues.minBet}
            maxBet={initialValues.maxBet}
            multiplier={initialValues.multiplier}
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

    return (
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
    );
  }
}

export default StationPage;