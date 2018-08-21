import React, { Component, Fragment } from 'react';
import { Row, Col, Button } from 'antd';
import { Loader } from '../../Loader';


class Step3 extends Component {
  state = {
    loading: false,
    victory: ''
  }

  setResult = (result) => {
    return new Promise((resolve, reject) => {
      this.props.updateFormData({
        name: 'victory',
        value: result
      });
      this.props.confirmResult(result).then(() => {
        resolve();
      }, () => {
        this.props.updateFormData({
          name: 'victory',
          value: ''
        });
        reject();
      });
    });
  }

  onResult = (result) => {
    this.setState({ loading: true }, () => {
      this.setResult(result).finally(() => {
        this.setState({ loading: false });
      });
    });
  }

  render() {
    const ButtonGroup = Button.Group
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Fragment>
        <Row type="flex" style={{ flexDirection: 'column' }} align="middle" justify="center" className="steps-content">
          <Col {...formItemLayout.wrapperCol} className="ant-form-item-control">
            <ButtonGroup style={{ display: 'block' }}>
              <Button
                type="primary"
                size="large"
                style={{ width: '50%', backgroundColor: 'rgb(239, 48, 56)', borderColor: 'rgb(239, 48, 56)' }}
                onClick={() => this.onResult(false)}
              >
                Поражение
              </Button>
              <Button
                type="primary"
                size="large"
                style={{ width: '50%', backgroundColor: 'rgb(88, 245, 88)', borderColor: 'rgb(88, 245, 88)' }}
                onClick={() => this.onResult(true)}
              >
                Победа
              </Button>
            </ButtonGroup>
            <Loader isOpen={this.state.loading} />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default Step3;