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

  beforeEach(function() {
    instance = new YouChessApi.GroupApi();
  });

  describe('(package)', function() {
    describe('GroupApi', function() {
      describe('createGroup', function() {
        it('should call createGroup successfully', function(done) {
          // TODO: uncomment, update parameter values for createGroup call and complete the assertions
          /*

          instance.createGroup(body, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(YouChessApi.GroupOut);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('deleteGroup', function() {
        it('should call deleteGroup successfully', function(done) {
          // TODO: uncomment, update parameter values for deleteGroup call
          /*

          instance.deleteGroup(groupID, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('enrollStudent', function() {
        it('should call enrollStudent successfully', function(done) {
          // TODO: uncomment, update parameter values for enrollStudent call and complete the assertions
          /*

          instance.enrollStudent(body, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(YouChessApi.GroupsEnrollBody);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('findAvailableGroups', function() {
        it('should call findAvailableGroups successfully', function(done) {
          // TODO: uncomment, update parameter values for findAvailableGroups call and complete the assertions
          /*
          var opts = {};

          instance.findAvailableGroups(opts, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            let dataCtr = data;
            expect(dataCtr).to.be.an(Array);
            expect(dataCtr).to.not.be.empty();
            for (let p in dataCtr) {
              let data = dataCtr[p];
              expect(data).to.be.a(YouChessApi.GroupOut);
            }

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('getGroup', function() {
        it('should call getGroup successfully', function(done) {
          // TODO: uncomment, update parameter values for getGroup call and complete the assertions
          /*

          instance.getGroup(groupID, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(YouChessApi.GroupOut);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('unenrollStudent', function() {
        it('should call unenrollStudent successfully', function(done) {
          // TODO: uncomment, update parameter values for unenrollStudent call and complete the assertions
          /*

          instance.unenrollStudent(body, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(YouChessApi.GroupOut);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
    });
  });

}));
