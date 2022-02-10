$(function(){

   showItemInfo();

   // 이용자 선택
   $(".user").on("change", function(){

        let userName = $(this).val();
        if(userName == "없음"){
            $(".money").text(0);
        }else{
            let user = JSON.parse(sessionStorage.getItem(userName));
            $(".money").text(user.money);
        }
   });

   // 상품 수량 변경
   $("#inputQuantity").on("change", function(){

       let itemName = searchParam("itemName");
       let item = JSON.parse(sessionStorage.getItem(itemName));

       let quantity = $(this).val();
       let totalPrice = item.price * quantity;

       $(".totalPrice").text(totalPrice);
   });

   // 잔돈 받기
   $("#takeChange").on("click", function(){

        let userName = $("select[name=user] option:selected").val();
        let itemName = searchParam("itemName");
        let user = JSON.parse(sessionStorage.getItem(userName));
        let item = JSON.parse(sessionStorage.getItem(itemName));

        // 검사
        if(item.change <= 0){
            alert("잔돈이 존재하지 않습니다.");
            return false;
        }
        isUser(userName);

        // 이용자 & 상품 값 변경
        user.money += item.change;
        item.change = 0;
        delete item.changeRecode;

        // 변경 값 저장
        sessionStorage.setItem(userName, JSON.stringify(user));
        sessionStorage.setItem(itemName, JSON.stringify(item));
        alert("잔돈을 받았습니다.");
        location.reload();
   });

   // 상품 구매
   $("#itemBuy").on("click", function(){

       let itemName = searchParam("itemName");
       let item = JSON.parse(sessionStorage.getItem(itemName));

       let totalPrice = $(".totalPrice").text();
       let inputPrice = $("#inputPrice").val();
       let itemQuantity = item.quantity;
       let inputQuantity = $("#inputQuantity").val();
       let userName = $("select[name=user] option:selected").val();

       // 검사
       let result = isValid(userName, inputPrice, totalPrice, inputQuantity, itemQuantity);
       if(result) {
            saveBuyRecode(userName, itemName, inputQuantity);
            saveChangeRecode(userName, itemName, inputPrice, totalPrice);
            itemBuy(userName, itemName, inputPrice, inputQuantity);
       }
  });

});


function isValid(userName, inputPrice, totalPrice, inputQuantity, itemQuantity){

    if(!isUser(userName)) return false;
    else if(!compareQuantity(itemQuantity, inputQuantity)) return false;
    else if(!enoughPrice(userName, inputPrice)) return false;
    else if(!isPrice(inputPrice)) return false;
    else if(!comparePrice(totalPrice, inputPrice)) return false;

    return true;
}

// 상품 구매
function itemBuy(userName, itemName, inputPrice, inputQuantity){

    let user = JSON.parse(sessionStorage.getItem(userName));
    let item = JSON.parse(sessionStorage.getItem(itemName));
    let totalPrice = item.price * inputQuantity;

    // 구매자 값 변경
    user.money -= inputPrice;
    user.buyCount += 1;

    // 상품 값 변경
    item.quantity -= inputQuantity;
    item.saleCount += 1;
    item.change += (inputPrice - totalPrice);

    // 변경 값 저장
    sessionStorage.setItem(userName, JSON.stringify(user));
    sessionStorage.setItem(itemName, JSON.stringify(item));
    alert("상품을 구매하였습니다.");
    location.reload();
}

// 구매 기록
function saveBuyRecode(userName, itemName, inputQuantity){

    let recode = JSON.parse(sessionStorage.getItem("buyRecode"));
    if(recode == null) recode = new Array();

    let data = {
        userName : userName,
        itemName : itemName,
        quantity : inputQuantity
    };
    recode.push(data);

    sessionStorage.setItem("buyRecode", JSON.stringify(recode));
}

// 잔돈 기록
function saveChangeRecode(userName, itemName, inputPrice, totalPrice){

    let item = JSON.parse(sessionStorage.getItem(itemName));

    let change = inputPrice - totalPrice;
    let changeRecode = item.changeRecode;

    if(change <= 0) return false;
    if(changeRecode == null) changeRecode = new Array();

    let itemInfo = {
        userName : userName,
        change : change
    };
    changeRecode.push(itemInfo);

    item.changeRecode = changeRecode;
    sessionStorage.setItem(itemName, JSON.stringify(item));
}


// 이용자 검사
function isUser(userName){

    let isTrue = true;
    if(userName === "없음"){
        alert("이용자를 선택해주세요.");
        isTrue = false;
    }
    return Boolean(isTrue);
}

// 가지고 있는 금액이 충분한지
function enoughPrice(userName, inputPrice){

   let isTrue = true;
   let user = JSON.parse(sessionStorage.getItem(userName));

   if(isNull(inputPrice)){
       alert("금액을 입력해주세요.");
       isTrue = false;
   }

   if(user.money < inputPrice){
       alert("가지고있는 금액이 부족합니다.");
       isTrue = false;
   }
   return Boolean(isTrue);
}


// 천단위인지 확인
function isPrice(inputPrice){

    let isTrue = true;
    if(isNull(inputPrice)){
        alert("금액을 입력해주세요.");
        isTrue = false;
    }

    if(inputPrice % 1000 != 0){
        alert("금액은 천단위만 입력 가능합니다.");
        isTrue = false;
    }
    return Boolean(isTrue);
}

// 입력 금액 충분한지 확인
function comparePrice(totalPrice, inputPrice){

    let isTrue = true;
    if(isNull(inputPrice)){
        alert("금액을 입력해주세요.");
        isTrue = false;
    }

    if(parseInt(totalPrice) > inputPrice){
        alert("금액이 부족합니다. 돈을 더 투입해주세요.");
        isTrue = false;
    }
    return Boolean(isTrue);
}

// 상품 수량 확인
function compareQuantity(itemQuantity, inputQuantity){

    let isTrue = true;
    if(isNull(inputQuantity)){
        alert("상품 수량을 입력해주세요.");
        isTrue = false;
    }

    if(itemQuantity < inputQuantity){
        alert("상품 수량이 부족합니다.");
        isTrue = false;
    }
    return Boolean(isTrue);
}

function searchParam(key){
    return new URLSearchParams(location.search).get(key);
}

function isNull(obj){
    return (obj === "" || obj == null);
}

function showItemInfo(){

    let itemName = searchParam("itemName");
    let item = JSON.parse(sessionStorage.getItem(itemName));

    $(".itemName").text(item.itemName);
    $(".price").text(item.price);
    $(".change").text(item.change);
    $(".quantity").text(item.quantity);
    if(item.quantity < 1){
        $(".itemBuy").html("SOLDOUT");
    }
}