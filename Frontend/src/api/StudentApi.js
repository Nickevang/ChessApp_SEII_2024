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
import Student from '../model/Student';

/**
* Student service.
* @module api/StudentApi
* @version 1.0.0-oas3
*/
export default class StudentApi {

    /**
    * Constructs a new StudentApi. 
    * @alias module:api/StudentApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the getStudent operation.
     * @callback moduleapi/StudentApi~getStudentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Student{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get student by ID
     * @param {Number} studentID Student ID to get
     * @param {module:api/StudentApi~getStudentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getStudent(studentID, callback) {
      
      let postBody = null;
      // verify the required parameter 'studentID' is set
      if (studentID === undefined || studentID === null) {
        throw new Error("Missing the required parameter 'studentID' when calling getStudent");
      }

      let pathParams = {
        'studentID': studentID
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
      let returnType = Student;

      return this.apiClient.callApi(
        '/student/{studentID}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}