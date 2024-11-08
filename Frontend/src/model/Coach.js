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
 * The Coach model module.
 * @module model/Coach
 * @version 1.0.0-oas3
 */
export default class Coach {
  /**
   * Constructs a new <code>Coach</code>.
   * @alias module:model/Coach
   * @class
   * @param id {Number} 
   * @param name {String} 
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  /**
   * Constructs a <code>Coach</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Coach} obj Optional instance to populate.
   * @return {module:model/Coach} The populated <code>Coach</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Coach();
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
Coach.prototype.id = undefined;

/**
 * @member {String} name
 */
Coach.prototype.name = undefined;

