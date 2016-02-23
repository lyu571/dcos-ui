import {Dropdown, Table} from 'reactjs-components';
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/

import FilterHeadline from '../components/FilterHeadline';
import FilterInputText from '../components/FilterInputText';
import HealthUnit from '../structs/HealthUnit';
import RequestErrorMsg from './RequestErrorMsg';
import ResourceTableUtil from '../utils/ResourceTableUtil';
import SidePanelContents from './SidePanelContents';
import StringUtil from '../utils/StringUtil';
import TableUtil from '../utils/TableUtil';
import NodesList from '../structs/NodesList';
import UnitHealthStatus from '../constants/UnitHealthStatus';
import UnitHealthUtil from '../utils/UnitHealthUtil';

const METHODS_TO_BIND = [
  'handleItemSelection',
  'handleSearchStringChange',
  'renderHealth',
  'renderHealthCheckName',
  'renderNode',
  'resetFilter'
];

module.exports = class UnitHealthSidePanelContents extends SidePanelContents {
  constructor() {
    super();

    this.state = {
      healthFilter: 'all',
      searchString: ''
    };

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    }, this);
  }

  handleItemSelection(selectedHealth) {
    this.setState({healthFilter: selectedHealth.id});
  }

  handleSearchStringChange(searchString) {
    this.setState({searchString});
  }

  getColGroup() {
    return (
      <colgroup>
        <col style={{width: '20%'}} />
        <col style={{width: '40%'}} />
        <col style={{width: '40%'}} />
      </colgroup>
    );
  }

  getColumns() {
    let classNameFn = ResourceTableUtil.getClassName;

    return [
      {
        className: classNameFn,
        headerClassName: classNameFn,
        heading: ResourceTableUtil.renderHeading({health: 'HEALTH'}),
        prop: 'health',
        render: this.renderHealth,
        sortable: true,
        sortFunction: UnitHealthUtil.getHealthSortFunction()
      },
      {
        className: classNameFn,
        headerClassName: classNameFn,
        heading: ResourceTableUtil.renderHeading({health: 'HEALTH CHECK NAME'}),
        prop: 'health',
        render: this.renderHealthCheckName
      },
      {
        className: classNameFn,
        headerClassName: classNameFn,
        heading: ResourceTableUtil.renderHeading({id: 'NODE'}),
        prop: 'id',
        render: this.renderNode,
        sortable: true,
        sortFunction: ResourceTableUtil.getPropSortFunction('id')
      }
    ];
  }

  getUnitInfo(unit) {
    let imageTag = (
      <div className="side-panel-icon icon icon-large icon-image-container
        icon-app-container">
      </div>
    );

    return (
      <div className="side-panel-content-header-details flex-box
        flex-box-align-vertical-center">
        {imageTag}
        <div>
          <h1 className="side-panel-content-header-label flush">
            {unit.get('id')}
          </h1>
          <div>
            {this.getSubHeader(unit)}
          </div>
        </div>
      </div>
    );
  }

  getDropdownItems() {
    let defaultItem = {
      id: 'all',
      html: 'All Health Checks',
      selectedHtml: 'All Health Checks'
    };

    let items = Object.keys(UnitHealthStatus).map(function (health) {
      return {
        id: health,
        html: UnitHealthStatus[health].title,
        selectedHtml: UnitHealthStatus[health].title
      };
    });

    items.unshift(defaultItem);

    return items;
  }

  getErrorNotice() {
    return (
      <div className="container container-pod">
        <RequestErrorMsg />
      </div>
    );
  }

  getNodeLink(node, linkText) {
    let path = 'settings-system-units-unit-nodes-node-panel';
    let params = {unitID: this.props.itemID, unitNodeID: node.get('id')};

    return (
      <a
        className="emphasize clickable text-overflow"
        onClick={() => { this.props.parentRouter.transitionTo(path, params); }}
        title={linkText}>
        {linkText}
      </a>
    );
  }

  getSubHeader(unit) {
    let healthStatus = unit.getHealth();

    return (
      <ul className="list-inline flush-bottom">
        <li>
          <span className={healthStatus.classNames}>
            {healthStatus.title}
          </span>
        </li>
      </ul>
    );
  }

  getVisibleData(data, searchString, healthFilter) {
    data = new NodesList(
      {
        items: [
          {
            'id': 'ip-10-10-0-235',
            'description': 'There has been enhanced damage inside the quantum inverted charge! There has been enhanced ripples next to the critical calibrated capacitors.',
            'type': 'master',
            'health': 0,
            'output': '{\r\n  \"path\": \"\/health\/cluster\",\r\n  \"protocol\": \"HTTP\",\r\n  \"portIndex\": 0\r\n}'
          },
          {
            'id': 'ip-10-10-0-236',
            'description': 'Enhanced time-matter field has to be inverted, because the critical delta region appears to be aligned. You need to invert the diagnostics.',
            'type': 'agent',
            'health': 0,
            'output': '{\r\n  \"path\": \"\/health\/cluster\",\r\n  \"protocol\": \"HTTP\",\r\n  \"portIndex\": 0\r\n}'
          },
          {
            'id': 'ip-10-10-0-237',
            'description': 'Fluctuating the auxiliary crystal damages fluctuations next to the auxiliary region. Fluctuating the auxiliary singularity affects fluctuations near the enhanced zone.',
            'type': 'agent',
            'health': 1,
            'output': '{\r\n  \"path\": \"\/health\/cluster\",\r\n  \"protocol\": \"HTTP\",\r\n  \"portIndex\": 0\r\n}'
          },
          {
            'id': 'ip-10-10-0-238',
            'description': 'There appears to be a critical crystal within the power which catches auxiliary ripples in the special capacitors.',
            'type': 'agent',
            'health': 0,
            'output': '{\r\n  \"path\": \"\/health\/cluster\",\r\n  \"protocol\": \"HTTP\",\r\n  \"portIndex\": 0\r\n}'
          }
        ]
      }
    );

    data = data.filter({id: searchString, health: healthFilter});

    return data.getItems();
  }

  getUnitData() {
    return new HealthUnit(
      {
        'id': this.props.itemID,
        'name': this.props.itemID,
        'version': '3.4.6',
        'health': 1
      }
    );
  }

  resetFilter() {
    this.setState({
      searchString: '',
      healthFilter: 'all'
    });
  }

  renderHealth(prop, node) {
    let health = node.getHealth();

    return (
      <span className={health.classNames}>
        {StringUtil.capitalize(health.title)}
      </span>
    );
  }

  renderHealthCheckName(prop, node) {
    let linkTitle = `${this.getUnitData().get('name')} Health Check`;
    return this.getNodeLink(node, linkTitle);
  }

  renderNode(prop, node) {
    return this.getNodeLink(node, node.get(prop));
  }

  render() {
    // TODO get from store
    let {searchString, healthFilter} = this.state;
    let unit = this.getUnitData();
    let visibleData = this.getVisibleData([], searchString, healthFilter);

    return (
      <div className="flex-container-col">
        <div className="container container-fluid container-pod
          container-pod-divider-bottom container-pod-divider-bottom-align-right
          container-pod-divider-inverse container-pod-short-top
          side-panel-content-header side-panel-section">
          {this.getUnitInfo(unit)}
        </div>
        <div className="side-panel-tab-content side-panel-section container
          container-fluid container-pod container-pod-short container-fluid
          flex-container-col flex-grow no-overflow">
          <div className="flex-container-col flex-grow no-overflow">
            <FilterHeadline
              currentLength={4}
              inverseStyle={false}
              name={"Health Checks"}
              onReset={this.resetFilter}
              totalLength={4} />
            <ul className="list list-unstyled list-inline flush-bottom">
              <li>
                <FilterInputText
                  searchString={this.state.searchString}
                  handleFilterChange={this.handleSearchStringChange}
                  inverseStyle={false} />
              </li>
              <li>
                <Dropdown
                  buttonClassName="button dropdown-toggle"
                  dropdownMenuClassName="dropdown-menu"
                  dropdownMenuListClassName="dropdown-menu-list"
                  initialID={'all'}
                  items={this.getDropdownItems()}
                  onItemSelection={this.handleItemSelection}
                  transition={true}
                  wrapperClassName="dropdown" />
              </li>
            </ul>
            <Table
              className="table table-borderless-outer
                table-borderless-inner-columns flush-bottom"
              columns={this.getColumns()}
              colGroup={this.getColGroup()}
              containerSelector=".gm-scroll-view"
              data={visibleData}
              idAttribute="id"
              itemHeight={TableUtil.getRowHeight()}
              sortBy={{prop: 'health', order: 'desc'}}
              />
          </div>
        </div>
      </div>
    );
  }
};
