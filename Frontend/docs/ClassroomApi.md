# YouChessApi.ClassroomApi

All URIs are relative to *https://virtserver.swaggerhub.com/TSAISIDOROS/SySkaki/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getClassroom**](ClassroomApi.md#getClassroom) | **GET** /group/{groupID}/classroom | Get classroom by ID
[**groupGroupIDClassroomSetEditorPost**](ClassroomApi.md#groupGroupIDClassroomSetEditorPost) | **POST** /group/{groupID}/classroom/setEditor | Update studentID of the student who is allowed to edit the chessboard
[**updateClassroom**](ClassroomApi.md#updateClassroom) | **PUT** /group/{groupID}/classroom | Update the classroom

<a name="getClassroom"></a>
# **getClassroom**
> Classroom getClassroom(groupID)

Get classroom by ID

FR8 - The group participants must be able to join the classroom

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.ClassroomApi();
let groupID = 789; // Number | Classroom ID to get

apiInstance.getClassroom(groupID, (error, data, response) => {
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
 **groupID** | **Number**| Classroom ID to get | 

### Return type

[**Classroom**](Classroom.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="groupGroupIDClassroomSetEditorPost"></a>
# **groupGroupIDClassroomSetEditorPost**
> groupGroupIDClassroomSetEditorPost(body, groupID)

Update studentID of the student who is allowed to edit the chessboard

FR10 - The coach must be able to change the ID of the student in control of the Chessboard

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.ClassroomApi();
let body = new YouChessApi.ClassroomSetEditorBody(); // ClassroomSetEditorBody | JSON object with the studentID
let groupID = 789; // Number | Classroom ID for the specific group

apiInstance.groupGroupIDClassroomSetEditorPost(body, groupID, (error, data, response) => {
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
 **body** | [**ClassroomSetEditorBody**](ClassroomSetEditorBody.md)| JSON object with the studentID | 
 **groupID** | **Number**| Classroom ID for the specific group | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="updateClassroom"></a>
# **updateClassroom**
> Classroom updateClassroom(body, groupID)

Update the classroom

FR12 - The coach must be able to change who has the permission to edit the chessboard

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.ClassroomApi();
let body = new YouChessApi.Classroom(); // Classroom | Classroom object with the updated user list and/or editing permission owner
let groupID = 789; // Number | 

apiInstance.updateClassroom(body, groupID, (error, data, response) => {
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
 **body** | [**Classroom**](Classroom.md)| Classroom object with the updated user list and/or editing permission owner | 
 **groupID** | **Number**|  | 

### Return type

[**Classroom**](Classroom.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

