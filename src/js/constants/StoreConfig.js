import CosmosPackagesStore from '../stores/CosmosPackagesStore';
import {
  COSMOS_SEARCH_CHANGE,
  COSMOS_SEARCH_ERROR,
  COSMOS_LIST_CHANGE,
  COSMOS_LIST_ERROR,
  COSMOS_DESCRIBE_CHANGE,
  COSMOS_DESCRIBE_ERROR,
  COSMOS_INSTALL_SUCCESS,
  COSMOS_INSTALL_ERROR,
  COSMOS_UNINSTALL_SUCCESS,
  COSMOS_UNINSTALL_ERROR,
  COSMOS_REPOSITORIES_SUCCESS,
  COSMOS_REPOSITORIES_ERROR,
  COSMOS_REPOSITORY_ADD_SUCCESS,
  COSMOS_REPOSITORY_ADD_ERROR,
  COSMOS_REPOSITORY_DELETE_SUCCESS,
  COSMOS_REPOSITORY_DELETE_ERROR,

  HEALTH_UNITS_CHANGE,
  HEALTH_UNITS_ERROR,
  HEALTH_UNIT_SUCCESS,
  HEALTH_UNIT_ERROR,
  HEALTH_UNIT_NODES_SUCCESS,
  HEALTH_UNIT_NODES_ERROR,
  HEALTH_UNIT_NODE_SUCCESS,
  HEALTH_UNIT_NODE_ERROR,

  HISTORY_CHANGE,

  MESOS_SUMMARY_CHANGE,
  MESOS_SUMMARY_REQUEST_ERROR,
  MESOS_STATE_CHANGE,
  MESOS_STATE_REQUEST_ERROR,

  MARATHON_APPS_CHANGE,
  MARATHON_APPS_ERROR,

  NETWORKING_BACKEND_CONNECTIONS_CHANGE,
  NETWORKING_BACKEND_CONNECTIONS_REQUEST_ERROR,
  NETWORKING_NODE_MEMBERSHIP_CHANGE,
  NETWORKING_NODE_MEMBERSHIP_REQUEST_ERROR,
  NETWORKING_VIPS_CHANGE,
  NETWORKING_VIPS_REQUEST_ERROR,
  NETWORKING_VIP_DETAIL_CHANGE,
  NETWORKING_VIP_DETAIL_REQUEST_ERROR,
  NETWORKING_VIP_SUMMARIES_CHANGE,
  NETWORKING_VIP_SUMMARIES_ERROR,

  METADATA_CHANGE,

  DCOS_METADATA_CHANGE,

  MESOS_LOG_CHANGE,
  MESOS_LOG_REQUEST_ERROR,

  TASK_DIRECTORY_CHANGE,
  TASK_DIRECTORY_ERROR
} from './EventTypes';
import HistoryStore from '../stores/HistoryStore';
import MarathonStore from '../stores/MarathonStore';
import MesosLogStore from '../stores/MesosLogStore';
import MesosStateStore from '../stores/MesosStateStore';
import MesosSummaryStore from '../stores/MesosSummaryStore';
import MetadataStore from '../stores/MetadataStore';
import NetworkingBackendConnectionsStore from '../stores/NetworkingBackendConnectionsStore';
import NetworkingNodeMembershipsStore from '../stores/NetworkingNodeMembershipsStore';
import NetworkingVIPsStore from '../stores/NetworkingVIPsStore';
import NetworkingVIPSummariesStore from '../stores/NetworkingVIPSummariesStore';
import TaskDirectoryStore from '../stores/TaskDirectoryStore';
import UnitHealthStore from '../stores/UnitHealthStore';

