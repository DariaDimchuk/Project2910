
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
     * @param name - keyword to filter for - (optional - defaults to "query")
     * @param url - full URL of the current page (optional - defaults to current window URL)
     * @returns {returns the items searched for from the URL after "?query="}
     */
    function getURLqueryValue(name, url) {
        if (!url) url = window.location.href;
        if(!name) name = "query";

        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/[^A-Za-z0-9]+/g, " "));   //.replace(/\+/g, " ")
    }//end



    /**
	 * When search() is triggered, load window to page 2 and append
	 * "?query=XXX" where XXX is the input being searched.
	 *
	 * Search should be triggered on click of the search button,
     * or when ENTER is hit in the input searchbar.
     */
	function search(){
		onclick=window.location.href = "./page_2.html?query=" + getSearchValue();
	}//end
