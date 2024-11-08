# YouChessApi.StudentApi

All URIs are relative to *https://virtserver.swaggerhub.com/TSAISIDOROS/SySkaki/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getStudent**](StudentApi.md#getStudent) | **GET** /student/{studentID} | Get student by ID

<a name="getStudent"></a>
# **getStudent**
> Student getStudent(studentID)

Get student by ID

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.StudentApi();
let studentID = 789; // Number | Student ID to get

apiInstance.getStudent(studentID, (error, data, response) => {
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
 **studentID** | **Number**| Student ID to get | 

### Return type

[**Student**](Student.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

