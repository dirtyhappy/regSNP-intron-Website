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

	function checkAlleles(input){
		var alleles = ["A", "T", "G", "C"];
		for (var i = 0; i < alleles.length; i++){
			if (input == alleles[i]){
				return true;
			}
		}
		return false;
	}

////////////////////////////////////////////////////////////////////////////////

	// function validateFileContents (file){
	// 	var fileEl = document.getElementById("InputFile");
	// 	if (file === ""){
	// 		setErrorMessage(fileEl, "File is Empty");
	// 		return false;
	// 	}
	// 	if (/[^\d\w\są-ż]+/ig.test(file)){
	// 		setErrorMessage(fileEl, "Please upload valid input");
	// 		return false;
	// 	}
 //
	// 	var lines = file.split('\n');
	// 	for (var i = 0; i < lines.length; i++){
	// 		var line = lines[i];
	// 		var strings = line.trim().split(/[\s ]+/);
 //   if (strings[0] === ""){
 //    continue;
 //   }
	// 		if (strings.length != 4){
	// 			setErrorMessage(fileEl, "Input Must have 4 columns");
	// 			return false;
	// 		}
	// 		if (!/\b(\w*chr\w*)\b/.test(strings[0])){
	// 			setErrorMessage(fileEl, "First column must be chromosome.");
	// 			return false;
	// 		}
	// 		if (!/\d+/.test(strings[1])){
	// 			setErrorMessage(fileEl, "Second column must be position number.");
	// 			return false;
	// 		}
	// 		if (!checkAlleles(strings[2])){
	// 		 setErrorMessage(fileEl, "S");
	// 			return false;
	// 		}
	// 		if(!checkAlleles(strings[3])){
	// 			setErrorMessage(fileEl, "Last column must be alternative allele");
	// 			return false;
	// 		}
 //
	// 	}
 //
	// 	return true;
	// }

////////////////////////////////////////////////////////////////////////////////

  function validateTextInput(){
		var text = document.getElementById("TextArea");
    if (isEmpty(text)){
      //input is empty
      return true;
    }
    else if (!/[^\d\w\są-ż]+/ig.test(text.value)){
      var lines = text.value.split('\n');
      for (var i = 0; i < lines.length; i++){
          var line = lines[i];
          var strings = line.trim().split(/[\s ]+/);
          if(strings[0] === ""){
           continue;
          }
          if (strings.length != 4){
            setErrorMessage(text, 'Input must contain 4 columns : chromosome number, position, reference allele, and alternative allele ' + "invalid input at line: " + (i+1));
            return false;
          }else {
						if (!/\b(\w*chr\w*)\b/.test(strings[0])){
							setErrorMessage(text, "First column must be chromosome. Invalid input at line "+ (i+1));
							return false;
						}
						if (!/\d+/.test(strings[1])){
							setErrorMessage(text, "Second column must be position number. Invalid input at line "+ (i+1));
							return false;
						}
						if(checkAlleles(strings[2])){
							if(!checkAlleles(strings[3])){
								setErrorMessage(text, "Last column must be alternative allele. Invalid input at line "+ (i+1));
								return false;
							}
						}else{
							setErrorMessage(text, "Second to last column must be reference allele. Invalid input at line "+ (i+1));
							return false;
						}
					}
				}
				return true;
      }
    else {
      setErrorMessage(text, "Please Enter Valid Input." );
      return false;
    }

  }

////////////////////////////////////////////////////////////////////////////////

  function validateFile(){
    var fileEl = document.getElementById('InputFile');
    var fileName = fileEl.value;
    if (isEmpty(fileEl)){
      return true;
    }
    var selectorType = document.getElementById('SelectFormat').value;
    var allowedExtensions = ['txt', 'vcf', 'csv'];
    var fileExtension = fileName.split('.').pop().toLowerCase();
    for(var i = 0; i < allowedExtensions.length; i++){
      if(allowedExtensions[i] == fileExtension){
				   // var contents = fileEl.files[0];
				   // var reader = new FileReader();
       // reader.onload = function(e){
       //   var text = e.target.result;
       //   if(!validateFileContents(text)){
       //    valid.file = false;
       //    showErrorMessage(fileEl);
       //   }
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
   //e.preventDefault();
    var text = document.getElementById('TextArea');
    var file = document.getElementById("InputFile");
    var description = document.getElementById("InputDescription");
    var email = document.getElementById("InputEmail");
    var valid = { };
    console.log(valid);

    var isFormValid;

    if(!validateTextInput()){
      showErrorMessage(text);
      valid.text = false;
    }else{
      removeErrorMessage(text);
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
        setErrorMessage(document.getElementById("TextArea"), "Please paste input or upload file.");
        setErrorMessage(document.getElementById("InputFile"), "Please paste input or upload file.");
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

  });
});
