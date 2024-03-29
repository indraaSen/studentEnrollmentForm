# studentEnrollmentForm
It is a basic student enrollment form which takes the basic information of student and store the data in JsonPowerDB also student can update their data by just adding their roll number. project is created by using HTML5, bootstrap, javascript and JsonPowerDB.


## Benefits of using JsonPowerDB

- Can store structured / semi-structured and unstructured data along with other types of files and big-data.
- Dynamic relational constraints while using CRUD operations. i.e. Relational data can be managed without pre-defining PK, FK, UK, databases, tables etc.
- Free from technology constraints - Low-Code and easy to use from any technology via HTTP Rest AP
- Minimum learning curves, builds faster, cuts time to market, reduces the development cost.
- Helps developers in managing their databases using various tools and techniques.


## Release History
### JsonPowerDB
**Version:** 2.0
#### Execute API

```
var baseUrl = "http://api.login2explore.com:5577";
function executeCommand(reqString, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;
    var jsonObj;
    
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
```
#### Create a PUT Request String
```
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}

```

## Features

- Simple to Use
- Fast Response
- Detailed User Interface
## Tech Stack

**Client:** HTML,CSS,Javascript

**Server:** JsonPowerDB

## Screenshots
![1](https://github.com/indraaSen/studentEnrollmentForm/assets/154053128/b3d72d78-c0c4-4b2d-850f-db5e85135194)
![2](https://github.com/indraaSen/studentEnrollmentForm/assets/154053128/227774f4-4180-4173-8155-d2fa9bb2018a)
![3](https://github.com/indraaSen/studentEnrollmentForm/assets/154053128/17643a46-b21b-4ba2-91b2-2c071316071b)
![4](https://github.com/indraaSen/studentEnrollmentForm/assets/154053128/fe5cddab-8d83-4b1d-be62-4cc5ce3ae33a)


### Mobile View

![5](https://github.com/indraaSen/studentEnrollmentForm/assets/154053128/108b5e7b-1512-4709-a337-7ebd40c63901)

