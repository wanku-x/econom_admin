import React, { Component } from 'react';
import { Modal, List } from 'antd';

class ModalInfo extends Component {
  render() {
    const Item = List.Item;
    const info = this.props.info; 
    return(
      <Modal
        title="Информация о команде"
        centered
        destroyOnClose={true}
        visible={this.props.visible}
        cancelText="Отмена"
        onCancel={this.props.onCancel}
        okButtonProps={{style: {display: 'none'}}}
      >
        {info ? (
          <List size="small">
            <Item>
              <Item.Meta
                title="Название команды:"
                description={info.team_name}
              />
            </Item>
            <Item>
              <Item.Meta
                title="Капитан:"
                description={info.team_owner}
              />
            </Item>
            <Item>
              <Item.Meta
                title="Баланс:"
                description={info.team_money_amount + '$'}
              />
            </Item>
            <Item>
              <Item.Meta
                title="Банк:"
                description={info.team_bank.bank_name}
              />
            </Item>
            <Item>
              <Item.Meta
                title="Кредит:"
                description={info.team_credit ? info.team_credit.debt_amount + '$' : '0$'}
              />
            </Item>
            <Item>
              <Item.Meta
                title="Срок:"
                description={info.team_credit ? info.team_credit.term : 'Кредит отсутствует'}
              />
            </Item>
          </List>
        ) : null}
      </Modal>
    );
  }
}

export default ModalInfo;