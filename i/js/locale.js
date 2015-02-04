$(document).ready(function(){
    $(".translate").each(function() {
        name = $(this).data("name");
        $(this).html(chrome.i18n.getMessage(name));
    });
    $("input.topbar__search").attr("placeholder", chrome.i18n.getMessage("search"));
});


