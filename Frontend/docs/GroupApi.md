# YouChessApi.GroupApi

All URIs are relative to *https://virtserver.swaggerhub.com/TSAISIDOROS/SySkaki/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createGroup**](GroupApi.md#createGroup) | **POST** /group | Create a new group
[**deleteGroup**](GroupApi.md#deleteGroup) | **DELETE** /group/{groupID} | Delete a group
[**enrollStudent**](GroupApi.md#enrollStudent) | **POST** /groups/enroll | Enroll a student in a group
[**findAvailableGroups**](GroupApi.md#findAvailableGroups) | **GET** /group/findAvailable | Find available groups
[**getGroup**](GroupApi.md#getGroup) | **GET** /group/{groupID} | Get group by ID
[**unenrollStudent**](GroupApi.md#unenrollStudent) | **POST** /groups/unenroll | Unenroll a student from a group

<a name="createGroup"></a>
# **createGroup**
> GroupOut createGroup(body)

Create a new group

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.GroupApi();
let body = new YouChessApi.GroupIn(); // GroupIn | FR1 - The coach must be able to create groups

apiInstance.createGroup(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**GroupIn**](GroupIn.md)| FR1 - The coach must be able to create groups | 

### Return type

[**GroupOut**](GroupOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteGroup"></a>
# **deleteGroup**
> deleteGroup(groupID)

Delete a group

FR2 - The coach must be able to delete groups

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.GroupApi();
let groupID = 789; // Number | Group ID to delete

apiInstance.deleteGroup(groupID, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupID** | **Number**| Group ID to delete | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="enrollStudent"></a>
# **enrollStudent**
> GroupsEnrollBody enrollStudent(body)

Enroll a student in a group

FR5 - The student must be able to enroll in an available group

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.GroupApi();
let body = new YouChessApi.GroupsEnrollBody(); // GroupsEnrollBody | JSON object with the studentID and groupID

apiInstance.enrollStudent(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**GroupsEnrollBody**](GroupsEnrollBody.md)| JSON object with the studentID and groupID | 

### Return type

[**GroupsEnrollBody**](GroupsEnrollBody.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="findAvailableGroups"></a>
# **findAvailableGroups**
> [GroupOut] findAvailableGroups(opts)

Find available groups

FR3, FR4 - The student must be able to see a list of available groups, and filter them by their attributes

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.GroupApi();
let opts = { 
  'priceMin': 789, // Number | Min price value that needs to be considered for filtering
  'priceMax': 789, // Number | Max price value that needs to be considered for filtering
  'level': "level_example", // String | Level that needs to be considered for filtering
  'sortBy': "sortBy_example" // String | Sorting method that needs to be considered for filtering
};
apiInstance.findAvailableGroups(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **priceMin** | **Number**| Min price value that needs to be considered for filtering | [optional] 
 **priceMax** | **Number**| Max price value that needs to be considered for filtering | [optional] 
 **level** | **String**| Level that needs to be considered for filtering | [optional] 
 **sortBy** | **String**| Sorting method that needs to be considered for filtering | [optional] 

### Return type

[**[GroupOut]**](GroupOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getGroup"></a>
# **getGroup**
> GroupOut getGroup(groupID)

Get group by ID

FR6 - The user must be able to see the groups they are in

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.GroupApi();
let groupID = 789; // Number | Group ID to get

apiInstance.getGroup(groupID, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupID** | **Number**| Group ID to get | 

### Return type

[**GroupOut**](GroupOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="unenrollStudent"></a>
# **unenrollStudent**
> GroupOut unenrollStudent(body)

Unenroll a student from a group

FR7 - The student must be able to leave a group

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.GroupApi();
let body = new YouChessApi.GroupsUnenrollBody(); // GroupsUnenrollBody | JSON object with the studentID and groupID

apiInstance.unenrollStudent(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**GroupsUnenrollBody**](GroupsUnenrollBody.md)| JSON object with the studentID and groupID | 

### Return type

[**GroupOut**](GroupOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

