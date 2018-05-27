

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
        connecttoPHPfile_GetRecipe(recipeById_PHP);	//must be called from onload, otherwise null error occurs
        triggerSearchOnEnter(); //must be called in window.onload to avoid null
    }//end method





/*  SERVER CONNECTION FUNCTIONS    */



    /**
     * Method used to show the link results to recipes on page 2 after a search.
     *
     * Ajax connection to a selected php file. The search query is selected by using the URL search.
     *
     * Method connects to database, runs the selected PHP file, and returns results.
     * @param phplink - name of php file that searches DB for recipe that matches the recipe id (displayed in page URL)
     */
    function connecttoPHPfile_GetRecipe(phplink){
        $.ajax({
            url: phplink + querystartURLKeyword + getURLqueryValue(),
            dataType: "html",
            type: "GET",
            data: {output: 'html'},
            success: function(data) {
                console.log(data);

                $(document).ready(function() {
                    $('.content').show();
                });

                //displays results on page
                fillRecipePage(JSON.parse(data));
            },
            error: function(jqXHR, textStatus, errorThrown) {

                $(document).ready(function() {
                    $('.content').hide();
                });
            }
        });
    }//end method


    /**
     * Uses JSON decoded recipe object from the PHP file to fill up recipe html page.
     *
     * @param recipeObject - results from the php file searching for a recipe by id
     */
    function fillRecipePage(recipeObject){

        if(recipeObject === null || recipeObject === "" || recipeObject === " " ){
            $('#recipe_name').append("Sorry, recipe not found!");
            $('hr').hide();
            $('.recipe').hide();

        }else{
            loadStarRatingWidget();

            $('.recipe').show();

            $('#recipe_name').append(recipeObject['name'] + "<br><hr>");
            $('#prep_time').append("Prep Time: " + recipeObject['prep_time']);
            $('#cook_time').append("Cook Time: " + recipeObject['cook_time'] + "<br>");


            var ingredientsArray = recipeObject['ingredients'].split(/\n/);
            for(i = 0; i < ingredientsArray.length; i++){
                $('#ingredients').append(ingredientsArray[i] + "<br><br>");
            }//end loop


            var directionsArray = recipeObject['directions'].split(/\n/);
            for(i = 0; i < directionsArray.length; i++){
                $('#directions').append(directionsArray[i] + "<br><br>");
            }//end loop

        }//end else

    }//end method



/*   WIDGET METHODS   */


    /**
     * Load the star ratings to the recipe page.
     */
    function loadStarRatingWidget(){
        $("#widget").append("<div class='wpac-rating' data-wpac-chan='test'></div>");

        var string = getURLqueryValue();
        $(".wpac-rating").attr('data-wpac-chan', string);


        wpac_init = window.wpac_init || [];
        wpac_init.push({widget: 'Rating', id: 11452});
        (function() {
            if ('WIDGETPACK_LOADED' in window) return;
            WIDGETPACK_LOADED = true;
            var mc = document.createElement('script');
            mc.type = 'text/javascript';
            mc.async = true;
            mc.src = 'https://embed.widgetpack.com/widget.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mc, s.nextSibling);

        })();

    }//end method
