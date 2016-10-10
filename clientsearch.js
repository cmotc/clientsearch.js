var oldhash = "0"
var hash = "0"
var map = new Array();
var deep = ""

function getMapHash(){
        var xmlhttp;
        var word;
        if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
        else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                        hash = xmlhttp.responseText;
                }
        }
        xmlhttp.open("GET","map.txt.sha2",true);
        xmlhttp.send();
}

function getMap(){
        var xmlhttp;
        if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
        else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                        map = xmlhttp.responseText.split("\n");
                }
        }
        xmlhttp.open("GET","map.txt",true);
        xmlhttp.send();
}

function getFileDeep(path){
        var xmlhttp;
        if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
        else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                        deep = xmlhttp.responseText.split("\n");
                }
        }
        xmlhttp.open("GET",path,true);
        xmlhttp.send();
}

function searchMe(searchFor){
        var results = new Array();
        getMapHash();
        if (oldhash === hash){
                for (page in map){
                        if (page.indexOf(searchFor) != -1 ){
                                results += page;
                        }
                }
                if ( results.length < 1 ){
                        for (page2 in map){
                                quoteStart = page2.indexOf("\"");
                                pathSlice = page2.slice(0, quoteStart);
                                trimSlice = pathSlice.trim();
                                getFileDeep(trimSlice);
                                if (deep != ""){
                                        if (deep.indexOf(searchFor) != -1){
                                                results += page2;
                                        }
                                }
                        }
                }
        }else{
                getMap();
        }
}
