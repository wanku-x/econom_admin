import React, { Component } from 'react';
import { Row, Col, Card, Alert } from 'antd';

class CreditPage extends Component {
  render() {
    return (
      <Row
        style={{ minHeight: '100%' }}
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col xs={{ span: 24 }}>
          <Card className="card" title="Кредит">
            <Alert
              message="Информация"
              description="Кредит"
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

export default CreditPage;