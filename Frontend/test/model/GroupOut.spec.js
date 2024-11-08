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
    describe('GroupOut', function() {
      beforeEach(function() {
        instance = new YouChessApi.GroupOut();
      });

      it('should create an instance of GroupOut', function() {
        // TODO: update the code to test GroupOut
        expect(instance).to.be.a(YouChessApi.GroupOut);
      });

      it('should have the property groupID (base name: "groupID")', function() {
        // TODO: update the code to test the property groupID
        expect(instance).to.have.property('groupID');
        // expect(instance.groupID).to.be(expectedValueLiteral);
      });

      it('should have the property name (base name: "name")', function() {
        // TODO: update the code to test the property name
        expect(instance).to.have.property('name');
        // expect(instance.name).to.be(expectedValueLiteral);
      });

      it('should have the property maxMembers (base name: "maxMembers")', function() {
        // TODO: update the code to test the property maxMembers
        expect(instance).to.have.property('maxMembers');
        // expect(instance.maxMembers).to.be(expectedValueLiteral);
      });

      it('should have the property members (base name: "members")', function() {
        // TODO: update the code to test the property members
        expect(instance).to.have.property('members');
        // expect(instance.members).to.be(expectedValueLiteral);
      });

    });
  });

}));
