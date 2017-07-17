/**
 * Created by shenzhen on 2017/7/2.
 */
window.onload = function () {



    var model = document.getElementsByClassName("model");
    var mytables= document.getElementsByClassName("mytable")[0];

    var inner = document.getElementsByClassName("inner")[0];
    var img = inner.getElementsByTagName("img")[0];
    var btnClear = document.getElementById("clear");
    var btnCompute = document.getElementById("compute");

    var design = document.getElementsByClassName("design");
    for (var i=0;i<design.length;i++){
        design[i].onclick = function (n) {
                return function () {
                    var sibs= sibling(design[n]);
                    for(var i=0;i<sibs.length;i++){
                         sibs[i].children[0].children[0].checked = false;
                    }
                }
        }(i)
    }



    // model1.onclick = function () {
    //
    //     model2.checked = false;
    //     model3.checked = false;
    //
    //     model1.parentNode.parentNode
    // }


    btnClear.onclick = function () {
        clearSelected();
    };
    btnCompute.onclick = function () {
        computePrice();
    };
    for(var i =0 ;i<model.length ;i++){


        model[i].onmouseover= function (n) {
            return function () {
                var input = model[n].getElementsByTagName("input")[0];
                var noPic = input.getAttribute("noPic");
                img.src = "";

                // var pos = getMousePos(event);
                var pos = positionObj(event,"container");

                inner.style.top = pos.y +"px" ;
                inner.style.right = 0 + "px";

                var name = input.name;
                var nameArr = name.split(".");
                var fileName = nameArr[0]+"-"+nameArr[nameArr.length-1];

                inner.style.display = "block";
                if(noPic){
                    var innerHtml = input.parentNode.innerText;
                    inner.childNodes[1].innerHTML = innerHtml;
                }

                if(noPic==null){
                    img.src = "./img/"+fileName+'.png';
                }

            }

        }(i)
    }

    function sibling(elem){
        var r=[];
        var childs=elem.parentNode.childNodes;
        for(var i=0,len=childs.length;i<len;i++){
            if(childs[i].nodeType==1&&childs[i]!=elem){
                r.push(childs[i]);
            }
        }
        return r;
    }
    function getMousePos(event) {
        var e = event || window.event;
        return {'x':e.clientX,'y':e.clientY}
    }

    //当需求为获得的坐标值相对于某一对象时，用：
    function positionObj(event,id){

        //获得对象相对于页面的横坐标值；id为对象的id
        var thisX = document.getElementById(id).offsetLeft;

        //获得对象相对于页面的横坐标值；
        var thisY = document.getElementById(id).offsetTop;

        //获得页面滚动的距离；
        //注：document.documentElement.scrollTop为支持非谷歌内核；document.body.scrollTop为谷歌内核
        var thisScrollTop = document.documentElement.scrollTop + document.body.scrollTop;

        event = event||window.event;
        //获得相对于对象定位的横标值 = 鼠标当前相对页面的横坐标值 - 对象横坐标值；

        x = event.clientX - thisX;

        //获得相对于对象定位的纵标值 = 鼠标当前相对页面的纵坐标值 - 对象纵坐标值 + 滚动条滚动的高度；
        y = event.clientY - thisY + thisScrollTop;

        return {'x':x,'y':y}

    }
    function clearSelected() {
        for(var i=0;i<model.length;i++){
            var input = model[i].getElementsByTagName("input")[0];
            input.checked = false;
        }
    }
    var count = 0;
    function computePrice() {
        for(var i=0;i<model.length;i++){
            var input = model[i].getElementsByTagName("input")[0];
            if(input.checked){
                count++;
            }
        }
        alert(count*1000+"元");
    }

}