import React, { Component } from 'react';
import { Row, Col, Card, Alert } from 'antd';

class AddGroup extends Component {
  render() {
    return (
      <Row
        style={{ minHeight: '100%' }}
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col xs={{ span: 24 }}>
          <Card className="card">
            <Alert
              message="Информация"
              description="Страница добавления команд"
              type="info"
              style={{margin: '24px 0px'}}
              showIcon
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AddGroup;