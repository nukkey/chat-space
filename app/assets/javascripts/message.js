$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="MessageBox">
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
        <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="MessageBox">
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
});