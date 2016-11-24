$(function(){
  //生成随机
var color=['c','d','s','h'];
// biao2=['A','2','3','4','5','6','7','8','9',
// 'T',
// 'J',
// 'Q',
// 'K'
// ];
var puke=[];
var biao=[];
while(puke.length<52){
  var h=color[Math.floor(Math.random()*4)];
  var n=Math.ceil(Math.random()*13);
  

  
  var puker={huase:h,shuzi:n};

  if (!biao[h+'-'+n]){
    puke.push(puker);
    biao[h+'-'+n]=true;
    
  }
}

biao2={1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',
10:'T',
11:'J',
12:'Q',
13:'K'
};

// var num=Math.floor(Math.random()*13);
// console.dir(biao2[num]);



  //放扑克
  var d=0;
  var b=0;
  
  for (var i = 0,index=0; i < 7; i++) {
   for (var j = 0; j < i+1; j++) {
    d+=100;
    index+=1;
     $('<div>').attr('id',i+'-'+j).data('shuzi',puke[index].shuzi).addClass('pai shang').appendTo('.zhuozi').css({backgroundImage:'url(img/'+biao2[puke[index].shuzi]+''+((puke[index]).huase)+'.png)'}).delay(d).animate({
      top:i*60,
      left:(6-i)*50+j*100
     })


   }
  }
  for (;index<puke.length;index++) {
     b+=100;
         $('<div>').data('shuzi',puke[index].shuzi).addClass('pai you').appendTo('.zhuozi').css({backgroundImage:'url(img/'+biao2[puke[index].shuzi]+''+((puke[index]).huase)+'.png)'}).delay(b).animate({
      top:600,
      left:150
     })
  }
 
  var youmeiyoubeidianzhu =function(el){
    var x=Number($(el).attr('id').split('-')[0]);
    var y=Number($(el).attr('id').split('-')[1]);
    return $('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length;
  }

  var shangyizhang=null;
  $('.pai').on('click',function(){
    if ($(this).hasClass('shang')&&youmeiyoubeidianzhu(this)){
      return;
    }
    if ($(this).data('shuzi')===13){
      $(this).animate({top:0,left:600}).queue(function(){
        $(this).remove();

      })
      return;
    }

    $(this).toggleClass('dongdong');
    if ($(this).hasClass('dongdong')){
          $(this).animate({
      top:'-=30'
    }).addClass('yinying');
        }else{
                    $(this).animate({
      top:'+=30'
    }).removeClass('yinying');
        }

    if (!shangyizhang){
      shangyizhang=$(this);
    }else {
      if(shangyizhang.data('shuzi')+$(this).data('shuzi')===13){
     $('.dongdong').animate({top:0,left:600}).queue(function(){
        $('.dongdong').remove();
      })
     shangyizhang=null;
    }else{
       $('.dongdong').removeClass('dongdong yinying').animate({
        top:'+=30'
       });
       shangyizhang=null;
    } 


  }

  })

  //换牌
  var num=0;
  $('.youyou').on('click',function(){
   num++;
   $('.pai.you').eq(-1)
   .css({zIndex:num})
   .removeClass('you')
   .addClass('hui')
   .animate({
    top:600,
    left:500
   })
  })
  //回排
  $('.huihui').on('click',function(){
    if ($('.pai.you').length){
      return;
    }
    $('.pai.hui').each(function(i,el){
      $(this).removeClass('hui').addClass('you').delay(i*30).animate({
        top:600,
        left:150
      }).css({zIndex:0})
    })
  })

});