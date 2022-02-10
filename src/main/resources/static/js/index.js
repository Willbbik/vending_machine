$(function(){

    // 이용자 초기화
    $("#userReset").on("click", function(){

        let userList = ["유사원", "이대리", "김과장", "박차장"];

        let userInfo = {
            money : 10000,
            buyCount : 0
        };

        $.each(userList, function(index, user){
            userInfo.name = user;
            sessionStorage.setItem(user, JSON.stringify(userInfo));
        });
        alert("이용자가 초기화 되었습니다.");
    });

});