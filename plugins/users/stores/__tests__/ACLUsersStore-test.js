jest.dontMock('../ACLUsersStore');
jest.dontMock('../../../../src/js/config/Config');
jest.dontMock('../../../../src/js/events/AppDispatcher');
jest.dontMock('../../actions/ACLUsersActions');
jest.dontMock('../../../../src/js/mixins/GetSetMixin');
jest.dontMock('../../../../src/js/structs/User');
jest.dontMock('../../../../src/js/structs/UsersList');
jest.dontMock('../../../../src/js/structs/Item');
jest.dontMock('../../../../src/js/structs/List');
jest.dontMock('../../../../src/js/utils/RequestUtil');
jest.dontMock('../../../../src/js/utils/Util');
jest.dontMock('../../../../tests/_fixtures/acl/users-unicode.json');

var _ = require('underscore');
var ACLUsersStore = require('../ACLUsersStore');
var ActionTypes = require('../../constants/ActionTypes');
var AppDispatcher = require('../../../../src/js/events/AppDispatcher');
var Config = require('../../../../src/js/config/Config');
var EventTypes = require('../../constants/EventTypes');
var usersFixture = require('../../../../tests/_fixtures/acl/users-unicode.json');
var UsersList = require('../../../../src/js/structs/UsersList');
var RequestUtil = require('../../../../src/js/utils/RequestUtil');

describe('ACLUsersStore', function () {

  beforeEach(function () {
    this.requestFn = RequestUtil.json;
    RequestUtil.json = function (handlers) {
      handlers.success(usersFixture);
    };
    this.usersFixture = _.clone(usersFixture);
  });

  afterEach(function () {
    RequestUtil.json = this.requestFn;
  });

  it('should return an instance of UsersList', function () {
    Config.useFixtures = true;
    ACLUsersStore.fetchUsers();
    var users = ACLUsersStore.get('users');
    expect(users instanceof UsersList).toBeTruthy();
  });

  it('should return all of the users it was given', function () {
    Config.useFixtures = true;
    ACLUsersStore.fetchUsers();
    var users = ACLUsersStore.get('users').getItems();
    expect(users.length).toEqual(this.usersFixture.array.length);
  });

  describe('dispatcher', function () {

    it('stores users when event is dispatched', function () {
      AppDispatcher.handleServerAction({
        type: ActionTypes.REQUEST_ACL_USERS_SUCCESS,
        data: [{gid: 'foo', bar: 'baz'}]
      });

      var users = ACLUsersStore.get('users').getItems();
      expect(users[0].gid).toEqual('foo');
      expect(users[0].bar).toEqual('baz');
    });

    it('dispatches the correct event upon success', function () {
      var mockedFn = jest.genMockFunction();
      ACLUsersStore.addChangeListener(EventTypes.ACL_USERS_CHANGE, mockedFn);
      AppDispatcher.handleServerAction({
        type: ActionTypes.REQUEST_ACL_USERS_SUCCESS,
        data: [{gid: 'foo', bar: 'baz'}]
      });

      expect(mockedFn.mock.calls.length).toEqual(1);
    });

    it('dispatches the correct event upon error', function () {
      var mockedFn = jasmine.createSpy();
      ACLUsersStore.addChangeListener(
        EventTypes.ACL_USERS_REQUEST_ERROR,
        mockedFn
      );
      AppDispatcher.handleServerAction({
        type: ActionTypes.REQUEST_ACL_USERS_ERROR,
        data: 'foo'
      });

      expect(mockedFn.calls.length).toEqual(1);
      expect(mockedFn.calls[0].args).toEqual(['foo']);
    });

  });

});