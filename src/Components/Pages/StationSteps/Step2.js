import React, { Component } from 'react';
import { Form, Input } from 'antd';

class Step2 extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="Ставка"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'number', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Step2);