
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

		connecttoPHPfile_AutoQuery_showPage2Results("recipe_object.php");
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
     * Ajax connection to a selected php file, and the search query wanted.
     *
     * Method connects to database, runs the selected PHP file, and returns results.
     *
     * @param phplink - points to php file
     * @param query - search term
     */
    function connecttoPHPfile_showRecipeContent(phplink, query){
        $.ajax({
            url: phplink + "?query=" + query,
            dataType: "html",
            type: "GET",
            data: {output: 'html'},
            success: function(data) {
                console.log(data);

                $(document).ready(function() {
                    $('.content').show();
                });

                document.getElementById("search-result-show").textContent= "Search: " + toTitleCase(data);

                //puts on page
                //$(".content").replaceData(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {

                document.getElementById("search-result-show").textContent= "Nothing found. Try something else!";

                $(document).ready(function() {
                    $('.content').hide();
                });
            }
        });

    }//end connecttoPHPfile function


    /**
     * Method used to show the link results to recipes on page 2 after a search.
     *
     * Ajax connection to a selected php file. The search query is selected by using the URL search.
     *
     * Method connects to database, runs the selected PHP file, and returns results.
     * @param phplink
     */
    function connecttoPHPfile_AutoQuery_showPage2Results(phplink){
        $.ajax({
            url: phplink + "?query=" + getURLsearchValue("query"),
            dataType: "html",
            type: "GET",
            data: {output: 'html'},
            success: function(data) {
                console.log(data);

                $(document).ready(function() {
                    $('.content').show();
                });

                document.getElementById("search-result-show").textContent= "Search: " + toTitleCase(getURLsearchValue("query"));

                //puts on page
                $("#food-recipes").append(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {

                document.getElementById("search-result-show").textContent= "Nothing found. Try something else!";

                $(document).ready(function() {
                    $('.content').hide();
                });
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
        for (i=0; i<arraysize; ++i) {
            if(variable[i]['category'] === 'food'){
                $('#food-recipes').append(variable[i]['html_link'] + "<br><br>");
            }

            if(variable[i]['category'] === 'beauty'){
                $('#health-recipes').append(variable[i]['html_link'] + "<br><br>");
            }

            if(variable[i]['category'] === 'household'){
                $('#household-recipes').append(variable[i]['html_link'] + "<br><br>");
            }

            if(variable[i]['category'] === 'tip'){
                $('#tips-recipes').append(variable[i]['html_link'] + "<br><br>");
            }
        }
    }//end




    /**
     * IN PROGRESS
     *
     * Called server side in PHP
     * Attempting to change the contents of page 3 to display the contents of a selected recipe dynamically.
     * @param variable
     */
    function usePhpVarToFillRecipeContent(variable){
        $('#title').append(variable['ingredients'] + "<br>");
    }


    /**
     * IN PROGRESS
     *
     * Attemp to do four things:
     *      1. Load page 3
     *      2. Pass link text as query
     *      3. On page 3 call server PHP file to look for recipe with the Recipe_Name the same as the query link name
     *      4. Show the results of the PHP query result
     * @param link - Recipe from the
     */
    function selectRecipeIdOnClick(link) {
        //onclick=window.location.href = './page_3.html?query=' + link.innerHTML; //go to page 3 with the recipe name as query
        //connecttoPHPfile_showRecipeContent("fetch_recipe_byname.php", link.innerHTML); //do this in page 3 on load.
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
