
/*	WINDOW ONLOAD FUNCTIONALITY		*/


    /**
	 * Runs when the page is loaded.
	 *
	 * Important: all common code between scripts and pages must be repeated again in window.onload - otherwise another
	 * script page will overwrite the needed code.
	 *
	 * So, don't combine common code in window.onload between pages into one script file and hope it'll all get called.
     */
	window.onload=function(){

		triggerSearchOnEnter();	//must be called from onload, otherwise null error occurs

	}//end window.onload



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


        //Trigger
        input.addEventListener("keyup", function(event){
            event.preventDefault();
            $('#search-suggestions').show();

        });
    }//end



    /**
     * Returns whatever the value is in the input searchbar currently.
     * @returns {string - searchbar value}
     */
    function getSearchValue() {
        var searchInput = document.getElementById("searchbar").value;

        return searchInput;
    }//end


    /**
     * Regex method that takes the current URL, and
     * @param name - keyword to filter for - should be "query"
     * @param url - full URL of the current page
     * @returns {returns the items searched for from the URL}
     */
    function getURLsearchValue(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }//end



    /**
	 * When search() is triggered, load window to page 2 and append
	 * "?query=XXX" where XXX is the input being searched.
	 *
	 * Search should be triggered on click of the search button, or when ENTER is hit in the input searchbar.
     */
	function search(){
		onclick=window.location.href = './page_2.html?query=' + getSearchValue();
	}//end




    /**
	 * When selectSearchItem(link) is triggered, load window to page 2 and append
	 * "?query=link" where link is the text of the clicked link.
     *
	 * This method used by the drop down auto complete menu to allow clicking on the item and searching immediately.
	 *
	 * @param link - clicked link - this method uses its inner text
     */
	function selectSearchItem(link){
		onclick=window.location.href = './page_2.html?query=' + link.innerHTML;
	}//end





    /**
     * This method creates an auto complete functionality for the drop down search menu list in the search bar.
     *
     * When the user types in a letter, the method checks what resuls have that letter, and filters out the ones that don't.
     */
    function autocompleteMenuList() {

        if(getSearchValue() === null || getSearchValue() == ""){
            //do nothing
        }else{
            var input, filter, ul, li, a, i;
            input = document.getElementById('searchbar');
            filter = input.value.toUpperCase();
            ul = document.getElementById("search-suggestions");
            li = ul.getElementsByTagName('li');

            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }//end for loop
        }//end else
    }//end



	/**
	 * JQuery method for showing the drop down search menu when the user starts typing.
	 */
	$(document).on('keyup', function(e) {
		if (e.target.id === 'searchbar') {
			if(e.target.value !== ""){
				$('#search-suggestions').show();
			}else{
				$('#search-suggestions').hide();
			}
		}
	});//end


	/**
	 * JQuery method for hiding the drop down search menu when the user clicks away
	 */
	$(document).on('click', function(e) {
		if (e.target.id !== 'searchbar') {
			$('#search-suggestions').hide();
		}
	});//end
