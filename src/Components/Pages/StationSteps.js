import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons';

class Step1 extends Component {
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

class Step3 extends Component {
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

class Step4 extends Component {
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

const stationSteps = [
  {
    title: 'Ставка',
    content: Form.create()(Step1),
    icon: <FontAwesomeIcon icon={faMoneyBillAlt} size={'1x'} />
  },
  {
    title: 'Second',
    content: Form.create()(Step2),
    icon: <FontAwesomeIcon icon={faMoneyBillAlt} size={'1x'} />
  },
  {
    title: 'Last',
    content: Form.create()(Step3),
    icon: <FontAwesomeIcon icon={faMoneyBillAlt} size={'1x'} />
  },
  {
    title: 'Last',
    content: Form.create()(Step4),
    icon: <FontAwesomeIcon icon={faMoneyBillAlt} size={'1x'} />
  }
];

export default stationSteps;