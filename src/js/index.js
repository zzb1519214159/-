$(function () {

    //遇到 需要把 header.html 加载完成后,才执行某一些函数 ?
    // 
 


    $(".header").load("../header.html", function () {
        
    });
    $('.search').load("../search.html");
    // bunner页面js
    $('.banner').load("../banner.html", function () {
        $.getJSON("../data/banner.json", function (res) {
            var banres = res;


            for (var j = 0; j < banres.length; j++) {
                var dires = $("<li></li>");
                $(".navBox ul").append(dires);
                var list = $(".navBox>ul li")
                var arr = res[j];
                for (var i = 0; i < arr.data.length; i++) {
                    var dom = document.createElement('a');
                    dom.innerText = arr.data[i];
                    list[j].appendChild(dom);

                }
            }

            $('#navBox li ').hover(function () {
                $('.full-list-con ul').html(" ");
                $('.full-list-top>ul').html(" ");
                var lisIndex = $(this).index();
                $('.fullcategory-right img').attr('src', './images/fullcategory/full' + (lisIndex + 1) + '.jpg')
                $('#fullcategory').show()
                $.getJSON("../data/fullcategory.json", function (res) {


                    var tser_top = res[lisIndex].fullcat_title[0].tser_top;
                    var csn = res[lisIndex].fullcat_title;

                    for (var x = 0; x < tser_top.length; x++) {
                        var str = $(`<li><a href="#">${tser_top[x]}</a></li>`);

                        $('.full-list-top>ul').append(str);
                    }
                    for (var i = 1; i < csn.length; i++) {
                        var txt = $(`<li></li>`);
                        $('.full-list-con ul').append(txt);
                        for (var j = 0; j < csn[i].tser_csn.length; j++) {
                            var resse = $(`<a href="#">${csn[i].tser_csn[j]}</a>`)
                            $('.full-list-con li').eq(i - 1).append(resse);
                        }
                    }

                    if ($('.full-list-con ul').height() > $('.fullcategory-left').height()) {
                        $('.full-list-con ul li').css({
                            'width': '50%',
                            'float': 'left',
                            'display': 'flex',
                            'flex-wrap': ' wrap'
                        })

                    }


                })



            }, function () {
                $('#fullcategory').hover(function () {
                    $('#fullcategory').show();
                }, function () {
                    $('#fullcategory').hide();
                });
                $('#fullcategory').hide();
            })



        })

        // 滑动滚动条
        $(window).scroll(function () {
            // 滚动条距离顶部的距离 大于 200px时

            if ($(window).scrollTop() >= 650) {
                $(".category-box").addClass('category-box-nav');
                $('.mainnav').hide();
                $('#nav-search').show();
                $('#navBox').hide();
                $('.fullcategory').css('top', '45px')
                $('.category-wbox').css({ 'align-items': 'center', 'height': '50px' });

                $('.category-navBox>h2').hover(function () {
                    $('#navBox').show();
                }, function () {
                    $('#navBox').hover(function () {
                        $('#navBox').show();
                    }, function () {
                        $('#fullcategory').hover(function () {
                            $('#fullcategory').show();
                            $('#navBox').show();
                        }, function () {
                            $('#fullcategory').hide();
                            $('#navBox').hide();
                        });
                        $('#navBox').hide();
                    });
                    $('#navBox').hide();
                });

            } else {
                $(".category-box").removeClass('category-box-nav');
                $('.mainnav').show();
                $('#nav-search').hide();
                $('#navBox').show();
                $('.fullcategory').css('top', '40px')
                $('.category-wbox').css({ 'align-items': 'center', 'height': '40px' });
                $("#navBox").unbind("mouseenter").unbind("mouseleave");
                $(".category-navBox>h2").unbind("mouseenter").unbind("mouseleave");
                $('#fullcategory').unbind("mouseenter").unbind("mouseleave")
            }
        });





    });
    $('.container').load("../container.html", function () {
        $('.handler li a').each(function (i, item) {
            $(item).click(function () {

                var soltop = $('.container-con').eq(i).offset().top - 50;             
              
                    $("html,body").animate({ scrollTop: soltop }, 500);
                })
                $(window).scroll(function () {
                    if ($(window).scrollTop() < 1580 ) {
                        $('.elevator').hide();
                    } else {
                        $('.elevator').show();
                    }
                    if($(window).scrollTop() > 5000 ){
                        $('.elevator').hide();
                    }
               
            })

         $(window).resize(function(){
            if($(window).width() < 1440){
                $('.elevator').hide();
            }else{
                $('.elevator').show();
            }
         })
            
        })
    })
    $(".mienr").load("../mienr.html", function () {
        // alert("header.html,页面加载完成了,就,我才执行");
    });
    // 等到 header页面 加载,才能让某一些 js生效)
    $(".footer").load("../footer.html");


   


})