const ListenersDescription = {

  unitHealth: {
    store: UnitHealthStore,
    events: {
      success: HEALTH_UNITS_CHANGE,
      error: HEALTH_UNITS_ERROR,
      unitSuccess: HEALTH_UNIT_SUCCESS,
      unitErorr: HEALTH_UNIT_ERROR,
      nodesSuccess: HEALTH_UNIT_NODES_SUCCESS,
      nodesError: HEALTH_UNIT_NODES_ERROR,
      nodeSuccess: HEALTH_UNIT_NODE_SUCCESS,
      nodeError: HEALTH_UNIT_NODE_ERROR
    },
    unmountWhen: function () {
      return true;
    },
    listenAlways: true
  },

  cosmosPackages: {
    store: CosmosPackagesStore,
    events: {
      availableError: COSMOS_SEARCH_ERROR,
      availableSuccess: COSMOS_SEARCH_CHANGE,
      descriptionSuccess: COSMOS_DESCRIBE_CHANGE,
      descriptionError: COSMOS_DESCRIBE_ERROR,
      installedSuccess: COSMOS_LIST_CHANGE,
      installedError: COSMOS_LIST_ERROR,

      installError: COSMOS_INSTALL_ERROR,
      installSuccess: COSMOS_INSTALL_SUCCESS,
      uninstallError: COSMOS_UNINSTALL_ERROR,
      uninstallSuccess: COSMOS_UNINSTALL_SUCCESS,

      repositoriesSuccess: COSMOS_REPOSITORIES_SUCCESS,
      repositoriesError: COSMOS_REPOSITORIES_ERROR,
      repositoryAddSuccess: COSMOS_REPOSITORY_ADD_SUCCESS,
      repositoryAddError: COSMOS_REPOSITORY_ADD_ERROR,
      repositoryDeleteSuccess: COSMOS_REPOSITORY_DELETE_SUCCESS,
      repositoryDeleteError: COSMOS_REPOSITORY_DELETE_ERROR
    },
    unmountWhen: function (store, event) {
      return event === 'availableSuccess';
    },
    listenAlways: false
  },

  history: {
    store: HistoryStore,
    events: {
      change: HISTORY_CHANGE
    },
    unmountWhen: function () {
      true
    },
    listenAlways: false
  },

  networkingBackendConnections: {
    store: NetworkingBackendConnectionsStore,
    events: {
      success: NETWORKING_BACKEND_CONNECTIONS_CHANGE,
      error: NETWORKING_BACKEND_CONNECTIONS_REQUEST_ERROR
    },
    unmountWhen: function () {
      return true;
    },
    listenAlways: true
  },

  networkingNodeMemberships: {
    store: NetworkingNodeMembershipsStore,
    events: {
      success: NETWORKING_NODE_MEMBERSHIP_CHANGE,
      error: NETWORKING_NODE_MEMBERSHIP_REQUEST_ERROR
    },
    unmountWhen: function () {
      return true;
    },
    listenAlways: true
  },

  networkingVIPs: {
    store: NetworkingVIPsStore,
    events: {
      success: NETWORKING_VIPS_CHANGE,
      error: NETWORKING_VIPS_REQUEST_ERROR,
      detailSuccess: NETWORKING_VIP_DETAIL_CHANGE,
      detailError: NETWORKING_VIP_DETAIL_REQUEST_ERROR
    },
    unmountWhen: function () {
      return true;
    },
    listenAlways: true
  },

  networkingVIPSummaries: {
    store: NetworkingVIPSummariesStore,
    events: {
      success: NETWORKING_VIP_SUMMARIES_CHANGE,
      error: NETWORKING_VIP_SUMMARIES_ERROR
    },
    unmountWhen: function () {
      return true;
    },
    listenAlways: true
  },

  summary: {
    // Which store to use
    store: MesosSummaryStore,

    // What event to listen to
    events: {
      success: MESOS_SUMMARY_CHANGE,
      error: MESOS_SUMMARY_REQUEST_ERROR
    },

    // When to remove listener
    unmountWhen: function (store, event) {
      if (event === 'success') {
        return store.get('statesProcessed');
      }
    },

    // Set to true to keep listening until unmount
    listenAlways: true
  },

  state: {
    store: MesosStateStore,
    events: {
      success: MESOS_STATE_CHANGE,
      error: MESOS_STATE_REQUEST_ERROR
    },
    unmountWhen: function (store, event) {
      if (event === 'success') {
        return Object.keys(store.get('lastMesosState')).length;
      }
    },
    listenAlways: true
  },

  marathon: {
    store: MarathonStore,
    events: {
      success: MARATHON_APPS_CHANGE,
      error: MARATHON_APPS_ERROR
    },
    unmountWhen: function (store, event) {
      if (event === 'success') {
        return store.hasProcessedApps();
      }
    },
    listenAlways: true
  },

  metadata: {
    store: MetadataStore,
    events: {
      success: METADATA_CHANGE,
      dcosSuccess: DCOS_METADATA_CHANGE
    },
    unmountWhen: function () {
      return true;
    },
    listenAlways: true
  },

  mesosLog: {
    store: MesosLogStore,
    events: {
      success: MESOS_LOG_CHANGE,
      error: MESOS_LOG_REQUEST_ERROR
    },
    unmountWhen: function () {
      return true;
    },
    listenAlways: true,
    suppressUpdate: true
  },

  taskDirectory: {
    store: TaskDirectoryStore,
    events: {
      success: TASK_DIRECTORY_CHANGE,
      error: TASK_DIRECTORY_ERROR
    },
    unmountWhen: function () {
      return true;
    },
    listenAlways: true
  }

};

module.exports = ListenersDescription;
