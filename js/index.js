
const baseUrl = "http://api.login2explore.com:5577";
const endPointUrlRetrieval = "/api/irl";
const endPointUrlManipulation = "/api/iml";
const dbName = "StudentTable";
const relName = "School-DB";
const connToken = "90931857|-31949301429717516|90963101";

 $('#stdRoll').focus();
 
 function saveRecNo2LS(jsonObj){
     const lvData = JSON.parse(jsonObj.data);
     localStorage.setItem('recNo',lvData.rec_no);
 }
 
 function getstdRollAsJsonObj(){
     const stdRoll = $('#stdRoll').val();
     const jsonStr ={
         rollNum: stdRoll   
     };
     return JSON.stringify(jsonStr);
 }
 
 function fillData(jsonObj){
     saveRecNo2LS(jsonObj);
     const record = JSON.parse(jsonObj.data).record;
     $("#stdRoll").val(record.rollNum);
     $("#stdName").val(record.name);
     $("#stdCls").val(record.class);
     $("#stdDob").val(record.dob);
     $("#stdAdd").val(record.address);
     $("#stdEnroll").val(record.enrollmentdate);
 }
 
 function validateData(){
     let stdRoll,stdName,stdCls,stdDob,stdAdd,stdEnroll;
     stdRoll = $("#stdRoll").val();
     stdName = $("#stdName").val();
     stdCls = $("#stdCls").val();
     stdDob = $("#stdDob").val();
     stdAdd = $("#stdAdd").val();
     stdEnroll = $("#stdEnroll").val();
     
     if(stdRoll === ''){
        document.getElementById("rollMsg").style = "display:show";
        document.getElementById("rollMsg").innerHTML = "Student Roll number is missing*";
        document.getElementById("rollMsg").style = "color:red";
        $("#stdRoll").focus();
        return "";
     }
     if(stdName === ''){
        document.getElementById("nameMsg").style = "display:show";
        document.getElementById("nameMsg").innerHTML = "Student Name is missing*";
        document.getElementById("nameMsg").style = "color:red";
        $("#stdName").focus();
        return "";
     }
     if(stdCls === ''){
        document.getElementById("classMsg").style = "display:show";
        document.getElementById("classMsg").innerHTML = "Student Class is missing*";
        document.getElementById("classMsg").style = "color:red";
        $("#stdCls").focus();
        return "";
     }
     if(stdDob === ''){
        document.getElementById("dobMsg").style = "display:show";
        document.getElementById("dobMsg").innerHTML = "Student Date Of Birth is missing*";
        document.getElementById("dobMsg").style = "color:red";
        $("#stdDob").focus();
        return "";
     }
     if(stdAdd === ''){
        document.getElementById("addressMsg").style = "display:show";
        document.getElementById("addressMsg").innerHTML = "Student Address is missing*";
        document.getElementById("addressMsg").style = "color:red";
        $("#stdAdd").focus();
        return "";
     }
     if(stdEnroll === ''){
        document.getElementById("enrollMsg").style = "display:show";
        document.getElementById("enrollMsg").innerHTML = "Student Enrollment Date is missing*";
        document.getElementById("enrollMsg").style = "color:red";
        $("#stdEnroll").focus();
           return "";
     }
     
     const jsonStrObj = {
         rollNum:stdRoll,
         name:stdName,
         class:stdCls,
         dob:stdDob,
         address:stdAdd,
         enrollmentdate:stdEnroll
     };
     
     return JSON.stringify(jsonStrObj);   
 }
 
 function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr) {
   
    var value1 = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"dbName\": \""
            + dbname
            + "\",\n"
            + "\"rel\" : \""
            + relationName
            + "\",\n"
            + "\"jsonStr\":\n"
            + jsonObjStr
             + "\n"
            + "}";
    return value1;
}

function executeCommandAtGivenBaseUrl(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
 
 
 function getStd(){
    const stdRollJsonObj = getstdRollAsJsonObj();
    const getRequest = createGET_BY_KEYRequest(connToken, dbName, relName, stdRollJsonObj);
    jQuery.ajaxSetup({async:false});
    const resJsonObj = executeCommandAtGivenBaseUrl(getRequest , baseUrl, endPointUrlRetrieval);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stdName").focus();
        
    }else if(resJsonObj.status === 200){
        $("#stdRoll").prop("disabled", true);
        fillData(resJsonObj);
        
        $("#change").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#stdName").focus();
    }
 }
 
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

function saveData(){
    const jsonStrObj = validateData();
    if(jsonStrObj === ""){
        return "";
    }
    const putRequest = createPUTRequest(connToken,jsonStrObj, dbName, relName);
    jQuery.ajaxSetup({async:false});
    const resJsonObj = executeCommandAtGivenBaseUrl(putRequest, baseUrl, endPointUrlManipulation);
    jQuery.ajaxSetup({async:true});
    document.getElementById("rollMsg").style = "display:none";
    document.getElementById("nameMsg").style = "display:none";
    document.getElementById("classMsg").style = "display:none";
    document.getElementById("dobMsg").style = "display:none";
    document.getElementById("addressMsg").style = "display:none";
    document.getElementById("enrollMsg").style = "display:none";
    resetForm();
    $("#stdRoll").focus();
}

function createUPDATERecordRequest(token, jsonObj, dbName, relName, reqId) {
    var req = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"UPDATE\",\n"
            + "\"rel\" : \""
            + relName
            + "\",\n"
            + "\"jsonStr\":{ \""
            + reqId
            + "\":\n"
            + jsonObj
            + "\n"
            + "}}";
    return req;
}

function changeData(){
    const jsonChg = validateData();
    const updateRequest = createUPDATERecordRequest(connToken, jsonChg, dbName,relName, localStorage.getItem("recNo"));
    jQuery.ajaxSetup({async:false});
    const resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, baseUrl,endPointUrlManipulation);
    jQuery.ajaxSetup({async:true});
    document.getElementById("rollMsg").style = "display:none";
    document.getElementById("nameMsg").style = "display:none";
    document.getElementById("classMsg").style = "display:none";
    document.getElementById("dobMsg").style = "display:none";
    document.getElementById("addressMsg").style = "display:none";
    document.getElementById("enrollMsg").style = "display:none";
    resetForm();
    $("#stdRoll").focus();
}

function resetForm() {
    $("#stdRoll").val("");
    $("#stdName").val("");
    $("#stdCls").val("");
    $("#stdDob").val("");
    $("#stdAdd").val("");
    $("#stdEnroll").val("");
    document.getElementById("rollMsg").style = "display:none";
    document.getElementById("nameMsg").style = "display:none";
    document.getElementById("classMsg").style = "display:none";
    document.getElementById("dobMsg").style = "display:none";
    document.getElementById("addressMsg").style = "display:none";
    document.getElementById("enrollMsg").style = "display:none";
    $("#stdRoll").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);    
    $('#stdRoll').focus();
}
