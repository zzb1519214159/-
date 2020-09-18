;
(function ($) {
    $.fn.mytest  = function(){
        var conter = $(this).index();
   
            var nsw = $(this).children().find($('.mainbav_nsw>div'));
            var list = $(this).children().children().find($('#mainbav_list>li'));
            var nsw_btn =  $(this).children().find($('.mainbav_nsw>a'))
          
        var tempIndex = 0
            
        list.each(function (index) {
      
            $(this).hover(function () {
                tempIndex = $(this).index();
                nsw.removeClass("nsw_active");
                list.removeClass("list_active");
                nsw.eq(tempIndex).addClass("nsw_active");
                $(this).addClass("list_active");
                
               
                // var tab = $('.nsw_tab').index();
                // console.log(tab)

            },function(){
              
            });
        })


        
       
        $.getJSON("../data/comnes.json", function (res) {
            var tircon = res[conter].con;


            for(var i = 0;i<tircon.length;i++){
                var self = tircon[i].title;
             
           
                for (var j = 0; j < self.length; j++) {
                    var str = $(` <li><img src="${self[j].img}"><p>${self[j].name}</p><span>${self[j].inex}</span></li>`);
                    nsw.children().eq(i+2).append(str); 
           
                }   
       
            }
     })
        var sne = list.length;

        nsw_btn.click(function () {
            tempIndex++;
            if (tempIndex >= sne) {
                tempIndex = 0;
            }

            nsw.removeClass("nsw_active").eq(tempIndex).addClass("nsw_active");
            list.removeClass("list_active").eq(tempIndex).addClass("list_active");

       
        })


        nsw.each(function (index) {


            });
         }
    })(jQuery)


