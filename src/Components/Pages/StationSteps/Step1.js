import React, { Component } from 'react';
import { Form, Input } from 'antd';

class Step1 extends Component {
  state = {
    bet: this.props.minBet,
  }

  betChange = (value, prevValue) => {
    const number = parseInt(value || 0, 10);
    if (
      isNaN(number) ||
      (number < 0) ||
      (number > 999999999999)
    ) {
      return prevValue;
    }
    this.setState({bet: number});
    return number;
  }

  checkBet = (rule, value, callback) => {
    const { minBet, maxBet } = this.props;
    if ((value >= minBet) && (value <= maxBet)) {
      callback();
      return;
    }
    if (value < minBet) {
      callback('Минимальная ставка ' + minBet);
      return;
    }
    if (value > maxBet) {
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

    return (
      <FormItem
        {...formItemLayout}
        label="Ставка"
      >
        {getFieldDecorator('bet', {
          initialValue: this.state.bet ,
          normalize: this.betChange,
          rules: [{ validator: this.checkBet }],
        })(
          <Input
            suffix="$"
            size="large"
          />
        )}
      </FormItem>
    )
  }
}

export default Form.create()(Step1);