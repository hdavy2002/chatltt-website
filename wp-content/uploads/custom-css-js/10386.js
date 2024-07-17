<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
(function() {
    // Function to modify links
    function modifyLinks() {
        // Select all 'a' elements on the page
        var links = document.getElementsByTagName('a');
        
        // Loop through each link
        for (var i = 0; i < links.length; i++) {
            // Remove the target attribute if it exists
            links[i].removeAttribute('target');
            
            // Add click event listener
            links[i].addEventListener('click', function(event) {
                // Check if the link is to an external site
                if (this.hostname !== window.location.hostname) {
                    // If it's external, you might want to keep it opening in a new tab
                    // Remove the next line if you want ALL links to open in the same tab
                    this.target = '_blank';
                } else {
                    // For internal links, ensure they open in the same tab
                    this.target = '_self';
                }
            });
        }
    }

    // Run the function when the DOM is fully loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", modifyLinks);
    } else {
        modifyLinks();
    }

    // Also run the function when the page is fully loaded (including images and other resources)
    window.addEventListener('load', modifyLinks);

    // If you're using AJAX to load content dynamically, you might want to call modifyLinks() after new content is loaded
})();</script>
<!-- end Simple Custom CSS and JS -->
