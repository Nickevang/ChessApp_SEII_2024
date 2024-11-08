# YouChessApi.CoachApi

All URIs are relative to *https://virtserver.swaggerhub.com/TSAISIDOROS/SySkaki/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getCoach**](CoachApi.md#getCoach) | **GET** /coach/{coachID} | Get coach by ID
[**postCoach**](CoachApi.md#postCoach) | **POST** /coach | Create a new coach given their name

<a name="getCoach"></a>
# **getCoach**
> Coach getCoach(coachID)

Get coach by ID

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.CoachApi();
let coachID = 789; // Number | Coach ID to get

apiInstance.getCoach(coachID, (error, data, response) => {
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
 **coachID** | **Number**| Coach ID to get | 

### Return type

[**Coach**](Coach.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="postCoach"></a>
# **postCoach**
> Coach postCoach(body)

Create a new coach given their name

### Example
```javascript
import {YouChessApi} from 'you_chess_api';

let apiInstance = new YouChessApi.CoachApi();
let body = new YouChessApi.Coach(); // Coach | JSON object with the studentID and groupID

apiInstance.postCoach(body, (error, data, response) => {
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
 **body** | [**Coach**](Coach.md)| JSON object with the studentID and groupID | 

### Return type

[**Coach**](Coach.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

