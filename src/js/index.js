$(function () {

    //遇到 需要把 header.html 加载完成后,才执行某一些函数 ?
    // 
    $(".header").load("/src/header.html",function(){
        // alert("header.html,页面加载完成了,就,我才执行");
    });
    $('.search').load("/src/search.html");
    // bunner页面js
    $('.banner').load("/src/banner.html", function(){
        $.getJSON("/src/data/banner.json",function(res){
            var banres = res;
      
           
          for (var j=0;j<banres.length;j++) {
            var dires =$("<li></li>");
            $(".navBox ul").append(dires);
            var list = $(".navBox>ul li")
            var arr=res[j];
            for(var i=0;i<arr.data.length;i++){
                var dom=document.createElement('a');
                dom.innerText = arr.data[i];
                list[j].appendChild(dom);
               
              }
          }
          
        }) 


    });
    $('.container').load("/src/container.html")
        // 等到 header页面 加载,才能让某一些 js生效)
    $(".footer").load("/src/footer.html");


    

 

})