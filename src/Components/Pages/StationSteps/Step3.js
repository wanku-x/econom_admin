import React, { Component, Fragment } from 'react';
import { Row, Col, Button } from 'antd';

class Step3 extends Component {
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
        <Row type="flex" style={{flexDirection: 'column'}} align="middle" justify="center" className="steps-content">
          <Col {...formItemLayout.wrapperCol} className="ant-form-item-control">
            <ButtonGroup style={{display: 'block'}}>
              <Button
                type="primary"
                size="large"
                style={{width: '50%'}}
              >
                Поражение
              </Button>
              <Button
                type="primary"
                size="large"
                style={{width: '50%'}}
              >
                Победа
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default Step3;