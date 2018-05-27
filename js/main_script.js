/*      GLOBAL VARIABLES     */


    /* Common Strings */
    /**
     * String signifies the start of search terms in the URL.
     * Append to URL, and follow with search terms.
     *
     * @type {string}
     */
    window.querystartURLKeyword = "?query=";


    /* URLS */

    /**
     * URL of website's page 2. Page 2 shows search results.
     *
     * @type {string}
     */
    window.page2_URL = "./page_2.html";


    /**
     * URL of website's page 3. Page 3 shows recipe.
     *
     * @type {string}
     */
    window.page3_URL = "./page_3.html";


    /* PHP file links */

    /**
     * PHP file. Returns array of search results for recipes
     *
     * @type {string}
     */
    window.recipeSearchResults_PHP = "./php/get_recipe_results.php";


    /**
     * PHP file. Returns specific recipe
     *
     * @type {string}
     */
    window.recipeById_PHP = "./php/get_recipe_by_id.php";



/*	WINDOW ONLOAD FUNCTIONALITY		*/


    /**
	 * Runs when the page is loaded.
	 *
	 * Important: all common code between scripts and pages must be repeated again in
     * each JS file's window.onload - otherwise another script page will overwrite the needed code.
	 *
     */
	window.onload=function(){
		triggerSearchOnEnter();	//must be called from onload, otherwise null error occurs
	};



/*	Search button functionality	*/

    /**
     * Function triggers the search button when ENTER is hit in the input search bar.
     */
    function triggerSearchOnEnter(){
        //get value that is being searched
        var input = document.getElementById("searchbar");

        //if ENTER is hit on input field, the button is clicked
        input.addEventListener("keyup", function(event){
            event.preventDefault();
            if(event.keyCode === 13){
                document.getElementById("search-button").click();
            }
        });
    }//end



    /**
     * Returns whatever the value is in the input searchbar currently.
     * @returns {string - searchbar value}
     */
    function getSearchValue() {
        return document.getElementById("searchbar").value;
    }//end


    /**
     * Regex method that takes the current URL, and returns whatever is appended after
     * "?query=". Search results from the previous page can be accessed this way.
     *
     * @param searchKeyword - keyword after which to filter for - (optional - defaults to "?query=")
     * @param url - full URL of a webpage (optional - defaults to current window URL)
     * @returns {returns the items searched for from the URL after "?query="}
     */
    function getURLqueryValue(searchKeyword, url) {
        if (!url) url = window.location.href;   //defaults if param not included
        if(!searchKeyword) searchKeyword = querystartURLKeyword;  //defaults if param not included

        //selects all after the search keyword in the url + coverts %20 to spaces, removes consecutive spaces
        var searchString = url.substring(url.indexOf(searchKeyword) + searchKeyword.length).replace(/%20/g, " ").replace(/[!@#\$%\^\&*\)\(+=._-]/g, " ");

        //replaces any non alphanumeric and non whitespace characters with spaces, trims
        searchString = searchString.replace(/^[^\w\-\s]+$/, " ").replace(/\s+/g, " ").trim();

        return decodeURIComponent(searchString);

    }//end



    /**
	 * When search() is triggered, load window to page 2 and append
	 * "?query=XXX" where XXX is the input being searched.
	 *
	 * Search should be triggered on click of the search button,
     * or when ENTER is hit in the input searchbar.
     */
	function search(){
		onclick=window.location.href = page2_URL + querystartURLKeyword + getSearchValue();
	}//end
