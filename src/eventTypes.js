const eventTypes = {};

//* -------- AWS INITIAL SETUP EVENTS -------------------- */
eventTypes.CHECK_CREDENTIAL_STATUS = 'CHECK_CREDENTIAL_STATUS';
eventTypes.RETURN_CREDENTIAL_STATUS = 'RETURN_CREDENTIAL_STATUS';
eventTypes.UPDATE_STATUS = 'UPDATE_STATUS';
eventTypes.SET_AWS_CREDENTIALS = 'SET_AWS_CREDENTIALS';
eventTypes.HANDLE_AWS_CREDENTIALS = 'HANDLE_AWS_CREDENTIALS';

//TODO: Delete or refactor this set
// eventTypes.INSTALL_IAM_AUTHENTICATOR = 'INSTALL_IAM_AUTHENTICATOR';
// eventTypes.CONFIRM_IAM_AUTHENTICATOR_INSTALLED = 'CONFIRM_IAM_AUTHENTICATOR_INSTALLED';

//* -------- AWS INITIAL SETUP EVENTS -------------------- */
eventTypes.OPEN_LINK = 'OPEN_LINK';

//* -------- AWS CREATING CLUSTER EVETNS -------------------- */
eventTypes.CREATE_CLUSTER = 'CREATE_CLUSTER';
eventTypes.HANDLE_STATUS_CHANGE = 'HANDLE_STATUS_CHANGE';
eventTypes.HANDLE_ERRORS = 'HANDLE_ERRORS';
eventTypes.HANDLE_NEW_NODES = 'HANDLE_NEW_NODES';

//* -------- KUBECTL EVENT TYPES -------------------------- **/
eventTypes.CREATE_POD = 'CREATE_POD';
eventTypes.HANDLE_NEW_POD = 'HANDLE_NEW_POD';

eventTypes.CREATE_DEPLOYMENT = 'CREATE_DEPLOYMENT';
eventTypes.HANDLE_NEW_DEPLOYMENT = 'HANDLE_NEW_DEPLOYMENT';

eventTypes.CREATE_SERVICE = 'CREATE_SERVICE';
eventTypes.HANDLE_NEW_SERVICE = 'HANDLE_NEW_SERVICE';

eventTypes.DELETE_DEPLOYMENT = 'DELETE_DEPLOYMENT';
eventTypes.HANDLE_RERENDER_NODE = 'HANDLE_RERENDER_NODE';

eventTypes.GET_CLUSTER_DATA = 'GET_CLUSTER_DATA';
eventTypes.SEND_CLUSTER_DATA = 'SEND_CLUSTER_DATA';

eventTypes.GET_MASTER_NODE = 'GET_MASTER_NODE';
eventTypes.HANDLE_MASTER_NODE = 'HANDLE_MASTER_NODE';

eventTypes.GET_WORKER_NODES = 'GET_WORKER_NODES';
eventTypes.HANDLE_WORKER_NODES = 'HANDLE_WORKER_NODES';

eventTypes.HANDLE_CONTAINERS_AND_PODS = 'HANDLE_CONTAINERS_AND_PODS';
eventTypes.GET_CONTAINERS_AND_PODS = 'GET_CONTAINERS_AND_PODS';

eventTypes.SHOW_KUBE_DOCS_DEPLOYMENT = 'SHOW_KUBE_DOCS_DEPLOYMENT';
eventTypes.SHOW_KUBE_DOCS_SERVICE = 'SHOW_KUBE_DOCS_SERVICE';
eventTypes.SHOW_KUBE_DOCS_POD = 'SHOW_KUBE_DOCS_POD';

eventTypes.START_LOADING_ICON = 'START_LOADING_ICON';

module.exports = eventTypes;
