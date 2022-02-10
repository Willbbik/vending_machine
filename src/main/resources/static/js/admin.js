$(function(){

    $("#complete").on("click", function(){
        complete();
    });

    $("#restart").on("click", function(){
        restart();
    });

});

// 정산완료 버튼
function complete(){
    showRecode();
    userRanking();
    updateBestItem();
    updateBestItemPrice();
}

// 재시작 버튼
function restart(){

    let userNames = ["유사원", "이대리", "김과장", "박차장"];
    let itemNames = JSON.parse(sessionStorage.getItem("itemNames"));

    // 만원과 잔돈 추가
    $.each(itemNames, function(index, itemName){
        let item = JSON.parse(sessionStorage.getItem(itemName));
        let changeRecode = item.changeRecode;

        // 현재 상품의 잔돈 기록이 있다면
        if(changeRecode != null) {

            $.each(userNames, function(index, userName){
                let user = JSON.parse(sessionStorage.getItem(userName));
                let change = 0;

                // 잔돈의 주인인지 확인
                $.each(changeRecode, function(index, recode){
                    if(recode.userName === user.name){
                        change += recode.change;
                    }
                });

                // 금액 추가 후 저장
                user.money += 10000 + change;
                sessionStorage.setItem(user.name, JSON.stringify(user));
            });

            // 해당 상품의 잔돈기록 & 잔돈금액 초기화
            delete item.changeRecode;
            item.change = 0;
            sessionStorage.setItem(item.itemName, JSON.stringify(item));
        }
    });
    alert("재시작에 성공하였습니다.");
}


// 자판기 이용 내역
function showRecode(){

    let recodeList = JSON.parse(sessionStorage.getItem("buyRecode"));
    let html = "";

    for(var i = recodeList.length-1; i>=0; i--){

        let index = i + 1;
        let data = "<td>"+ index +"</td>";

        for(key in recodeList[i]){
            data += "<td>"+ recodeList[i][key] +"</td>";
        }
        html += "<tr>"+ data +"</tr>";
    }
    $(".buyRecode").html(html);
}

// 유저 랭킹
function userRanking(){

    let userNames = ["유사원", "이대리", "김과장", "박차장"];
    let userList = new Array();

    $.each(userNames, function(index, userName){
        let user = sessionStorage.getItem(userName);
        userList.push(JSON.parse(user));
    });

    userList.sort((a,b) => {
        if(a.buyCount > b.buyCount) return -1;
        if(a.buyCount < b.buyCount) return 1;
        return 0;
    });

    let html = "";
    $.each(userList, function(index, user){
        let data = "<td>" + (index + 1) + "위</td>";
        data += "<td>" + user.name + "</td>";
        data += "<td>" + user.buyCount + "</td>";
        html += "<tr>" + data + "</tr>";
    });

    $(".userRanking").html(html);
}

// 베스트 상품 선정
function updateBestItem(){

    let itemNames = JSON.parse(sessionStorage.getItem("itemNames"));
    let itemList = new Array();

    $.each(itemNames, function(index, itemName){
        let item = sessionStorage.getItem(itemName);
        itemList.push(JSON.parse(item));
    });

    // 판매횟수순 정렬
    itemList.sort((a,b) => {
        if(a.saleCount > b.saleCount) return -1;
        if(a.saleCount < b.saleCount) return 1;
        return 0;
    });

    // 베스트 상품 선정
    let bestItemName = itemList[0].itemName;
    sessionStorage.setItem("bestItem", bestItemName);

    let html = "<td>" + bestItemName + "</td>";
    $(".bestItem").html(html);
}

// 베스트 상품 가격 상승
function updateBestItemPrice(){

    let bestItemName = sessionStorage.getItem("bestItem");
    let bestItem = JSON.parse(sessionStorage.getItem(bestItemName));

    bestItem.price = bestItem.price + 100;
    sessionStorage.setItem(bestItemName, JSON.stringify(bestItem));
}
