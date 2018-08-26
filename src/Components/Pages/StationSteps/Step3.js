import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import { Loader } from '../../Loader';
import FormItem from 'antd/lib/form/FormItem';


class Step3 extends Component {
  state = {
    loading: false,
  }

  onResult = (result) => {
    this.setState({ loading: true }, () => {
      this.props.confirmResult(result).finally(() => {
        this.setState({ loading: false }, () => {
          this.props.clear();
        });
      });
    });
  }

  render() {
    const ButtonGroup = Button.Group
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16, offset: 4 },
      },
    };

    return (
      <Fragment>
        <div>
          <FormItem
            {...formItemLayout}
          >
            <ButtonGroup style={{ display: 'block' }}>
              <Button
                type="primary"
                size="large"
                style={{ width: '50%' }}
                className="button-lose"
                onClick={() => this.onResult(false)}
              >
                Поражение
              </Button>
              <Button
                type="primary"
                size="large"
                style={{ width: '50%' }}
                className="button-win"
                onClick={() => this.onResult(true)}
              >
                Победа
              </Button>
            </ButtonGroup>
            <Loader isOpen={this.state.loading} />
          </FormItem>
        </div>
        <div style={{ height: '32px' }} />
      </Fragment>
    )
  }
}

export default Step3;