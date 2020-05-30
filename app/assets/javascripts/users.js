$(function(){
  function appendUser(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `
    $("#user-search-result").append(html)
  }

  function appendMember(member_name, member_id){
    var html = `
                <div class="chat-group-user">
                  <input name='group[user_ids][]', type='hidden', value='${member_id}', >
                  <p class="chat-group-user__name">${member_name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
                </div>
                `
    $("#chat-group-users.js-add-user").append(html)
  }

  function addErrMsgToHTML(msg){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__message">${msg}</p>
                </div>
                `
    $("#user-search-result").append(html)
  }

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url:  '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 ){
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0 ){
        return false;
      } else {
        addErrMsgToHTML("一致するユーザがいません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function(){
    const user_id = $(this).attr("data-user-id");
    const user_name = $(this).attr("data-user-name");
    $(this).parent().remove();
    appendMember(user_name,user_id)
  })

  $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  })

});