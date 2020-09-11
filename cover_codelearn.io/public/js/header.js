function show_hide_dropdownProfile(){
    var element = document.getElementById('user-profile');
    if(element.className.indexOf('open') != -1){
        element.className = "dropdown header-user-profile";
    }
    else{
        element.className = "dropdown header-user-profile open";
    }
}