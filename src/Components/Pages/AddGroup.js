import React, { Component } from 'react';
import { Row, Col, Card, Form, Input, Button, Select, message } from 'antd';
import { Loader } from '../Loader';
import { requestPOST, requestGET } from '../Requests';
import { PayPass, Secure3D } from '../CardReader';

class AddGroup extends Component {
  state = {
    loading: false,
    isReadingCard: false,
    visibleSecure3D: false,
    visiblePayPass: false,
    banks: [],
  }

  componentDidMount = () => {
    this.setState({ loading: true }, () => {
      requestGET('/api/v1/get_banks_list/').then((result) => {
        this.setState({
          banks: result,
          loading: false,
        });
      }).catch((err)=>{
        console.log(err);
        message.error('Ошибка соединения с сервером. Обновите страницу');
      });
    });
  }

  showSecure3D = (visibleSecure3D) => {
    this.setState({ visibleSecure3D });
  }

  showPayPass = (visiblePayPass) => {
    this.setState({ visiblePayPass });
  }

  cancelSecure3D = () => {
    this.setState({ visibleSecure3D: false })
  }

  cancelPayPass = () => {
    this.setState({ visiblePayPass: false })
  }

  checkString = (rule, value, callback) => {
    if (value.length < 3) {
      callback('Не менее 3 символов');
    }
    if (value.length > 150) {
      callback('Не более 150 символов');
    }
    callback();
  }


  okCard = (cardObject) => {
    if (cardObject.success) {
      message.error('Данная карта принадлежит команде "' + cardObject.team_name + '"');
    } else {
      if (cardObject.error == 'Такой карты не существует') {
        message.error(cardObject.error);
        return;
      }
      if (cardObject.error == 'У этой карты нет команды') {
        this.props.form.setFieldsValue({
          card: cardObject.card,
          card_type: cardObject.card_type,
        });
        this.setState({
          isReadingCard: true,
          visibleSecure3D: false,
          visiblePayPass: false,
        });
        return;
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true }, () => {
          requestPOST('/api/v1/create_team/', values).then((result)=>{
            if (result.success) {
              message.success('Команда успешно создана');
            } else {
              message.error(result.error);
            }
          }).catch((err)=>{
            console.log(err);
            message.error('Ошибка соединения с сервером. Повторите позже');
          }).finally(()=>{
            this.setState({ loading: false });
          });
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const ButtonGroup = Button.Group;
    const FormItem = Form.Item;
    const Option = Select.Option;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const formButtonLayout = {
      xs: { span: 24 },
      sm: { span: 18 },
    }

    return (
      <Row
        style={{ minHeight: '100%' }}
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col xs={{ span: 24 }}>
          <Card className="card" title="Добавление команды">
            <Form onSubmit={this.onSubmit}>
              <FormItem
                {...formItemLayout}
                label="Название"
              >
                {getFieldDecorator('name', {
                  initialValue: '',
                  rules: [{ required: true, validator: this.checkString }],
                })(
                  <Input
                    size="large"
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Капитан"
              >
                {getFieldDecorator('owner', {
                  initialValue: '',
                  rules: [{ required: true, validator: this.checkString }],
                })(
                  <Input
                    size="large"
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Факультет"
              >
                {getFieldDecorator('faculty', {
                  rules: [{ required: true, message: 'Не выбран факультет' }],
                })(
                  <Select
                    size="large"
                  >
                    <Option value="ФМЭСИ">Факультет математической экономики статистики и информатики</Option>
                    <Option value="ФЭТТ">Факультет экономики торговли и товароведения</Option>
                    <Option value="ФМе">Факультет менеджмента</Option>
                    <Option value="ФМа">Факультет маркетинга</Option>
                    <Option value="МШБиМЭ">Международная школа бизнеса и мировой экономики</Option>
                    <Option value="ГРТСИ">Факультет гостинично-ресторанной туристической и спортивной индустрии</Option>
                    <Option value="ФФ">Финансовый факультет</Option>
                    <Option value="ФЭП">Факультет экономики и права</Option>
                    <Option value="ФДО">Факультет дополнительного образования</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Группа"
              >
                {getFieldDecorator('group', {
                  initialValue: '',
                  rules: [{ required: true, validator: this.checkString }],
                })(
                  <Input
                    size="large"
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Банк"
              >
                {getFieldDecorator('bank', {
                  rules: [{ required: true, message: 'Не выбран банк' }],
                })(
                  <Select
                    size="large"
                  >
                    {this.state.banks.map((bank) => (
                      <Option value={bank.id}>{bank.name}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Карта"
                required="true"
              >
                <ButtonGroup style={{display: 'block'}}>
                  <Button
                    type="primary"
                    size="large"
                    style={{width: '50%'}}
                    onClick={() => this.showSecure3D(true)}
                    disabled={this.state.isReadingCard}
                  >
                    3D Secure
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    style={{width: '50%'}}
                    onClick={() => this.showPayPass(true)}
                    disabled={this.state.isReadingCard}
                  >
                    PayPass
                  </Button>
                </ButtonGroup>
                {getFieldDecorator('card', {
                  rules: [{ required: true, message: 'Не выбрана карта' }],
                })(
                  <Input style={{ display: 'none' }} autoComplete="off" />
                )}
                {getFieldDecorator('card_type', {
                  rules: [{ required: true }],
                })(
                  <Input style={{ display: 'none' }} autoComplete="off" />
                )}
              </FormItem>
              <FormItem>
                <Col {...formButtonLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ float: 'right' }}
                  >
                    Добавить
                  </Button>
                </Col>
              </FormItem>
              <Secure3D
                visible={this.state.visibleSecure3D}
                onOk={this.okCard}
                onCancel={this.cancelSecure3D}
                okText="Считать"
              />
              <PayPass
                visible={this.state.visiblePayPass}
                onOk={this.okCard}
                onCancel={this.cancelPayPass}
                okText="Считать"
              />
              <Loader isOpen={this.state.loading} />
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(AddGroup);