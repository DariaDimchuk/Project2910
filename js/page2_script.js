/*	BUTTONS FUNCTIONALITY	*/
	
	
	/*	Food Skincare and Tips buttons functionality - when clicked reveal
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
	
	
	/*	SEARCH FUNCTIONALITY	*/
	
	
	
	/*	Store search value in variable	*/
	
	
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
			
			
			document.getElementById("food-result-1").textContent=toTitleCase(getURLsearchValue("query")) + " Bread";	
		
			document.getElementById("health-result-1").textContent=toTitleCase(getURLsearchValue("query")) + " Face Mask";	
			
			
			document.getElementById("health-result-2").textContent=toTitleCase(getURLsearchValue("query")) + " Butter";	
			
			document.getElementById("tips-result-1").textContent="How to keep your " + toLowerCase(getURLsearchValue("query")) + " fresh";
		}
		
		
	
	
	/*	DYNAMIC SEARCH	*/
	
	
	/*	Change results to search input	*/
	
	
	
	function toTitleCase(str)
	{
		if(str === null){
			return "";
		}else{
			return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
		
	}
	
	
	function toLowerCase(str)
	{
		return str.replace(/\w\S*/g, function(txt){return txt.substr(0).toLowerCase();});
	}