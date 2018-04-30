/*	SEARCH FUNCTIONALITY	*/


/*	Store search value in variable	*/


function getURLsearchValue(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function getSearchValue() {
	var searchInput = document.getElementById("searchbar").value;
	
	return searchInput;
}


/*	Trigger search when enter is hit	*/

	//must be made onload - otherwise "searchbar" returns null value
	window.onload=function(){
		//get value that is being searched
		var input = document.getElementById("searchbar");
		
		//if ENTER is hit on input field, the button is clicked
		input.addEventListener("keyup", function(event){
			event.preventDefault();
			if(event.keyCode === 13){
				document.getElementById("search-button").click();
			}
		});
	}
	
	
	
/*	Search button functionality	*/

	//load search results website on button click
	function search(){
		
		//onclick=window.location.href = './page_2.html';
		onclick=window.location.href = './page_2.html?query=' + getSearchValue();;
	}
	
