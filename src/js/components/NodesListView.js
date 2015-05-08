/** @jsx React.DOM */

var React = require("react/addons");

var HostTable = require("../components/HostTable");

var NodesListView = React.createClass({
  propTypes: {
    hosts: React.PropTypes.array.isRequired
  },

  render: function () {
    return (
      <HostTable hosts={this.props.hosts} />
    );
  }
});

module.exports = NodesListView;
