$(function () {
    $(document).ready(function () {
        var tempIndex = 0

        $(".login_tab>span").each(function (index) {

            $(this).click(function () {
                $(".login_tab_con>div").removeClass("active");
                $(".login_tab>span").removeClass("tab_active");
                $(".login_tab_con>div").eq(index).addClass("active");
                $(this).addClass("tab_active");
            })
        })
    })
})