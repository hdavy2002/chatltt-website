document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('a[href*="/listing"]');
    links.forEach(function(link) {
        link.href = link.href.replace("/listing", "https://app.chatltt.com/listing");
    });
});