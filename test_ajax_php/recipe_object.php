<?php 
	
	$query = $_REQUEST["query"];
	
    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "On $methodType");



    // attach the transaction to the data
   // $data['transaction'] = $transaction;

    //echo $methodType;
    //var_dump($transaction);

    $methodType = $_SERVER['REQUEST_METHOD'];


    $servername = "localhost";
    $dblogin = "jasonngu_admin";
    $password = "bananabreadrecipe";
    $dbname = "jasonngu_app";
	

    $data = array("msg" => "Nothing");

    if ($methodType === 'GET') {
        if(isset($_GET['output'])) {
            $output = $_GET['output'];

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);

            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "SELECT * FROM Recipe WHERE Recipe_Name LIKE '%$query%' OR Recipe_Ingredients LIKE '%$query%';";
			

            $statement = $conn->prepare($sql);
            $statement->execute();
                        

        } catch(PDOException $e) {
            $data = array("error", $e->getMessage());
        }
    }
            switch($output) {
                case "json":
                    $data['status'] = 'success';
                    $data['msg'] = 'Retrieving data as JSON';
                    
                    
                    $data = array("status" => "success", "customer" => $statement->fetchAll(PDO::FETCH_ASSOC), "address" =>$statement2->fetchAll(PDO::FETCH_ASSOC)); 
                    
                    echo json_encode($data, JSON_FORCE_OBJECT);
                    

                    break;
                case "html":
					
					
					$resultsArray = array();
					
					
					
                    // each of is an object of type stdClass
                    while ($row = $statement->fetchObject()) {
                    
						$recipe = 						new stdClass;
						$recipe->id = 					utf8_encode($row->Recipe_ID);
						$recipe->category = 			utf8_encode($row->Recipe_Category);
						$recipe->name = 				utf8_encode($row->Recipe_Name);
						$recipe->html_link = 			"<a href='./page_3.html?query=" . utf8_encode($row->Recipe_ID) . "' class='db_recipe_link' id='" . utf8_encode($row->Recipe_ID) . "'>" . utf8_encode($row->Recipe_Name) . "</a>";
						
						$recipe->prep_time = 			utf8_encode($row->Recipe_Prep_Time);
						$recipe->cook_time = 			utf8_encode($row->Recipe_Cook_Time);
						$recipe->num_of_ingredients = 	utf8_encode($row->Recipe_Num_Ingredients);
						$recipe->ingredients = 			utf8_encode($row->Recipe_Ingredients);
						$recipe->directions = 			utf8_encode($row->Recipe_Directions);
						
						array_push($resultsArray, $recipe);
						
                    }
					
                    break;
            }

        } else {
            echo "Need a type of output!";
        }
		
		
		echo '<script>';
			echo 'var db_recipe_array = ' . json_encode($resultsArray) . ';';
			echo 'var arraysize = ' . json_encode(sizeof($resultsArray)) .';';
			echo 'usePhpVarToFillResultContent(arraysize, db_recipe_array);';
		echo '</script>';

?>



