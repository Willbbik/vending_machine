$(function(){

    // 상품 등록
    $("#itemSave").on("click", function(){

        let itemName = $("#itemName").val();
        let itemPrice = $("#itemPrice").val();
        let itemQuantity = $("#itemQuantity").val();

        let itemInfo = {
            itemName : itemName,
            price : parseInt(itemPrice),
            quantity : parseInt(itemQuantity),
            saleCount : 0,
            change : 0
        };

        // 상품 목록에 상품 담기
        let itemNames =  JSON.parse(sessionStorage.getItem("itemNames"));
        if(itemNames == null) itemNames = new Array();

        itemNames.push(itemName);
        sessionStorage.setItem("itemNames", JSON.stringify(itemNames));
        sessionStorage.setItem(itemName,  JSON.stringify(itemInfo));

        alert("상품이 등록되었습니다.");
        window.location.href = "/";
    });

});