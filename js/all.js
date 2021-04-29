var xhr = new XMLHttpRequest;
xhr.open('get','https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c',true);
xhr.send(null);

//all
var all = document.querySelector('.all');
var page = document.querySelector('.page');
var next = document.querySelector('.next');
var prev = document.querySelector('.prev');
var select = document.querySelector('select');
var menu = document.querySelector('.menu ul')
var h2 = document.querySelector('h2');
var code = "";
var count = 0;
var pagenum = 1;
var contentArr = [];
var re = 0;
var repage = 0;
var pagecount = 0;


xhr.onload = function(){
    var str = JSON.parse(xhr.response);
    var data = str.data.XML_Head.Infos.Info;
    chg();


    //建立地區選單
    for(var i=800;i<853;i++){
        var number = new Number(i);  
        codechg(number.toString()); //數字轉化成字串
        if(code !==""){
            var option = document.createElement('option');
            option.textContent = code;
            option.setAttribute('value',i);
            select.appendChild(option); 
        }            
    }
    

    function chg(){        
        if(re == 0){
            pagenum=1;
            pagecount = 0;  //沒有經過pagechg
        };  
        // console.log(pagenum);
        codechg(select.value);
        all.innerHTML="";
        count=0;
        str = "";
        pageAll="";
        if(select.value == "0"){
            h2.innerHTML = "全部";
        }else{
            h2.innerHTML = code;    
        };
        for(var i=0;i<data.length;i++){ //顯示資料       
            if( data[i].Zipcode == select.value){
                codechg(data[i].Zipcode);
                display(i);
                contentArr = document.querySelectorAll('.content');
            }else if(select.value == "0"){
                codechg(data[i].Zipcode);
                display(i);
                contentArr = document.querySelectorAll('.content')    
            }         
        }
        onepage();
        re = 0;
        //建立頁數
        pagecreat();                         
    }

    function pagecreat(){
        pageAll = "";   
        for(var i =0;i<contentArr.length/8;i++){
            // console.log(i+1);
            // console.log(pagecount);
            if( (i+1) > pagecount && (i+1) < (pagecount+6) ){
                if((i+1) == pagenum){
                    pageAll += "<li class='click'>"+ (i+1) +"</li>"
                    page.innerHTML = pageAll;
                }else{
                    pageAll += "<li>"+ (i+1) +"</li>"
                    page.innerHTML = pageAll;
                }   
            }
        }         
    }

    function pagemore(){
        repage = 1;
        console.log(pagecount);
        pagecount += 5;
        console.log(pagecount);
        pagecreat();
        repage = 1; 
    }

    function pageless(){
        repage = 1;
        console.log(pagecount);
        pagecount -= 5;
        console.log(pagecount);
        pagecreat();
        repage = 1;
    }

    function menuchg(e){
        if(e.target.nodeName !== "LI"){return};
        if(re == 0){
            pagenum=1;
            pagecount = 0;  //沒有經過pagechg
        }; 
        codechg(select.value);
        all.innerHTML="";
        str = '';
        pageAll="";
        count=0;      
        for(var i =0;i<data.length;i++){
            if(data[i].Zipcode == e.target.dataset.num){
                codechg(data[i].Zipcode);
                display(i);
                h2.innerHTML = code;
                contentArr = document.querySelectorAll('.content')     
            }
        };
        onepage();
        select.value = e.target.dataset.num;
        re = 0;
        //建立頁數
        pagecreat();
    }

    function onepage(){   
           
        for(var i=(pagenum-1)*8;i<pagenum*8;i++){
            if(contentArr[i]==undefined){return}
            // console.log(i);
            // console.log(contentArr[i].innerHTML);
            str += "<div class='content'>"+ contentArr[i].innerHTML +"</div>";
            all.innerHTML = str ;
        }


    }
    function pagechg(e){
        if(e.target.nodeName !== "LI"){return};
        pagenum = parseInt(e.target.textContent);//字串轉化成數字
        re =1;
        chg();  
    }

    function display(i){
        //content
        var content = document.createElement('div');
        content.setAttribute('class','content');
        all.appendChild(content);
        //contentTittle
        var contentTittle = document.createElement('div');
        contentTittle.setAttribute('class','contentTittle');
        content.appendChild(contentTittle);
        //Name
        var Name = document.createElement('div');
        Name.setAttribute('class','name');
        contentTittle.appendChild(Name);
        //zipcode
        var zipcode = document.createElement('div');
        zipcode.setAttribute('class','zipcode');
        contentTittle.appendChild(zipcode);
        //opentime
        var opentime = document.createElement('div');
        opentime.setAttribute('class','opentime detail');
        content.appendChild(opentime);
        //add
        var add = document.createElement('div');
        add.setAttribute('class','add detail');
        content.appendChild(add);
        //tel
        var tel = document.createElement('div');
        tel.setAttribute('class','tel detail');
        content.appendChild(tel);
        
        // content.setAttribute('data-num',count += 1);


        contentTittle.setAttribute('style','background-image: url("' + data[i].Picture1 + '");'); //景點圖片
        Name.innerHTML = data[i].Name; //景點名稱  
        zipcode.innerHTML = code;//區域

        opentime.innerHTML = data[i].Opentime;
        add.innerHTML = data[i].Add;
        tel.innerHTML = data[i].Tel;
    }


    function codechg(i){
        switch(i){  //以郵遞區號判定區域
            case "800":
                code = "新興區";
                break;
            case "801":
                code = "前金區";
                break;
            case "802":
                code = "苓雅區";
                break;
            case "803":
                code = "鹽埕區";
                break;
            case "804":
                code = "鼓山區";
                break;
            case "805":
                code = "旗津區";
                break;
            case "806":
                code = "前鎮區";
                break;
            case "807":
                code = "三民區";
                break;
            case "811":
                code = "楠梓區";
                break;
            case "812":
                code = "小港區";
                break;
            case "813":
                code = "左營區";
                break;
            case "814":
                code = "武仁區";
                break;
            case "815":
                code = "大社區";
                break;
            // case "817":
            //     code = "東沙群島";
            //     break;
            // case "819":
            //     code = "南沙群島";
            //     break;
            case "820":
                code = "岡山區";
                break;
            case "821":
                code = "路竹區";
                break;
            case "822":
                code = "阿蓮區";
                break;
            case "823":
                code = "田寮區";
                break;
            case "824":
                code = "燕巢區";
                break;
            case "825":
                code = "橋頭區";
                break;
            case "826":
                code = "梓官區";
                break;
            case "827":
                code = "彌陀區";
                break;
            case "828":
                code = "永安區";
                break;
            case "829":
                code = "湖內區";
                break;
            case "830":
                code = "鳳山區";
                break;
            case "831":
                code = "大寮區";
                break;
            case "832":
                code = "林園區";
                break;
            case "833":
                code = "鳥松區";
                break;
            case "840":
                code = "大樹區";
                break;
            case "842":
                code = "旗山區";
                break;
            case "843":
                code = "美濃區";
                break;
            case "844":
                code = "六龜區";
                break;
            case "845":
                code = "內門區";
                break;
            case "846":
                code = "杉林區";
                break;
            case "847":
                code = "甲仙區";
                break;
            case "848":
                code = "桃源區";
                break;
            case "849":
                code = "那瑪夏區";
                break;
            case "851":
                code = "茂林區";
                break;
            case "852":
                code = "茄萣區";
                break;
            default:
                code = "";
        };
    }

    select.addEventListener('change',chg);
    menu.addEventListener('click',menuchg);
    page.addEventListener('click',pagechg);
    next.addEventListener('click',pagemore);
    prev.addEventListener('click',pageless);

}
