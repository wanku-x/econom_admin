import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

class Step1 extends Component {
  state = {
    bet: this.props.bet,
    success: true,
  }

  changeBet = (value, prevValue) => {
    const number = parseInt(value || 0, 10);
    if (
      isNaN(number) ||
      (number < 0) ||
      (number > 999999999999)
    ) {
      return prevValue;
    }
    this.props.updateFormData({
      name: 'bet',
      value: number
    });
    this.setState({bet: number});
    return number;
  }

  checkBet = (rule, value, callback) => {
    const { minBet, maxBet } = this.props;
    if ((value >= minBet) && (value <= maxBet)) {
      this.setState({success: true});
      callback();
      return;
    }
    if (value < minBet) {
      this.setState({success: false});
      callback('Минимальная ставка ' + minBet);
      return;
    }
    if (value > maxBet) {
      this.setState({success: false});
      callback('Максимальная ставка ' + maxBet);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const formLabelLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      betCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      }
    }

    return (
      <Fragment>
        <Row type="flex" align="middle" justify="center" className="steps-content">
          <Col xs={{span: 24}}>
            <FormItem
              {...formItemLayout}
              label="Ставка"
            >
              {getFieldDecorator('bet', {
                initialValue: this.state.bet ,
                normalize: this.changeBet,
                rules: [{ validator: this.checkBet }],
              })(
                <Input
                  suffix="$"
                  size="large"
                />
              )}
            </FormItem>
            <Col {...formLabelLayout.labelCol} className="ant-form-item-label">
              <label>
                Выигрыш
              </label>
            </Col>
            <Col {...formLabelLayout.betCol} className="ant-form-item-control win-bet">
              <span>
                {this.state.bet * this.props.multiplier}$
              </span>
            </Col>
          </Col>
        </Row>
        <div className="steps-action">
          <Button
            style={{ float: 'right' }}
            type="primary"
            onClick={() => this.props.next()}
            disabled={!this.state.success}
          >
            Дальше
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default Form.create()(Step1);