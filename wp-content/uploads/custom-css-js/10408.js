/******* Do not edit this file *******
Simple Custom CSS and JS - by Silkypress.com
Saved: Aug 28 2024 | 07:07:22 */
document.addEventListener('DOMContentLoaded', function() {
    var link = document.querySelector('a[href*="s-sols.com/products/wordpress/accelerator"]');
    if (link) {
        var parentBar = link.closest('div') || link.parentElement;
        if (parentBar) {
            parentBar.style.display = 'none';
        }
    }
});