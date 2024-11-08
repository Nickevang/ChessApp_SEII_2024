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
import ApiClient from "../ApiClient";
import GroupIn from '../model/GroupIn';
import GroupOut from '../model/GroupOut';
import GroupsEnrollBody from '../model/GroupsEnrollBody';
import GroupsUnenrollBody from '../model/GroupsUnenrollBody';

/**
* Group service.
* @module api/GroupApi
* @version 1.0.0-oas3
*/
export default class GroupApi {

    /**
    * Constructs a new GroupApi. 
    * @alias module:api/GroupApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the createGroup operation.
     * @callback moduleapi/GroupApi~createGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GroupOut{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new group
     * @param {module:model/GroupIn} body FR1 - The coach must be able to create groups
     * @param {module:api/GroupApi~createGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createGroup(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createGroup");
      }

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = GroupOut;

      return this.apiClient.callApi(
        '/group', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteGroup operation.
     * @callback moduleapi/GroupApi~deleteGroupCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a group
     * FR2 - The coach must be able to delete groups
     * @param {Number} groupID Group ID to delete
     * @param {module:api/GroupApi~deleteGroupCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteGroup(groupID, callback) {
      
      let postBody = null;
      // verify the required parameter 'groupID' is set
      if (groupID === undefined || groupID === null) {
        throw new Error("Missing the required parameter 'groupID' when calling deleteGroup");
      }

      let pathParams = {
        'groupID': groupID
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/group/{groupID}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the enrollStudent operation.
     * @callback moduleapi/GroupApi~enrollStudentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GroupsEnrollBody{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Enroll a student in a group
     * FR5 - The student must be able to enroll in an available group
     * @param {module:model/GroupsEnrollBody} body JSON object with the studentID and groupID
     * @param {module:api/GroupApi~enrollStudentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    enrollStudent(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling enrollStudent");
      }

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = GroupsEnrollBody;

      return this.apiClient.callApi(
        '/groups/enroll', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the findAvailableGroups operation.
     * @callback moduleapi/GroupApi~findAvailableGroupsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/GroupOut>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find available groups
     * FR3, FR4 - The student must be able to see a list of available groups, and filter them by their attributes
     * @param {Object} opts Optional parameters
     * @param {Number} opts.priceMin Min price value that needs to be considered for filtering
     * @param {Number} opts.priceMax Max price value that needs to be considered for filtering
     * @param {module:model/String} opts.level Level that needs to be considered for filtering
     * @param {module:model/String} opts.sortBy Sorting method that needs to be considered for filtering
     * @param {module:api/GroupApi~findAvailableGroupsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    findAvailableGroups(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'price_min': opts['priceMin'],'price_max': opts['priceMax'],'level': opts['level'],'sortBy': opts['sortBy']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [GroupOut];

      return this.apiClient.callApi(
        '/group/findAvailable', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getGroup operation.
     * @callback moduleapi/GroupApi~getGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GroupOut{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get group by ID
     * FR6 - The user must be able to see the groups they are in
     * @param {Number} groupID Group ID to get
     * @param {module:api/GroupApi~getGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getGroup(groupID, callback) {
      
      let postBody = null;
      // verify the required parameter 'groupID' is set
      if (groupID === undefined || groupID === null) {
        throw new Error("Missing the required parameter 'groupID' when calling getGroup");
      }

      let pathParams = {
        'groupID': groupID
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GroupOut;

      return this.apiClient.callApi(
        '/group/{groupID}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the unenrollStudent operation.
     * @callback moduleapi/GroupApi~unenrollStudentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GroupOut{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Unenroll a student from a group
     * FR7 - The student must be able to leave a group
     * @param {module:model/GroupsUnenrollBody} body JSON object with the studentID and groupID
     * @param {module:api/GroupApi~unenrollStudentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    unenrollStudent(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling unenrollStudent");
      }

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = GroupOut;

      return this.apiClient.callApi(
        '/groups/unenroll', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}