import React, { Component } from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import { Take, Repay, Info } from './Credit';

class CreditPage extends Component {
  render() {
    const TabPane = Tabs.TabPane;

    return (
      <Row
        style={{ minHeight: '100%' }}
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col xs={{ span: 24 }}>
          <Card className="card">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Выдать кредит" key="1">
                <Row
                  style={{ flexDirection: 'column' }}
                  type="flex"
                  justify="center"
                  className="card-content-wrapper"
                >
                  <Take />
                </Row>
              </TabPane>
              <TabPane tab="Погасить задолженность" key="2">
                <Row
                  style={{ flexDirection: 'column' }}
                  type="flex"
                  justify="center"
                  className="card-content-wrapper"
                >
                  <Repay />
                </Row>
              </TabPane>
              <TabPane tab="Информация" key="3">
                <Row
                  style={{ flexDirection: 'column' }}
                  type="flex"
                  justify="center"
                  className="card-content-wrapper"
                >
                  <Info />
                </Row>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CreditPage;