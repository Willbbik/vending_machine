$(function(){
    showItems();
});

function showItems(){

    let itemNames = JSON.parse(sessionStorage.getItem("itemNames"));

    $.each(itemNames, function(index, itemName){

        let item = sessionStorage.getItem(itemName);

        let html = "<tr><td>";
        html += "<button><a href='/itemDetails?itemName="+itemName+"'>"+itemName+"</a></button>";
        html += "</td></tr>";
        $(".items").append(html);
    });
}
