//����һ������ - ������$
var $$ = function() {};
//�ڶ���д��
$$.prototype = {
    $id:function (str){
        return document.getElementById(str)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
    //ȥ����߿ո�
    ltrim:function(str){
        return str.replace(/(^\s*)/g,'');
    },
    //ȥ���ұ߿ո�
    rtrim:function(str){
        return str.replace(/(\s*$)/g,'');
    },
    //ȥ���ո�
    trim:function(str){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //ajax - ǰ������ѧϰ��
    myAjax:function(URL,fn){
        var xhr = createXHR();	//������һ�������������IE6���ݡ�
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    fn(xhr.responseText);
                }else{
                    alert("������ļ���");
                }
            }
        };
        xhr.open("get",URL,true);
        xhr.send();

        //�հ���ʽ����Ϊ�������ֻ������ajax���������Է�������
        function createXHR() {
            //�����������ڡ�JavaScript�߼�������� ��3�桷��21��
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"
                        ],
                        i, len;

                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex) {
                            //skip
                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
    },
    //tab
    tab:function(id) {
        //��λ�ȡĳ����Ԫ���������Ԫ��
        var box = document.getElementById(id);
        var spans = box.getElementsByTagName('span');
        var lis = box.getElementsByTagName('li');


        //������
        //��һ��: �Ȱ��ϰ벿��ʵ��
        //Ⱥ����¼�  -- �����е�span���¼�
        //Ⱥ����¼�
        for(var i=0;i<spans.length;i++) {
            //���׷���  -- ����һ��һ������  --  ��ô�� -- �Զ�������
            spans[i].index=i;
            spans[i].onmouseover = function() {
                //����˼�� --  �����е�span��ΪĬ��״̬  --- Ȼ���ٽ���ǰ������ϵ�span��Ϊclass -- select
                for(var i=0;i<spans.length;i++) {
                    spans[i].className='';
                    lis[i].className='';
                }
                this.className='select';
                lis[this.index].className='select';
            }
        }

    },
    //�򵥵����ݰ�formateString
    formateString:function(str, data){
        return str.replace(/@\((\w+)\)/g, function(match, key){
            return typeof data[key] === "undefined" ? '' : data[key]});
    },
    //��һ���������书��
    extendMany:function() {
        var key,i = 0,len = arguments.length,target = null,copy;
        if(len === 0){
            return;
        }else if(len === 1){
            target = this;
        }else{
            i++;
            target = arguments[0];
        }
        for(; i < len; i++){
            for(key in arguments[i]){
                copy = arguments[i][key];
                target[key] = copy;
            }
        }
        return target;
    },
    extend:function(tar,source) {
        //��������
        for(var i in source){
            tar[i] = source[i];
        }
        return tar;
    },
    //�����
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
    //�������ͼ��
    isNumber:function (val){
        return typeof val === 'number' && isFinite(val)
    },
    isBoolean:function (val) {
        return typeof val ==="boolean";
    },
    isString:function (val) {
        return typeof val === "string";
    },
    isUndefined:function (val) {
        return typeof val === "undefined";
    },
    isObj:function (str){
        if(str === null || typeof str === 'undefined'){
            return false;
        }
        return typeof str === 'object';
    },
    isNull:function (val){
        return  val === null;
    },
    isArray:function (arr) {
        if(arr === null || typeof arr === 'undefined'){
            return false;
        }
        return arr.constructor === Array;
    }
}
//�ڿ����ʵ��������������ʹ�õ�ʹ�þͲ���ʵ������
$$ = new $$();


$$.extend($$,{
    /*���¼�*/
    on: function (id, type, fn) {
        //var dom = document.getElementById(id);
        var dom = $$.isString(id)?document.getElementById(id):id;
        //���֧��
        //W3C�汾 --��� �ȸ� �ȴ���������
        //�������������Ƿ�֧��ĳ�����ԣ�����������ͨ�����ַ�ʽ
        if(dom.addEventListener ) {
            dom.addEventListener(type, fn, false);
        }else if(dom.attachEvent){
            //���֧�� --IE
            dom.attachEvent('on' + type, fn);
        }
    },
    /*����¼�*/
    un:function(id, type, fn) {
        //var dom = document.getElementById(id);
        var dom = $$.isString(id)?document.getElementById(id):id;
        if(dom.removeEventListener){
            dom.removeEventListener(type, fn);
        }else if(dom.detachEvent){
            dom.detachEvent(type, fn);
        }

    },
    /*���*/
    click : function(id,fn){
        this.on(id,'click',fn);
    },
    /*�������*/
    mouseover:function(id,fn){
        this.on(id,'mouseover',fn);
    },
    /*����뿪*/
    mouseout:function(id,fn){
        this.on(id,'mouseout',fn);
    },
    /*����*/
    hover : function(id,fnOver,fnOut){
        if(fnOver){
            this.on(id,"mouseover",fnOver);
        }
        if(fnOut){
            this.on(id,"mouseout",fnOut);
        }
    },
    //�¼�ί��
    delegate:function (pid, eventType, selector, fn) {
        //��������
        var parent = $$.$id(pid);
        function handle(e){
            var target = $$.GetTarget(e);
            if(target.nodeName.toLowerCase()=== selector || target.id === selector || target.className.indexOf(selector) != -1){
                // ���¼�ð�ݵ�ʱ�򣬻��Դ˱���ÿ��������������ҵ���Ӧ��Ԫ�أ���ִ�����º���
                // Ϊʲôʹ��call����Ϊcall���Ըı�thisָ��
                // ��һ��ǵã������е�thisĬ��ָ��window��������ϣ��ָ��ǰdomԪ�ر���
                fn.call(target);
            }
        }
        //�����Ǹ�����Ԫ�ذ�һ���¼�������ִ��˳���Ȳ���Ŀ��Ԫ�أ�Ȼ���¼���ð��
        //�������Ǹ�Ԫ�ض����һ���¼�
        parent[eventType]=handle;
    },
    //�¼�����
    getEvent:function(event){
        return event?event:window.event;
    },
    //��ȡĿ��
    GetTarget :function(event){
        var e = $$.getEvent(event);
        return e.target|| e.srcElement;
    },
    //��֯Ĭ����Ϊ
    preventDefault:function(event){
        var event = $$.getEvent(event);
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    //��ֹð��
    stopPropagation:function(event){
        var event = $$.getEvent(event);
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
})


//��װһЩ���õ�dom����
$$.extend($$,{
    //��ĳ��Ԫ��������ʽ
    css:function(id, key, value){
        $$.$id(id).style[key] = value;
    },
    //��ĳ��Ԫ����������
    attr:function(id, key, value){
        $$.$id(id)[key] = value;
    },
    //��ĳ��Ԫ����������
    html:function(id, value){
        $$.$id(id).innerHTML = value;
    }

})