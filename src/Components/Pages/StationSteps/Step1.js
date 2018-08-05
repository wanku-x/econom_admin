import React, { Component } from 'react';
import { Form, Input } from 'antd';

class Step1 extends Component {
  state = {
    bet: 0,
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const { bet } = this.state;

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
      <Form>
        <FormItem
          {...formItemLayout}
          label="Ставка"
        >
          {getFieldDecorator('bInputNumberInputNumberet', {
            rules: [{
              type: 'integer', message: 'Введите число!',
            }, {
              required: true, message: 'Это обязательное поле!',
            }],
          })(
            <Input
              type="text"
              id="bet"
              suffix="$"
              defaultValue={bet}
              size="large"
            />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Step1);