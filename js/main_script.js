
	$(document).on('keyup', function(e) {
		if (e.target.id === 'searchbar') {
			if(e.target.value !== ""){
				$('#search-suggestions').show();
			}else{
				$('#search-suggestions').hide();
			}			
		}
	});

	$(document).on('click', function(e) {
		if (e.target.id !== 'searchbar') {
			$('#search-suggestions').hide();
		}
	});


/*	Search auto-complete menu Functionality	*/
	
	
function autocompleteMenuList() {
	
	if(getSearchValue() === null || getSearchValue() == ""){
		
	}else{
		// Declare variables
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
		}
		
	}
	
}
	




/*	SEARCH FUNCTIONALITY	*/


	/*	Store the search input in a variable 	*/
	function getSearchValue() {
		var searchInput = document.getElementById("searchbar").value;
		
		return searchInput;
	}

	/*	Get the search result from the URL	*/
	function getURLsearchValue(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}


/*	WINDOW ONLOAD FUNCTIONALITY		*/


	window.onload=function(){
		
		/*		
		*
		Trigger search when enter is hit	
			- must be made onload - otherwise "searchbar" returns null value
		*
		*/
		
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
		
	}//end window.onload
	
	

	/*	Search button functionality	*/

	//load search results website on button click
	function search(){
		onclick=window.location.href = './page_2.html?query=' + getSearchValue();
	}
	
	
	function selectSearchItem(link){
		//onclick= document.getElementById("searchbar").value= link.innerHTML;
		//search();	//remove search, uncomment, continue to add multi item search functionality
		
		onclick=window.location.href = './page_2.html?query=' + link.innerHTML;
	}
	
	
