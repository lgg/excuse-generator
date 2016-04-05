document.addEventListener('DOMContentLoaded', function () {
    var result = get("result"),
        name = get("name"),
        go = get("go");

    //Generate button
    go.addEventListener("click", function(){
        generate();
    });

    //On enter press
    name.addEventListener("keypress", function(event){
        if (event.which == 13 || event.keyCode == 13) {
            generate();
        }
    });

    //Generator function
    function generate(){
        result.textContent = Generator.generate(name.value);
    }
});

//I'm too lazy
function get(id){
    return document.getElementById(id);
}