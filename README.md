# regSNP-intron-Website

MURI Summer 2019. Predict disease-causing probability of human intronic SNVs. Original code from https://github.com/linhai86/regsnp_intron

Frontend code for regSNP_Intron.  

## Dependencies

The website is dependent on the following libraries:

* jQuery (>=3.1.0)
* Bootstrap (>=3.3.7) - For styling.
* dataTables (>=1.10.12) - For displaying the results, only needed on result page.
* biodalliance - Displays the human genome on the result page.
* qtip2 - For tooltips on the result page, only needed on result page.

__Add the following lines for javascript dependency support:__

 jQuery -`<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>` must be first script.
 
 Boostrap - `<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>`
 
 ajax - `<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>`
  
  `<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/additional-methods.min.js"></script>`
  
 __These lines support result page dependencies:__
  
 dataTables - `<script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>`
  
  `<script src="https://cdn.datatables.net/1.10.12/js/dataTables.bootstrap.min.js"></script>`
  
 biodalliance - `<script language="javascript" src="//www.biodalliance.org/release-0.13/dalliance-compiled.js"></script>`
  
 qtip2 - `<script type="text/javascript" src="https://cdn.jsdelivr.net/qtip2/3.0.3/basic/jquery.qtip.min.js"></script>`
  

## Directory

Each page is stored at root level.

The *resources* folder is used to contain images and manual css scripts.

The *js* folder is used to store manual javascript scripts.

Index page form validation requires the *validation_form_v2.js* script.

Add the line `<script src="js/validate_form_v2.js"></script>` after all other script tags on `index.html` for form validation.

## Styling

Default styling is handled by Bootstrap.

Manual styles are located in `resources/css/mystyle.css`. Should be added to all pages with manual styling. Add after default styles.



