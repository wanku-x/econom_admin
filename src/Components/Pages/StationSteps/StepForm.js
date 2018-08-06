import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class PriceInput extends React.Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  handleNumberChange = (e) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '100%', marginRight: '3%' }}
        />
      </span>
    );
  }
}

class StepForm extends React.Component {
  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Ставка должна быть больше 0');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="Введите ставку">
          {getFieldDecorator('price', {
            initialValue: { number: 0},
            rules: [{ validator: this.checkPrice }],
          })(<PriceInput />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(StepForm);
