/**
 * CyberSource Flex API
 * Simple PAN tokenization service
 *
 * OpenAPI spec version: 0.0.1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.2.3
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PtsV2PaymentsRefundPost400Response', 'model/UmsV1UsersGet200Response'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/PtsV2PaymentsRefundPost400Response'), require('../model/UmsV1UsersGet200Response'));
  } else {
    // Browser globals (root is window)
    if (!root.CyberSource) {
      root.CyberSource = {};
    }
    root.CyberSource.UserManagementApi = factory(root.CyberSource.ApiClient, root.CyberSource.PtsV2PaymentsRefundPost400Response, root.CyberSource.UmsV1UsersGet200Response);
  }
}(this, function(ApiClient, PtsV2PaymentsRefundPost400Response, UmsV1UsersGet200Response) {
  'use strict';

  /**
   * UserManagement service.
   * @module api/UserManagementApi
   * @version 0.0.1
   */

  /**
   * Constructs a new UserManagementApi. 
   * @alias module:api/UserManagementApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(configObject, apiClient = undefined) {
    this.apiClient = apiClient || ApiClient.instance;

    this.apiClient.setConfiguration(configObject);


    /**
     * Callback function to receive the result of the getUsers operation.
     * @callback module:api/UserManagementApi~getUsersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UmsV1UsersGet200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get user based on organization Id, username, permission and role
     * This endpoint is to get all the user information depending on the filter criteria passed in the query.
     * @param {Object} opts Optional parameters
     * @param {String} opts.organizationId This is the orgId of the organization which the user belongs to.
     * @param {String} opts.userName User ID of the user you want to get details on.
     * @param {String} opts.permissionId permission that you are trying to search user on.
     * @param {String} opts.roleId role of the user you are trying to search on.
     * @param {module:api/UserManagementApi~getUsersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UmsV1UsersGet200Response}
     */
    this.getUsers = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'organizationId': opts['organizationId'],
        'userName': opts['userName'],
        'permissionId': opts['permissionId'],
        'roleId': opts['roleId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json;charset=utf-8'];
      var accepts = ['application/hal+json;charset=utf-8'];
      var returnType = UmsV1UsersGet200Response;

      return this.apiClient.callApi(
        '/ums/v1/users', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));