

$(window).load(function() {

  var scroll_slides = $('.slide').length;
  var cur_slide = 0;
  var cur_slide_name = " ";
  var screen_width = $(document).width();
  var fix_class = 'fixed';
  var header_color='#f44336';
  var darker_color='#d32f2f'
  // var rgba_string=hexToRgb(color);
  var slide_titles = [];
  var center_numbers = [];
  update_slide();
  document.onkeydown = checkKey;
  $( ".slide" ).each(function( index ) {
    center=(index+1);
    $(this).attr("id","slide-"+(index+1))
    if($(this).find(".center-slide").length>0){
      center_numbers.push(center);
      slide_titles.push($(this).find(".center-slide").text().trim());
    }
  });
  
  for(var i=0;i<slide_titles.length;i++){
    $("<div class='hovers'>"+slide_titles[i]+"</div>").appendTo( ".fixed-hovers" );
  }

  $(".hovers").css("backgroundColor",header_color);

  var waypoints = $('.top-bar').waypoint({
    handler: function(direction) {
      if(direction==='down'){
        $('.top-bar').addClass(fix_class);
        $('.top-bar').animate({ backgroundColor: header_color, color: '#fafafa' }, 300);
        $('.top-bar').css("box-shadow","0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)");
        $('#slide-nav').animate({ opacity:'1' }, 300);

      }
      if(direction==='up'){
        $('.top-bar').removeClass(fix_class);
        $('.top-bar').animate({ backgroundColor: '#fff', color: '#000' }, 200);
        $('.top-bar').css("box-shadow","none");
        $('#slide-nav').animate({ opacity:'0' }, 200);
      }
    }
  });

  $('.fixed-hovers').find('div').show().hide();

  $(".fixed-box , .fixed-hovers").hover(
    function() {
      $('.fixed-hovers').css('border-top', 'solid 1px #d32f2f');
      $('.fixed-hovers').children('div').each(function(index){
        if(cur_slide_name!==" "){
          if(cur_slide_name.trim()===$(this).context.innerText){
            $(this).css("border-left","solid 4px #d32f2f");
            $(this).css("padding-right","11px");
          }
          else{
            $(this).css("border-left","none");
            $(this).css("padding-right","15px");
          }
        }
        $(this).stop().fadeIn(50*index);
      });

    }, function() {

      $('.fixed-hovers').children('div').stop().fadeOut('fast');
      $('.fixed-hovers').css('border-top', 'solid 1px transparent');
    }
    );
  $('.hovers').hover(function(){
    $(this).css('backgroundColor',darker_color);
  },function(){
    $(this).css('backgroundColor',header_color);
  });

  $('img').smoothZoom({
    'navigationButtons':false
  });

  open=false;
  $(document.body).on("click", ".zoom, .sz-zoomed, .sz-close", function(event) {
    if(!open){
      $('.top-bar').animate({ backgroundColor: '#fff'}, 200,function(){
        $('.top-bar').css("z-index",0);
        $('.top-bar').css("box-shadow","none");
        open=true;
        $('.sz-overlay').css('backgroundColor','rgba(0,0,0,.3)');
      });
      
    }
    else{
      $('.top-bar').css("z-index",1);
      $('.top-bar').css("box-shadow","0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)");
      $('.top-bar').animate({ backgroundColor: header_color}, 400,function(){
        open=false;
      });
    }
    event.preventDefault();
  });

  var waypoints = $('.slide').waypoint({
    handler: function(direction) {
      if(direction==='down'){
        cur_slide=parseInt($(this)[0].element.id.split('-')[1]);

        
        if($(this).has('div.center-slide').length){
          $('.fixed-text').fadeOut(300,function(){
            cur_slide_name=$('#slide-'+cur_slide).find('div.center-slide').text();
          });
        }
        if($('#slide-'+cur_slide).css('background-color')==='rgb(255, 255, 255)'){


          if($('#slide-'+cur_slide).has('div.center-slide').length){
            $('#slide-'+cur_slide).animate({
              opacity:1,
              backgroundColor: '#211F30',color:'#fff'
            },400);
          }
          else{
            $('#slide-'+cur_slide).animate({
              opacity:1
            },400);
          }
        }

        update_slide();
      }
    },
    offset: '50%',
  });
  var waypoints = $('.slide').waypoint({
    handler: function(direction) {
      if(direction==='up'){
        cur_slide=parseInt($(this)[0].element.id.split('-')[1]);
        update_slide();
      }
    },
    offset: '-50%'
  });



  $("#header-bottom").click(function(){
    $('html,body').animate({
      scrollTop: $("#slide-"+(1)).offset().top-89
    },'slow');
  });

  var waypoints = $('#header-bottom').waypoint({
    handler: function(direction) {
      if(direction==='up'){
        cur_slide=0;
        $('#header-bottom').fadeIn(200);

      }
      else{
       $('#header-bottom').fadeOut(300);

     }
   },
   offset: '70%'
 });


  
  $("#up-nav").click(function(){
    scrollup();
  });
  $("#down-nav").click(function(){
    scrolldown();
  });

  function update_slide(){

    if(cur_slide>0){

      if($('#slide-'+cur_slide).has('div.center-slide').length&&cur_slide_name!=$('#slide-'+cur_slide).find('div.center-slide').text()){
        if(cur_slide_name!=' '){


          cur_slide_name=$('#slide-'+cur_slide).find('div.center-slide').text();
          $('.fixed-hovers').children('div').each(function(index){
            if(cur_slide_name.trim()===$(this).context.innerText){
              $(this).css("border-left","solid 4px #d32f2f");
              $(this).css("padding-right","11px");
            }
            else{
              $(this).css("border-left","none");
              $(this).css("padding-right","15px");
            }
          });
          $('.fixed-text').fadeOut(300,function(){
           $('.fixed-text').text(cur_slide_name);
           $('.fixed-text').fadeIn(300);
         });
        }
        else{
         cur_slide_name=$('#slide-'+cur_slide).find('div.center-slide').text();
         $('.fixed-text').text(cur_slide_name);
         $('.fixed-text').fadeIn(300);
       }
       
     }
     else{

      $('.fixed-text').text(cur_slide_name);
    }
  }
  $("#disp-nav").text(cur_slide+"/"+scroll_slides);
  if(cur_slide===1){
    $('#up-nav').css("background-color", "rgba(33, 33, 33, .25)");
  }
  else if(cur_slide===scroll_slides){
    $('#down-nav').css("background-color", "rgba(33, 33, 33, .25)");
  }
  else{
    $('#up-nav').css("background-color", "rgba(33, 33, 33, .35)");
    $('#down-nav').css("background-color", "rgba(33, 33, 33, .35)");
  }
}

$('#disp-nav').click(function(){
  $(this).html('');
  ($('<input></input>')
    .attr({
      'type': 'text',
      'name': 'fname',
      'id': 'slide_number',
      'size': '30',
      'placeholder': cur_slide
    }).css("width","32px"))
  .appendTo('#disp-nav');
  $('#slide_number').focus();
});

$(".fixed-hovers").on("click","div",function(e){
  for(var i=0;i<center_numbers.length;i++){

    if(slide_titles[i]===$(this).context.innerText){

      if(center_numbers[i]>cur_slide){
        cur_slide=center_numbers[i]-1;
        scrolldown();
      }
      else if(center_numbers[i]<cur_slide){

        cur_slide=center_numbers[i]+1;
        scrollup();
      }
    }
  }
});

$("#disp-nav").on('blur keyup', 'input',function(e) {  
  var set_value=false;
  if (e.type == 'focusout' || e.keyCode == '13') {
    var name = $(this).val();
    if(name!==''){
      if(isInt(Number(name))){
        name=Number(name);
        if(name<=scroll_slides&&name>0){
          if(name>cur_slide){
            cur_slide=name-1;
            scrolldown();
            set_value=true;
          }
          else if(name<cur_slide){
            cur_slide=name+1;
            scrollup();
            set_value=true;
          }
        }
      }
    }
    if(!set_value){
      update_slide();
    }
    $("#slide_number").remove();
  }
});  



function checkKey(e) {

  e = e || window.event;

  if (e.keyCode == '37') {
   scrollup();
 }
 else if (e.keyCode == '39') {
   scrolldown();
 }

}

function scrollup(){
  if(cur_slide>1){
    $('html,body').animate({
      scrollTop: $("#slide-"+(cur_slide-1)).offset().top-90
    },'slow');
  }
}

function scrolldown(){
  if(cur_slide<scroll_slides){
    $('html,body').animate({
      scrollTop: $("#slide-"+(cur_slide+1)).offset().top-90
    },'slow');
  }
}


});




function hexToRgb(hex) {
  var bigint = parseInt(hex.substring(1,7), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return "rgba(" + r + "," + g + "," + b + ",";
}

function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}