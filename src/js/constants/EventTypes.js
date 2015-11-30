let EventTypes = {};
[
  "ACL_GROUP_DETAILS_FETCHED_SUCCESS",
  "ACL_GROUP_DETAILS_FETCHED_ERROR",
  "ACL_GROUP_DETAILS_GROUP_CHANGE",
  "ACL_GROUP_DETAILS_GROUP_ERROR",
  "ACL_GROUP_DETAILS_PERMISSIONS_CHANGE",
  "ACL_GROUP_DETAILS_PERMISSIONS_ERROR",
  "ACL_GROUP_DETAILS_USERS_CHANGE",
  "ACL_GROUP_DETAILS_USERS_ERROR",
  "ACL_GROUPS_CHANGE",
  "ACL_GROUPS_REQUEST_ERROR",
  "ACL_USER_DETAILS_FETCHED_SUCCESS",
  "ACL_USER_DETAILS_FETCHED_ERROR",
  "ACL_USER_DETAILS_USER_CHANGE",
  "ACL_USER_DETAILS_USER_ERROR",
  "ACL_USER_DETAILS_GROUPS_CHANGE",
  "ACL_USER_DETAILS_GROUPS_ERROR",
  "ACL_USER_DETAILS_PERMISSIONS_CHANGE",
  "ACL_USER_DETAILS_PERMISSIONS_ERROR",
  "ACL_USERS_CHANGE",
  "ACL_USERS_REQUEST_ERROR",
  "CONFIG_LOADED",
  "CONFIG_ERROR",
  "DCOS_METADATA_CHANGE",
  "INTERCOM_CHANGE",
  "MARATHON_APPS_CHANGE",
  "MARATHON_APPS_ERROR",
  "MESOS_SUMMARY_CHANGE",
  "MESOS_SUMMARY_REQUEST_ERROR",
  "MESOS_STATE_CHANGE",
  "MESOS_STATE_REQUEST_ERROR",
  "METADATA_CHANGE",
  "PLUGINS_CONFIGURED",
  "SHOW_CLI_INSTRUCTIONS",
  "SHOW_TOUR",
  "SHOW_VERSIONS_SUCCESS",
  "SHOW_VERSIONS_ERROR",
  "SIDEBAR_CHANGE",
  "TASK_DIRECTORY_CHANGE",
  "TASK_DIRECTORY_ERROR"
].forEach(function (eventType) {
  EventTypes[eventType] = eventType;
});

export default EventTypes;
