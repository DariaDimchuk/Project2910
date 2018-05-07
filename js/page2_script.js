/*	WINDOW ONLOAD FUNCTIONALITY	*/


/**
 * Runs when the page is loaded.
 *
 * Important: all common code between scripts and pages must be repeated again in window.onload - otherwise another
 * script page will overwrite the needed code.
 *
 * So, don't combine common code in window.onload between pages into one script file and hope it'll all get called.
 */
window.onload=function(){

    connecttoPHPfile_ShowSearchResults_URLquery("recipe_object.php");
    triggerSearchOnEnter(); //must be called in window.onload to avoid null

}//end window.onload



/*	RESULTS BUTTONS FUNCTIONALITY	*/


/**
 * When clicked, FOOD button on the search results page will reveal content
 * with a swing animation. Will hide content when clicked again.
 */
$(document).ready(function(){
    $("#food-button").click(function(){
        $("#food-recipes").toggle('450', "swing", function(){
            //Animation done.
        });
    });
});


/**
 * When clicked, HOUSEHOLD button on the search results page will reveal content
 * with a swing animation. Will hide content when clicked again.
 */
$(document).ready(function(){
    $("#household-button").click(function(){
        $("#household-recipes").toggle('450', "swing", function(){
            //Animation done.
        });
    });
});


/**
 * When clicked, HEALTH button on the search results page will reveal content
 * with a swing animation. Will hide content when clicked again.
 */
$(document).ready(function(){
    $("#health-button").click(function(){
        $("#health-recipes").toggle('450', "swing", function(){
            //Animation done.
        });
    });
});


/**
 * When clicked, TIPS button on the search results page will reveal content
 * with a swing animation. Will hide content when clicked again.
 */
$(document).ready(function(){
    $("#tips-button").click(function(){
        $("#tips-recipes").toggle('450', "swing", function(){
            //Animation done.
        });
    });
});




/*  SERVER CONNECTION FUNCTIONS    */

/**
 * Method used to show the link results to recipes on page 2 after a search.
 *
 * Ajax connection to a selected php file. The search query is selected by using the URL search.
 *
 * Method connects to database, runs the selected PHP file, and returns results.
 * @param phplink
 */
function connecttoPHPfile_ShowSearchResults_URLquery(phplink){
    $.ajax({
        url: phplink + "?query=" + getURLsearchValue("query"),
        dataType: "html",
        type: "GET",
        data: {output: 'html'},
        success: function(data) {
            console.log(data);

            $('.content').show();
            document.getElementById("search-result-show").textContent= "Search: " + toTitleCase(getURLsearchValue("query"));

            //displays results on page - do not remove
            $(".content").append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {

            document.getElementById("search-result-show").textContent= "Nothing found. Try something else!";
            $('.content').hide();
        }
    });
}//end connecttoPHPfile function




/**
 * On a search, this method triggers server side and displays the returned array
 * of results (as $recipe objects) in the appropriate categories.
 *
 *
 * Method used in PHP file and called from PHP file 'recipe_object.php'
 *
 * Takes a php array of  $recipe objects and the array's size, and loops through it to separate the
 * recipe links by their category and place them under the correct div in the html.
 *
 * Separated by 'food', 'beauty', 'household', 'tip' categories.
 *
 * @param arraysize - size of the array, use 'sizeof($arraynamehere)' in PHP server-end
 * @param variable - array of $recipe objects.
 */
function usePhpVarToFillResultContent(arraysize, variable){

    window.searchResultsArraySize = arraysize;
    window.searchResultsArray = variable;

    if(searchResultsArraySize === 0 || variable === null || variable === ""){
        document.getElementById("search-result-show").textContent= toTitleCase(getURLsearchValue("query"))
            + " not found. Try something else!";

        $('.content').hide();

    }else{

        $('.content').show();

        for (i=0; i<searchResultsArraySize; i++) {
            if(searchResultsArray[i]['category'] === 'food'){
                $('.food').show();
                $('#food-recipes').append(searchResultsArray[i]['html_link'] + "<br><br>");
            }

            if(searchResultsArray[i]['category'] === 'beauty'){
                $('.health').show();
                $('#health-recipes').append(searchResultsArray[i]['html_link'] + "<br><br>");
            }

            if(searchResultsArray[i]['category'] === 'household'){
                $('.household').show();
                $('#household-recipes').append(searchResultsArray[i]['html_link'] + "<br><br>");
            }

            if(searchResultsArray[i]['category'] === 'tip'){
                $('.tips').show();
                $('#tips-recipes').append(searchResultsArray[i]['html_link'] + "<br><br>");
            }
        }//end loop

    }//end else

}//end


/*   BASIC FORMATTING   */

/**
 * Capitalize the first letter of the string, keep the rest lower case.
 * @param str - string to title case
 * @returns {formatted string}
 */
function toTitleCase(str)
{
    if(str === null){
        return "";
    }else{
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
}//end



/**
 * Lower case the entire given string.
 * @param str
 * @returns {*}
 */
function toLowerCase(str)
{
    if(str !== null){
        return str.replace(/\w\S*/g, function(txt){return txt.substr(0).toLowerCase();});
    }else return "";
}//end
