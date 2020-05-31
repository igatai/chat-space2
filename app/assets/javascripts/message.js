$(function(){
  function buildHTML(message){
    if(message.image){
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img src=${message.image} class="lower-message__image">
                    </div>
                  </div>`
      return html
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html
    }
  }

  $("#new_message").on("submit",function(e){
    e.preventDefault();
    // フォームに入力された値を取得する
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('#message_content').val('');
      $('.chat-main__message-form__submit').prop('disabled', false);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました')
      $('#message_content').val('');
      $('.chat-main__message-form__submit').prop('disabled', false);
    })
  })

  var reloadMessages = function(){
    // カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージの」IDを取得する。
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      // ルーティング設定に従い、/groups/:group_id 配下に/api/messages を設定
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      // データオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        // 追加するHTMLを格納する変数
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        // メッセージが入ったHTMLにinsertHTMLを追加
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight });
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  // url[/groups/xx/messages]に一致するページのみ実行する
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});