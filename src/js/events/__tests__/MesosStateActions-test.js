var _ = require("underscore");
var $ = require("jquery");

jest.dontMock("../../config/Config");
jest.dontMock("../MesosStateActions");
jest.dontMock("../../constants/TimeScales");

var Config = require("../../config/Config");
var MesosStateActions = require("../MesosStateActions");
var TimeScales = require("../../constants/TimeScales");

describe("Mesos State Actions", function () {

  beforeEach(function () {
    Config.historyServer = "http://historyserver";
    spyOn($, "ajax");
  });

  describe("#fetch", function () {
    it("fetches the most recent state by default", function () {
      MesosStateActions.fetch();
      expect($.ajax).toHaveBeenCalled();
      expect($.ajax.mostRecentCall.args[0].url).toEqual("http://historyserver/history/last");
    });

    it("fetches a whole minute when instructed", function () {
      MesosStateActions.fetch(TimeScales.MINUTE);
      expect($.ajax).toHaveBeenCalled();
      expect($.ajax.mostRecentCall.args[0].url).toEqual("http://historyserver/history/minute");
    });

    it("fetches a whole hour when instructed", function () {
      MesosStateActions.fetch(TimeScales.HOUR);
      expect($.ajax).toHaveBeenCalled();
      expect($.ajax.mostRecentCall.args[0].url).toEqual("http://historyserver/history/hour");
    });

    it("fetches a whole day when instructed", function () {
      MesosStateActions.fetch(TimeScales.DAY);
      expect($.ajax).toHaveBeenCalled();
      expect($.ajax.mostRecentCall.args[0].url).toEqual("http://historyserver/history/day");
    });
  });

});
