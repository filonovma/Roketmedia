function p(ps, s, go, i){
    var progressBar = document.getElementById(ps),
        selectProc = document.getElementById(s);
    goBtn = document.getElementById(go);

    moveTo(i);

    goBtn.onclick = function(e){

        if(selectProc.selectedIndex){
            newProc = selectProc.options[selectProc.selectedIndex].text*1;
            if(newProc) moveTo(i+newProc);
        }

    }

    function moveTo(to) {
        var width = 0;
        var id = setInterval(frame, 10);
        progressBar.style.width = width + "%";
        function frame() {
            if (width >= to) {
                clearInterval(id);

            } else {
                width++;
                progressBar.style.width = width + "%";
                progressBar.innerHTML = width + "%";
            }
        }
    }

}
p('myBar', 'procSelect', 'go', 1);


function r($s){
    var rating = document.querySelector($s),
        ratingItem = rating.querySelectorAll('.rating-item'),
        ratingScore = document.querySelectorAll('.rating-score')[0],
        userRaiting = (localStorage.getItem('rating')) ? localStorage.getItem('rating') : 0;

    userRaiting = 0;	//Закоментить
    if(userRaiting) {
        addClass(rating.querySelectorAll('.rating-item:nth-child(-n+'+userRaiting+')'), 'active')
        return;
    }
    getRatingScore();

    rating.onclick = function(e){
        var target = e.target,
            r = e.target.getAttribute('data-rate');

        if(target.classList.contains('rating-item')){
            removeClass(ratingItem,'current-active')
            target.classList.add('active','current-active');
            if(!userRaiting){
                localStorage.setItem('rating',r);
                ajax("action=addUserRating&rating="+r, function(response) {
                    console.log(response.count)
                    console.log(ratingScore)
                    if(!!response.count) ratingScore.innerText = response.count;
                });
            }
        }
    }
    rating.onmouseover = function(e) {
        var target = e.target;
        if(target.classList.contains('rating-item')){
            removeClass(ratingItem,'active')
            target.classList.add('active');
            mouseOverActiveClass(ratingItem)
        }
    }
    rating.onmouseout = function(){
        addClass(ratingItem,'active');
        mouseOutActiveClas(ratingItem);
    }

    function removeClass(arr) {
        for(var i = 0, iLen = arr.length; i <iLen; i ++) {
            for(var j = 1; j < arguments.length; j ++) {
                ratingItem[i].classList.remove(arguments[j]);
            }
        }
    }
    function addClass(arr) {
        for(var i = 0, iLen = arr.length; i <iLen; i ++) {
            for(var j = 1; j < arguments.length; j ++) {
                ratingItem[i].classList.add(arguments[j]);
            }
        }
    }

    function mouseOverActiveClass(arr){
        for(var i = 0, iLen = arr.length; i < iLen; i++) {
            if(arr[i].classList.contains('active')){
                break;
            }else {
                arr[i].classList.add('active');
            }
        }
    }


    function mouseOutActiveClas(arr){
        for(var i = arr.length-1; i >=1; i--) {
            if(arr[i].classList.contains('current-active')){
                break;
            }else {
                arr[i].classList.remove('active');
            }
        }
    }

    function ajax(params, callback){
        request = new XMLHttpRequest();
        url = "/ajax.php";
        request.responseType =	"json";
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.addEventListener("readystatechange", () => {

            if (request.readyState === 4 && request.status === 200) {
            let obj = request.response;

            if(obj.error) alert(obj.error)
            else callback(obj);
        }
    });

        request.send(params);
    }

    function getRatingScore(){
        return ajax('action=GetUsersRating', function(response){
            if(!!response.count) ratingScore.innerText = response.count;
            else ratingScore.innerText = 0;
        })

    }
}
r('.rating');


function ajaxRand(){
    const request = new XMLHttpRequest();
    const url = "/ajax.php";
    const params = "action=getRandom";

    request.responseType =	"text";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
        let obj = request.response;

        //return obj;
        alert(obj);

    }
});
    request.send(params);
}
