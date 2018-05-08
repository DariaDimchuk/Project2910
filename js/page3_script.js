/**
 * Runs when the page is loaded.
 *
 * Important: all common code between scripts and pages must be repeated again in window.onload - otherwise another
 * script page will overwrite the needed code.
 *
 * So, don't combine common code in window.onload between pages into one script file and hope it'll all get called.
 */
window.onload=function(){

    connecttoPHPfile_GetRecipe();	//must be called from onload, otherwise null error occurs
    triggerSearchOnEnter(); //must be called in window.onload to avoid null

}//end window.onload



/**
 * Method used to show the link results to recipes on page 2 after a search.
 *
 * Ajax connection to a selected php file. The search query is selected by using the URL search.
 *
 * Method connects to database, runs the selected PHP file, and returns results.
 * @param phplink
 */
function connecttoPHPfile_GetRecipe(){
    $.ajax({
        url: "get_recipe.php?query=" + getURLsearchValue("query"),
        dataType: "html",
        type: "GET",
        data: {output: 'html'},
        success: function(data) {
            console.log(data);

            $(document).ready(function() {
                $('.content').show();
            });

            //puts on page
            $(".content").append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {

            $(document).ready(function() {
                $('.content').hide();
            });
        }
    });
}//end connecttoPHPfile function


/**
 * Uses returned recipe object from the PHP file to fill up recipe html page
 *
 * @param recipeObject - results from the php file searching for a recipe by id
 */
function usePhpVarToFillRecipePage(recipeObject){

    if(recipeObject === null || recipeObject === "" || recipeObject === " " ){
        $('#recipe_name').append("Sorry, recipe not found!");
        $('hr').hide();
        $('.recipe').hide();

    }else{
        $('.recipe').show();

        $('#recipe_name').append(recipeObject['name'] + "<br><hr>");
        $('#prep_time').append("Prep Time: " + recipeObject['prep_time']);
        $('#cook_time').append("Cook Time: " + recipeObject['cook_time'] + "<br>");


        var ingredientsArray = recipeObject['ingredients'].split(/\n/);
        for(i = 0; i < ingredientsArray.length; i++){
            $('#ingredients').append(ingredientsArray[i] + "<br>");
        }


        var directionsArray = recipeObject['directions'].split(/\n/);
        for(i = 0; i < directionsArray.length; i++){
            $('#directions').append(directionsArray[i] + "<br><br>");
        }
    }

}//end



