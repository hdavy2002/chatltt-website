/******* Do not edit this file *******
Simple Custom CSS and JS - by Silkypress.com
Saved: Jul 16 2024 | 13:09:59 */
console.log("PWA install script loaded");
(function() {
    let deferredPrompt;

    function initPWAInstall() {
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('beforeinstallprompt event fired');
            e.preventDefault();
            deferredPrompt = e;
            console.log('Deferred prompt set:', deferredPrompt);
            checkInstallTrigger(); // Check install trigger only after deferredPrompt is set
        });
    }

    function checkInstallTrigger() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('pwa_install') === 'true') {
            console.log('pwa_install parameter detected');
            showInstallDialog();
        }
    }

    function triggerInstall() {
        if (deferredPrompt) {
            console.log('Triggering PWA install prompt');
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the PWA installation');
                } else {
                    console.log('User dismissed the PWA installation');
                }
                deferredPrompt = null;
            }).catch((error) => {
                console.error('Error during user choice handling:', error);
            });
        } else {
            console.log('PWA installation prompt not available, attempting alternative methods');
            attemptAlternativeInstall();
        }
    }

    function attemptAlternativeInstall() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/superpwa-sw.js')
                .then(function(registration) {
                    console.log('SuperPWA Service Worker registered', registration.scope);
                    showInstallDialog();
                })
                .catch(function(error) {
                    console.error('SuperPWA Service Worker registration failed:', error);
                    alert('Unable to install the app at this time. Please try again later.');
                });
        } else {
            alert('Your browser does not support PWA installation. Please try using a different browser.');
        }
    }

    function showInstallDialog() {
        const dialog = document.createElement('div');
        dialog.style.position = 'fixed';
        dialog.style.left = '0';
        dialog.style.top = '0';
        dialog.style.width = '100%';
        dialog.style.height = '100%';
        dialog.style.backgroundColor = 'rgba(0,0,0,0.5)';
        dialog.style.display = 'flex';
        dialog.style.justifyContent = 'center';
        dialog.style.alignItems = 'center';
        dialog.style.zIndex = '10000';

        const content = document.createElement('div');
        content.style.backgroundColor = 'white';
        content.style.padding = '20px';
        content.style.borderRadius = '10px';
        content.style.maxWidth = '80%';
        content.style.textAlign = 'center';

        const message = document.createElement('p');
        message.textContent = 'Installing Chat LTT App now! Your device security check might cause a slight delay. Enjoy!';

        const installButton = document.createElement('button');
        installButton.textContent = 'Install App';
        installButton.style.backgroundColor = '#ff5757';
        installButton.style.color = 'white';
        installButton.style.border = 'none';
        installButton.style.padding = '10px 20px';
        installButton.style.borderRadius = '5px';
        installButton.style.marginTop = '15px';
        installButton.style.cursor = 'pointer';

        installButton.addEventListener('click', function() {
            // Trigger the install prompt when the user clicks the button
            triggerInstall();
            document.body.removeChild(dialog);
        });

        content.appendChild(message);
        content.appendChild(installButton);
        dialog.appendChild(content);

        document.body.appendChild(dialog);
    }

    // Initialize when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPWAInstall);
    } else {
        initPWAInstall();
    }

    // Test function
    window.testPWAInstall = function() {
        showInstallDialog();
    }
})();
