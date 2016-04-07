import React from 'react';

import AuthStore from '../stores/AuthStore';
import AlertPanel from './AlertPanel';
import Config from '../config/Config';

const METHODS_TO_BIND = [
  'handleUserLogout'
];

module.exports = class AccessDeniedPage extends React.Component {
  constructor() {
    super(...arguments);

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  handleUserLogout() {
    AuthStore.logout();
  }

  getFooter() {
    return (
      <button className="button button-primary"
        onClick={this.handleUserLogout}>
        Log out
      </button>
    );
  }

  render() {
    return (
      <div className="flex-container-col fill-height">
        <div className="page-content container-scrollable inverse">
          <div className="container container-fluid container-pod
            flex-container-col">
            <AlertPanel
              footer={this.getFooter()}
              iconClassName="icon icon-sprite icon-sprite-jumbo
                icon-sprite-jumbo-white icon-lost-planet flush-top"
              title="Access Denied">
              <p>
                You do not have access to this service. <br />
                Please contact your DC/OS administrator.
              </p>
              <p>
                See the <a href={`${Config.documentationURI}/administration/security-and-authentication/`} target="_blank">Security and Authentication</a> documentation for more information.
              </p>
            </AlertPanel>
          </div>
        </div>
      </div>
    );
  }
};
