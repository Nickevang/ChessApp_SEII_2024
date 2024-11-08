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
import ApiClient from '../ApiClient';

/**
 * The Student model module.
 * @module model/Student
 * @version 1.0.0-oas3
 */
export default class Student {
  /**
   * Constructs a new <code>Student</code>.
   * @alias module:model/Student
   * @class
   * @param id {Number} 
   * @param name {String} 
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  /**
   * Constructs a <code>Student</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Student} obj Optional instance to populate.
   * @return {module:model/Student} The populated <code>Student</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Student();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
Student.prototype.id = undefined;

/**
 * @member {String} name
 */
Student.prototype.name = undefined;

