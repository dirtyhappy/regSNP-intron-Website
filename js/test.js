

$(function(){
  document.getElementById('input_form').noValidate = true;



//FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

	function isEmpty(el) {
		return !el.value || el.value == el.placeholder;
	}

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

  function validateTextInput(){
    var text = document.getElementById('TextArea');
    if (isEmpty(text)){
      //input is empty

      return true;
    }
    else if (!/[^\d\w\są-ż]+/ig.test(text.value)){
      var lines = text.value.split('\n');
      for (var i = 0; i < lines.length; i++){
          var line = lines[i];
          var strings = line.split(/[\s, ]/);
          if (strings.length != 4){
            setErrorMessage(text, 'Input must contain 4 columns : chromosome number, position, reference allele, and alternative allele');
            return false;
          }
      }
      return true;

    }
    else {
      setErrorMessage(text, "Please Enter Valid Input");
      return false;
    }

  }

////////////////////////////////////////////////////////////////////////////////

  function validateFile(){
    var fileEl = document.getElementById('InputFile');
    if (isEmpty(fileEl)){
      return true;
    }
    var fileName = fileEl.value;
    var selectorType = document.getElementById('SelectFormat').value;
    var allowedExtensions = ['txt', 'vcf', 'csv'];
    var fileExtension = fileName.split('.').pop().toLowerCase();
    for(var i = 0; i < allowedExtensions.length; i++){
      if(allowedExtensions[i] == fileExtension){
        if (selectorType != fileExtension){
          setErrorMessage(document.getElementById('SelectFormat'), "Filetype must match selector");
          return false;
        }else{
          return true;
        }
      }
    }

    setErrorMessage(fileEl, "Invalid File Type");
    return false;
  }

////////////////////////////////////////////////////////////////////////////////

  function validateDescription (){
    var description = document.getElementById("InputDescription");
    if (isEmpty(description)){
      return true;
    }
    else if (!/[^\d\w\są-ż]+/ig.test(description.value)){
      return true;
    }
    else {
      setErrorMessage(description, "Invalid Input");
      return false;
    }
  }

////////////////////////////////////////////////////////////////////////////////

  function validateEmail(){
    var email = document.getElementById("InputEmail");
    if (isEmpty(email)){
      return true;
    }
    else if (!/[^@]+@[^@]+/.test(email.value)){
      setErrorMessage(email, "Please enter a valid email address");
      return false;
    }
    else {
      return true;
    }

  }
  
////////////////////////////////////////////////////////////////////////////////

  //VALIDATION
  $('#input_form').on('submit', function(e){
    var text = document.getElementById('TextArea');
    var file = document.getElementById("InputFile");
    var description = document.getElementById("InputDescription");
    var email = document.getElementById("InputEmail");
    var valid  = { } ;

    var isFormValid;

    if(!validateTextInput()){
      showErrorMessage(text);
      valid.text = false;
    }else{
      removeErrorMessage(text)
      valid.text = true;
    }

    if(!validateFile()){
      showErrorMessage(file);
      showErrorMessage(document.getElementById('SelectFormat'));
      valid.file = false;
    }else{
      removeErrorMessage(file);
      valid.file = true;
    }

    if(!validateDescription()){
      showErrorMessage(description);
      valid.description = false;
    }else{
      removeErrorMessage(description);
      valid.description = true;
    }

    if(!validateEmail()){
      showErrorMessage(email);
      valid.email = false;
    }else{
      removeErrorMessage(email);
      valid.email = true;
    }

    if(isEmpty(document.getElementById("TextArea")) && isEmpty(document.getElementById("InputFile"))){
        setErrorMessage(document.getElementById("TextArea"), "Please add input");
        setErrorMessage(document.getElementById("InputFile"), "Please add input");
        showErrorMessage(text);
        showErrorMessage(file);
        valid.text = false;
        valid.file = false;

    }

    for (var field in valid){
      if (!valid[field]){
        isFormValid = false;
        break;
      }
      isFormValid = true;
    }

    if(!isFormValid){
      e.preventDefault();
    }

  })
})
