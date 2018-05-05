



function selectRecipe(link){
    //onclick=window.location.href = './page_2.html?query=' + link.text;

    var query= link.text;


    onclick=$.ajax({
        url: "db_fetch_script.php?query=" + query,
        dataType: "html",
        type: "GET",
        data: {output: 'html'},
        success: function(data) {
            console.log(data);


            window.location.href = './page_3.html';
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


}