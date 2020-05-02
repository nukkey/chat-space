$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="NameBox">
          ${message.user_name}
          <div class="DateBox">
            ${message.created_at}
          </div>
        </div>
        <div class="InputText">
          <p class="InputText__content">
            ${message.content}
          </p>
         <img src=${message.image} >
        </div>
       </div>`
     return html;
   } else {
     var html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="NameBox">
          ${message.user_name}
          <div class="DateBox">
            ${message.created_at}
          </div>
        </div>
        <div class="InputText">
          <p class="InputText__content">
            ${message.content}
          </p>
        </div>
       </div>`
     return html;
   };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
  
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.ChatMain__message').append(html);
      $('form')[0].reset();
      $('.ChatMain__message').animate({ scrollTop: $('.ChatMain__message')[0].scrollHeight});
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
    return false;
  })
  var reloadMessages = function() {
    var last_message_id = $('.MessageBox:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
     if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.ChatMain__message').append(insertHTML);
      $('.ChatMain__message').animate({ scrollTop: $('.ChatMain__message')[0].scrollHeight} );
     }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});