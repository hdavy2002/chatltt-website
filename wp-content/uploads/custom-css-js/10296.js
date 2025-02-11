/******* Do not edit this file *******
Simple Custom CSS and JS - by Silkypress.com
Saved: Jul 15 2024 | 12:09:35 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script started');
    var links = document.querySelectorAll('a[href*="chatltt.com/listing"]');
    console.log('Found ' + links.length + ' matching links');
    
    links.forEach(function(link, index) {
        console.log('Processing link ' + index + ': ' + link.href);
        if (link.href.startsWith('https://chatltt.com/listing')) {
            var newHref = link.href.replace('https://chatltt.com/listing', 'https://app.chatltt.com/listing');
            console.log('New href: ' + newHref);
            link.href = newHref;
        } else {
            console.log('Link does not start with https://chatltt.com/listing, skipping');
        }
    });
    
    console.log('Script finished');
});