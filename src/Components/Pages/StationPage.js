import React, { Component } from 'react';
import { Card, Steps, Button, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faCoins, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Step1, Step2, Step3, Step4 } from './StationSteps';

const Step = Steps.Step;

class StationPage extends Component {
  state = {
    current: 0,
    formData: {
      bet: 0,
    }
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  updateFormData(data) {
    this.setState({formData: data});
  }

  render() {
    const { current, formData } = this.state;

    const stationSteps = [
      {
        title: 'Ставка',
        content: <Step1 updateFormData={this.updateFormData} />,
        icon: <FontAwesomeIcon icon={faCoins} size={'1x'} />
      },
      {
        title: 'Оплата',
        content: <Step2 />,
        icon: <FontAwesomeIcon icon={faCreditCard} size={'1x'} />
      },
      {
        title: 'Выигрыш',
        content: <Step3 />,
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
            <Steps current={current}>
              {stationSteps.map((item, index) => (
                <Step key={index} title={item.title} icon={item.icon} />
              ))}
            </Steps>
            <div className="steps-content">
              {stationSteps[current].content}
            </div>
            <div className="steps-action">
              {
                (current > 0) &&
                (<Button
                  style={{ float: 'left' }}
                  onClick={() => this.prev()}
                >
                  Назад
                </Button>)
              }
              {
                (current < stationSteps.length - 1) &&
                (<Button
                  style={{ float: 'right' }}
                  type="primary"
                  onClick={() => this.next()}
                >
                  Дальше
                </Button>)
              }
              {
                (current === stationSteps.length - 1) &&
                (<Button
                  style={{ float: 'right' }}
                  type="primary"
                >
                  Отправить
                </Button>)
              }
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default StationPage;