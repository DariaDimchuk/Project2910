/*	RESULTS BUTTONS FUNCTIONALITY	*/
	
	/*	Food + Skincare + Tips buttons functionality - when clicked reveal
		content, when clicked again - hide that content		*/

	$(document).ready(function(){
		$("#food-button").click(function(){
			$("#food-recipes").toggle('450', "swing", function(){
				//Animation done.
			});
		});
	});
	
	
	$(document).ready(function(){
		$("#health-button").click(function(){
			$("#health-recipes").toggle('450', "swing", function(){
				//Animation done.
			});
		});
	});
	
	
	$(document).ready(function(){
		$("#tips-button").click(function(){
			$("#tips-recipes").toggle('450', "swing", function(){
				//Animation done.
			});
		});
	});


	
/*	WINDOW ONLOAD FUNCTIONALITY	*/
	
	window.onload=function(){
		
		/*		
		*
		Trigger search when enter is hit	
			- must be made onload - otherwise "searchbar" returns null value
		*
		*/
		
		//get value that is being searched
		var input = document.getElementById("searchbar");
		
		//Enter triggers button click which triggers search()
		input.addEventListener("keyup", function(event){
			event.preventDefault();
			if(event.keyCode === 13){
				document.getElementById("search-button").click();
			}
		});
		
		/*
			Result not found functionality
			
				hides content and 
			
			
			* * * * * * * * * * * * * * * * * * * * * * * * 
			
				CHANGE HERE WHEN DB AVAILABLE
				
				
				query === banana
				
				Here implement database check to see if query matches ANY database recipes/keywords
			
			* * * * * * * * * * * * * * * * * * * * * * * * 
		*/
		
		if(toLowerCase(getURLsearchValue("query")) === "banana" 
		   || toLowerCase(getURLsearchValue("query")) === "apple" 
		   || toLowerCase(getURLsearchValue("query")) === "orange"){
			
			$(document).ready(function() {
				$('.content').show();
			});
			
			
			document.getElementById("search-result-show").textContent= "Search: " + toTitleCase(getURLsearchValue("query"));
			
			
			/*
			Dynamic Search - on load replaces results with query content
			*/
			
			document.getElementById("food-result-1").textContent=toTitleCase(getURLsearchValue("query")) + " Bread";	
		
			document.getElementById("health-result-1").textContent=toTitleCase(getURLsearchValue("query")) + " Face Mask";	
			
			
			document.getElementById("health-result-2").textContent=toTitleCase(getURLsearchValue("query")) + " Butter";	
			
			document.getElementById("tips-result-1").textContent="How to keep your " + toLowerCase(getURLsearchValue("query")) + " fresh";
		}
		else{
			document.getElementById("search-result-show").textContent= "Nothing found. Try something else!";
			
			document.getElementsByClassName("content");
			
			
			$(document).ready(function() {
				$('.content').hide();
			});
		}
		
		
	
	}//end window.onload
	
	

/*	Formatting Tools	*/

//Return string with first leter capitalized
function toTitleCase(str)
{
	if(str === null){
		return "";
	}else{
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
}

//Return whole string in lower case
function toLowerCase(str)
{
	return str.replace(/\w\S*/g, function(txt){return txt.substr(0).toLowerCase();});
}
