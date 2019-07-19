$(function () {
 document.getElementById('input_form').noValidate = true;

 var text = document.getElementById('TextArea');
 var file = document.getElementById("InputFile");
 var selector = document.getElementById('SelectFormat');
 var description = document.getElementById("InputDescription");
 var email = document.getElementById("InputEmail");

 var textStatus = false;

 var fileExtensionStatus = {
  value :false 
 };

 var fileContentStatus = false;

 var selectorStatus = true;

 var descriptionStatus = true;

 var emailStatus = true;

 var noInputStatus = true;

 //FUNCTIONS
 ////////////////////////////////////////////////////////////////////////////////

 	function isEmpty(el) {
 		return !el.value || el.value == el.placeholder;
 	}

 ////////////////////////////////////////////////////////////////////////////////

   function setErrorMessage(el, message){
 		$(el).data('errorMessage', message);
 	}

 ////////////////////////////////////////////////////////////////////////////////

   function showErrorMessage(el){
 		var $el = $(el);
 		var errorContainer = $el.siblings('.error');

 		if (!errorContainer.length){
 			errorContainer = $('<span class="error"></span>').insertAfter($el);
 		}

 		errorContainer.text($el.data('errorMessage'));
 	}

 ////////////////////////////////////////////////////////////////////////////////

   function removeErrorMessage(el){
     var $el = $(el);
     var errorContainer = $el.siblings('.error');
     if(errorContainer.length){
       errorContainer.text("");
     }
   }


 ////////////////////////////////////////////////////////////////////////////////

 function checkAlleles(input){
		var alleles = ["A", "T", "G", "C", "a", "t", "g", "c"];
		for (var i = 0; i < alleles.length; i++){
			if (input == alleles[i]){
				return true;
			}
		}
		return false;
	}
////////////////////////////////////////////////////////////////////////////////


 function checkLines(el,lines){
  for (var i = 0; i < lines.length; i++){
   var line = lines[i];
   if (line === ""){
    continue;
   }
   var strings = line.trim().split(/[,\s ]+/);
   if(strings[0] == "chromosome" || strings[0] == "chrom" || strings[0] == "c"){
    continue;
   }
   if (strings.length != 4){
    setErrorMessage(el, 'Input must contain 4 columns : chromosome number, position, reference allele, and alternative allele ' + "invalid input at line: " + (i+1));
    return false;
   }
   else {
    if (!/\b(\w*chr\w*)\b/.test(strings[0]) && !/[0-9]+/.test(strings[0])) {
     setErrorMessage(el, "First column must be chromosome. Invalid input at line "+ (i+1));
     return false;
    }
    if (!/\d+/.test(strings[1])){
     setErrorMessage(el, "Second column must be position number. Invalid input at line "+ (i+1));
     return false;
    }
    if(checkAlleles(strings[2])){
     if(!checkAlleles(strings[3])){
      setErrorMessage(el, "Last column must be alternative allele. Invalid input at line "+ (i+1));
      return false;
     }
    }else{
     setErrorMessage(el, "Second to last column must be reference allele. Invalid input at line "+ (i+1));
     return false;
    }
   }
  }
  return true;
 }

 function validateText(){

  if (isEmpty(text)){
   textStatus = true;
  }
  else if (!/[^,\d\w\są-ż]+/ig.test(text.value)){
    var lines = text.value.split('\n');
    if (!checkLines(text, lines)){
     textStatus = false;
    }
    else{
     textStatus = true;
    }
  }
  else {
   setErrorMessage(text, "Please Enter Valid Input." );
   textStatus = false;
  }

 }

  function validateFileExtension (){
  if (isEmpty(file)){
   fileExtensionStatus.value = true;
  }
  else{
   var allowedExtensions = ['txt','csv'];
   var fileExtension = file.value.split('.').pop().toLowerCase();
   if (fileExtension == 'vcf'){
    fileExtensionStatus.value = true;
    fileExtensionStatus.type = 'vcf';
   }
   else{
   for (var i = 0; i < allowedExtensions.length; i++){
    if(allowedExtensions[i] == fileExtension){
     fileExtensionStatus.value = true;
     fileExtensionStatus.type = allowedExtensions[i];
     break;
    }
    else {
     setErrorMessage(file, "Invalid File Type");
     fileExtensionStatus.value = false;

     }
    }
   }
  }
 }

 function validateFileContents(){
  if(isEmpty(file)){
   fileContentStatus = true;
  }
  else{
   var reader = new FileReader();
   var content = file.files[0];

   reader.onload = function(e){
    var fileText = e.target.result;
    var lines = fileText.split('\n');
    if (fileText === ""){
     setErrorMessage(file, "File is Empty");
     showErrorMessage(file);
     fileContentStatus = false;

    }
    else if (/[^,\d\w\są-ż]+/ig.test(fileText)){
      setErrorMessage(file, "Please upload valid input");
      showErrorMessage(file);
      fileContentStatus = false;
    }
    else if (!checkLines(file, lines)){
     showErrorMessage(file);
     fileContentStatus = false;
    }
    else{
      fileContentStatus = true;
      removeErrorMessage(file);
     }

   };
   reader.readAsText(content);

  }
 }

 function validateVCF(){
  if(isEmpty(file)){
   fileContentStatus = true;
  }
  else{
   var reader = new FileReader();
   var content = file.files[0];
   reader.onload = function(e){
    var fileText = e.target.result;
    if (fileText === ""){
     setErrorMessage(file, "File is Empty");
     showErrorMessage(file);
     fileContentStatus = false;
    }
    else{
     fileContentStatus = true;
     removeErrorMessage(file);
     }
    };
    reader.readAsText(content);
   }
  }


  function validateSelector (){
  if(isEmpty(file)){
   selectorStatus = true;
  }
  else {
   var fileExtension = file.value.split('.').pop().toLowerCase();
   if(selector.value == fileExtension){
    selectorStatus = true;
   }
   else{
    setErrorMessage(selector, "Selector must match filetype");
    selectorStatus = false;
   }
  }
 }

 function validateDescription(){
  if (isEmpty(description)){
   descriptionStatus = true;
  }
  else if (!/[^\d\w\są-ż]+/ig.test(description.value)){
    descriptionStatus = true;
  }
  else{
   setErrorMessage(description, "Invalid Input");
   descriptionStatus = false;
  }

 }

  function validateEmail (){
  if (isEmpty(email)){
    emailStatus = true;
  }
  else if (!/[^@]+@[^@]+/.test(email.value)){
    setErrorMessage(email, "Please enter a valid email address");
    emailStatus = false;

  }
  else {
    emailStatus = true;
  }

 }
////////////////////////////////////////////////////////////////////////////////

  $('#example').click(function(e){
	  $.ajax({
	   url:'../input_example.txt',
	   success : function (data) {
		   $("#TextArea").val(data);
		   validateText();
		   showErrorMessage(text);
		   if(textStatus === true){
			   removeErrorMessage(text);
		   }
	   }
	})
      });

  $('#TextArea').bind('input propertychange', function() {
   validateText();

   showErrorMessage(text);
   if (textStatus === true){
    removeErrorMessage(text);
   }
});


$('#InputDescription').bind('input propertychange', function() {
 validateDescription();
 showErrorMessage(description);
 if (descriptionStatus === true){
  removeErrorMessage(description);
 }
});

$('#InputEmail').bind('input propertychange', function() {
 validateEmail();
 showErrorMessage(email);
 if (emailStatus === true){
  removeErrorMessage(email);
 }
});

$('#SelectFormat').bind('input propertychange', function() {
 validateSelector();
 showErrorMessage(selector);
 if (selectorStatus === true){
  removeErrorMessage(selector);
 }
});

$('#InputFile').bind('input propertychange', function() {
 validateFileExtension();

 showErrorMessage(file);
 if(fileExtensionStatus.value === true){
  validateSelector();
  showErrorMessage(selector);
  if (selectorStatus === true){
   removeErrorMessage(selector);
  }
  if(fileExtensionStatus.type == 'vcf'){
  validateVCF();
 }else{
   validateFileContents();
  }
 }
});

  $('#input_form').on('submit', function(e){

   if (isEmpty(text) && isEmpty(file)){
    noInputStatus = false;
    setErrorMessage(text, "Please paste or upload input");
    setErrorMessage(file, "Please paste or upload input");
    showErrorMessage(text);
    showErrorMessage(file);
   }else {
    noInputStatus = true;

   }
   if(!selectorStatus || !descriptionStatus || !emailStatus || !noInputStatus){
    e.preventDefault();
   }
   else if (textStatus && fileExtensionStatus.value && fileContentStatus){
    $('#TextArea').val('');
   }
   else if (!textStatus && (!fileExtensionStatus.value || !fileContentStatus)){
    e.preventDefault();
   }
   else if (!textStatus && fileExtensionStatus.value && fileContentStatus){
    $('#TextArea').val('');
   }
   else if (textStatus && (!fileExtensionStatus.value || !fileContentStatus)){
    $('#InputFile').val('');
   }
  });
});
