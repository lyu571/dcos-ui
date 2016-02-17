const TestUtils = require('react-addons-test-utils');

const JestUtil = {
  renderAndFindTag: function (instance, tag) {
    var result = TestUtils.renderIntoDocument(instance);
    return TestUtils.findRenderedDOMComponentWithTag(result, tag);
  },

  unMockStores: function (storeIDs) {
    let stores = {
      ACLAuthStore: '../stores/ACLAuthStore',
      ACLDirectoriesStore: '../stores/ACLDirectoriesStore',
      ACLGroupsStore: '../stores/ACLGroupsStore',
      ACLGroupStore: '../stores/ACLGroupStore',
      ACLStore: '../stores/ACLStore',
      ACLUsersStore: '../stores/ACLUsersStore',
      ACLUserStore: '../stores/ACLUserStore',
      CosmosPackagesStore: '../stores/CosmosPackagesStore',
      MarathonStore: '../stores/MarathonStore',
      MesosLogStore: '../stores/MesosLogStore',
      MesosStateStore: '../stores/MesosStateStore',
      MesosSummaryStore: '../stores/MesosSummaryStore',
      MetadataStore: '../stores/MetadataStore',
      TaskDirectoryStore: '../stores/TaskDirectoryStore'
    };

    Object.keys(stores).forEach(function (storeID) {
      if (storeIDs.indexOf(storeID) === -1) {
        jest.setMock(stores[storeID], {});
      }
    });
  }
};

module.exports = JestUtil;
