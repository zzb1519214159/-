$(function () {
    $(document).ready(function () {
        var tempIndex = 0

        $("#mainbav_list li").each(function (index) {
          
            $(this).hover(function () {
                $(".mainbav_nsw>div").removeClass("nsw_active");
                $("#mainbav_list li").removeClass("list_active");
                $(".mainbav_nsw>div").eq(index).addClass("nsw_active");
                $(this).addClass("list_active");


                tempIndex = $(this).index();
                // var tab = $('.nsw_tab').index();
                // console.log(tab)

            },function(){
              
            });
        })

        
       
        $.getJSON("/src/data/comnes.json", function (res) {

            for(var i = 0;i<res.length;i++){
                var self = res[i].title;
           
                for (var j = 0; j < self.length; j++) {
                    var str = $(` <li><img src="${self[j].img}"><p>${self[j].name}</p><span>${self[j].inex}</span></li>`);
                        $('.nsw_tab>ul').eq(i).append(str); 
                }   
       
            }
     })
        var sne = $("#mainbav_list li").length;

        $("#nsw_btn").click(function () {
            tempIndex++;
            if (tempIndex >= sne) {
                tempIndex = 0;
            }

            $(".mainbav_nsw>div").removeClass("nsw_active").eq(tempIndex).addClass("nsw_active");
            $("#mainbav_list li").removeClass("list_active").eq(tempIndex).addClass("list_active");

       
        })


        $(".mainbav_nsw>div").each(function (index) {


        })
    })
})

SwiperCon.init({
    el: "#slider"
}).autoPlay();

$(function () {

})
