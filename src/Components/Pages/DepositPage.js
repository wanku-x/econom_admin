import React, { Component } from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import { Invest, Exclude, Info } from './Deposit';

class DepositPage extends Component {
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
              <TabPane tab="Вложить средства" key="1">
                <Row
                  style={{ flexDirection: 'column' }}
                  type="flex"
                  justify="center"
                  className="card-content-wrapper"
                >
                  <Invest />
                </Row>
              </TabPane>
              <TabPane tab="Снять средства" key="2">
                <Row
                  style={{ flexDirection: 'column' }}
                  type="flex"
                  justify="center"
                  className="card-content-wrapper"
                >
                  <Exclude />
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

export default DepositPage;