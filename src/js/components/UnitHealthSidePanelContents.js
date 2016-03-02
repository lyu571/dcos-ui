import {Dropdown} from 'reactjs-components';
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/

import FilterHeadline from '../components/FilterHeadline';
import FilterInputText from '../components/FilterInputText';
import RequestErrorMsg from './RequestErrorMsg';
import SidePanelContents from './SidePanelContents';
import UnitHealthNodesTable from '../components/UnitHealthNodesTable';
import UnitHealthStatus from '../constants/UnitHealthStatus';
import UnitHealthStore from '../stores/UnitHealthStore';

const METHODS_TO_BIND = [
  'handleItemSelection',
  'handleSearchStringChange',
  'resetFilter'
];

module.exports = class UnitHealthSidePanelContents extends SidePanelContents {
  constructor() {
    super();

    this.store_listeners = [
      {
        name: 'unitHealth',
        events: ['unitSuccess', 'unitError', 'nodesSuccess', 'nodesError']
      }
    ];

    this.state = {
      healthFilter: 'all',
      searchString: ''
    };

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    }, this);
  }

  componentDidMount() {
    super.componentDidMount();
    UnitHealthStore.fetchUnit(this.props.itemID);
    UnitHealthStore.fetchUnitNodes(this.props.itemID);
  }

  handleItemSelection(selectedHealth) {
    this.setState({healthFilter: selectedHealth.id});
  }

  handleSearchStringChange(searchString) {
    this.setState({searchString});
  }

  getUnitHeader(unit) {
    let imageTag = (
      <div className="side-panel-icon icon icon-large icon-image-container
        icon-app-container">
        <img src="./img/services/icon-service-default-medium@2x.png" />
      </div>
    );

    return (
      <div className="side-panel-content-header-details flex-box
        flex-box-align-vertical-center">
        {imageTag}
        <div>
          <h1 className="side-panel-content-header-label flush">
            {unit.get('unit_title')}
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

  getUnit() {
    return UnitHealthStore.getUnit(this.props.itemID);
  }

  getVisibleData(data, searchString, healthFilter) {
    return data.filter({name: searchString, health: healthFilter}).getItems();
  }

  resetFilter() {
    this.setState({
      searchString: '',
      healthFilter: 'all'
    });
  }

  render() {
    let {healthFilter, searchString} = this.state;

    let unit = this.getUnit();
    let nodes = UnitHealthStore.getNodes(this.props.itemID);
    let visibleData = this.getVisibleData(nodes, searchString, healthFilter);

    return (
      <div className="flex-container-col">
        <div className="container container-fluid container-pod
          container-pod-divider-bottom container-pod-divider-bottom-align-right
          container-pod-divider-inverse container-pod-short-top
          side-panel-content-header side-panel-section">
          {this.getUnitHeader(unit)}
        </div>
        <div className="side-panel-tab-content side-panel-section container
          container-fluid container-pod container-pod-short container-fluid
          flex-container-col flex-grow no-overflow">
          <div className="flex-container-col flex-grow no-overflow">
            <FilterHeadline
              currentLength={visibleData.length}
              inverseStyle={false}
              name={"Health Checks"}
              onReset={this.resetFilter}
              totalLength={nodes.getItems().length} />
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
            <UnitHealthNodesTable
              nodes={visibleData}
              unit={unit}
              itemID={this.props.itemID}
              parentRouter={this.props.parentRouter} />
          </div>
        </div>
      </div>
    );
  }
};