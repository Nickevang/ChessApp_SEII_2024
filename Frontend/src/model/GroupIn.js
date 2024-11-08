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
 * The GroupIn model module.
 * @module model/GroupIn
 * @version 1.0.0-oas3
 */
export default class GroupIn {
  /**
   * Constructs a new <code>GroupIn</code>.
   * @alias module:model/GroupIn
   * @class
   * @param name {String} 
   * @param maxMembers {Number} 
   */
  constructor(name, maxMembers) {
    this.name = name;
    this.maxMembers = maxMembers;
  }

  /**
   * Constructs a <code>GroupIn</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GroupIn} obj Optional instance to populate.
   * @return {module:model/GroupIn} The populated <code>GroupIn</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new GroupIn();
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('maxMembers'))
        obj.maxMembers = ApiClient.convertToType(data['maxMembers'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} name
 */
GroupIn.prototype.name = undefined;

/**
 * @member {Number} maxMembers
 */
GroupIn.prototype.maxMembers = undefined;

