$("form").submit(function(event) {
    
});

$('#btn').click(function () {
    var id = $('#id').val();
    var pw = $('#pw').val();
    
    if (id == "") {
        alert("id를 입력해주세요.");
        return;
    }
    
    if (pw == "") {
        alert("pw를 입력해주세요.");
        return;
    }   

    $.ajax({
        type: "POST", 
        url: "http://api.fpm.local/api/user/login", 
        data: {
            userId: this.id,
            password: this.pw
        },
        success: function (res) {
          console.log(res);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert("통신 실패.");
        },
      });
});