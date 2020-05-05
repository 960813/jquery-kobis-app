
$(window).on('load',()=>{
    $('.navbar__toggler').on('click',()=>{
        $('ul.navbar__slideMenu').slideToggle("slow");
    });
});