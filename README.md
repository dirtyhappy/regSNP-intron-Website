# regSNP-intron-Website

MURI Summer 2019. Predict disease-causing probability of human intronic SNVs. Original code from https://github.com/linhai86/regsnp_intron

Frontend code for regSNP_Intron.  

## Dependencies

The website is dependent on the following libraries:

* jQuery (>=3.1.0)
* Bootstrap (>=3.3.7) - For styling.
* dataTables (>=1.10.12) - For displaying the results, only needed on result page.
* bioalliance - Displays the human genome on the result page.
* qtip2 - For tooltips on the result page, only needed on result page.

Add the following lines for javascript dependency support.

## Directory

Each page is stored at root level.

The resources folder is used to contain images and manual css scripts.

The js folder is used to store manual javascript scripts.

Index page form validation requires the validation_form_v2.js script.

Add the line `<script src="js/validate_form_v2.js"></script>` after all other script tags on `index.html` for form validation.

## Styling

Default styling is handled by Bootstrap.

Manual styles are located in `resources/css/mystyle.css`. Should be added to all pages with manual styling.



