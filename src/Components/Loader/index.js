import React, { Component, Fragment } from 'react';
import { Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Portal } from 'react-portal';

class Loader extends Component {
  render() {
    return (
      <Fragment>
        {this.props.isOpen && (
          <Portal>
            <Row
              className="loader-wrapper"
              type="flex"
              align="middle"
              justify="center"
            >
              <FontAwesomeIcon icon={faSpinner} size="1x" pulse />
            </Row>
          </Portal>
        )}
      </Fragment>
    );
  }
}

export { Loader };