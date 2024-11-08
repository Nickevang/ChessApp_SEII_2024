/*
 * YouChess API
 * This is YouChess API
 *
 * OpenAPI spec version: 1.0.0-oas3
 * Contact: nievange@ece.auth.gr
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.63
 *
 * Do not edit the class manually.
 *
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.YouChessApi);
  }
}(this, function(expect, YouChessApi) {
  'use strict';

  var instance;

  describe('(package)', function() {
    describe('GroupsEnrollBody', function() {
      beforeEach(function() {
        instance = new YouChessApi.GroupsEnrollBody();
      });

      it('should create an instance of GroupsEnrollBody', function() {
        // TODO: update the code to test GroupsEnrollBody
        expect(instance).to.be.a(YouChessApi.GroupsEnrollBody);
      });

      it('should have the property studentID (base name: "studentID")', function() {
        // TODO: update the code to test the property studentID
        expect(instance).to.have.property('studentID');
        // expect(instance.studentID).to.be(expectedValueLiteral);
      });

      it('should have the property groupID (base name: "groupID")', function() {
        // TODO: update the code to test the property groupID
        expect(instance).to.have.property('groupID');
        // expect(instance.groupID).to.be(expectedValueLiteral);
      });

    });
  });

}));
