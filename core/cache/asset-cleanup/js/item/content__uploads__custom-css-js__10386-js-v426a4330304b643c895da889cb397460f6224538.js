(function(){function modifyLinks(){var links=document.getElementsByTagName('a');for(var i=0;i<links.length;i++){var link=links[i];link.removeAttribute('target');if(link.href.includes('/listing')){link.href=link.href.replace('https://chatltt.com','https://app.chatltt.com')}
if(link.href.includes('chatltt.com/app.chatltt.com/submission')){link.href='https://app.chatltt.com/submission'}
link.target='_self';link.addEventListener('click',function(event){this.target='_self'})}}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",modifyLinks)}else{modifyLinks()}
window.addEventListener('load',modifyLinks)})()
;