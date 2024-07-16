/******* Do not edit this file *******
Simple Custom CSS and JS - by Silkypress.com
Saved: Jul 16 2024 | 09:12:03 */
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Static Site</title>
    <link rel="manifest" href="/superpwa-manifest.json">
    <script>
        // Register the service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/superpwa-sw.js')
                    .then(registration => {
                        console.log('Service Worker registered with scope:', registration.scope);
                    })
                    .catch(error => {
                        console.error('Service Worker registration failed:', error);
                    });
            });
        }

        console.log("PWA install script loaded");

        (function() {
            let deferredPrompt;
            const installButton = document.createElement('button');
            installButton.style.display = 'none';
            installButton.textContent = 'Install PWA';
            installButton.style.position = 'fixed';
            installButton.style.bottom = '20px';
            installButton.style.right = '20px';
            installButton.style.padding = '10px';
            installButton.style.backgroundColor = '#007bff';
            installButton.style.color = 'white';
            installButton.style.border = 'none';
            installButton.style.borderRadius = '5px';
            installButton.style.zIndex = '9999';

            function initPWAInstall() {
                document.body.appendChild(installButton);

                window.addEventListener('beforeinstallprompt', (e) => {
                    console.log('beforeinstallprompt event fired');
                    e.preventDefault();
                    deferredPrompt = e;
                    installButton.style.display = 'block';
                });

                installButton.addEventListener('click', triggerInstall);

                // Check for the installation trigger parameter
                checkInstallTrigger();

                // Check PWA installability
                checkInstallability();
            }

            function checkInstallTrigger() {
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('pwa_install') === 'true') {
                    console.log('pwa_install parameter detected');
                    if (deferredPrompt) {
                        triggerInstall();
                    } else {
                        installButton.style.display = 'block';
                    }
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
                        installButton.style.display = 'none';
                    });
                } else {
                    console.log('PWA installation prompt not available');
                    alert('PWA installation is not available at the moment. Please try again later or check if the app is already installed.');
                }
            }

            function checkInstallability() {
                if ('serviceWorker' in navigator) {
                    console.log('Service Workers are supported');
                    navigator.serviceWorker.getRegistration().then(registration => {
                        if (registration) {
                            console.log('Service Worker is registered');
                        } else {
                            console.log('Service Worker is not registered');
                        }
                    });
                } else {
                    console.log('Service Workers are not supported');
                }

                if (window.matchMedia('(display-mode: standalone)').matches) {
                    console.log('App is already installed and running in standalone mode');
                }

                if ('getInstalledRelatedApps' in navigator) {
                    navigator.getInstalledRelatedApps().then(relatedApps => {
                        console.log('Related installed apps:', relatedApps);
                    });
                }
            }

            // Initialize when the DOM is fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initPWAInstall);
            } else {
                initPWAInstall();
            }

            // Test function
            window.testPWAInstall = function() {
                if (deferredPrompt) {
                    console.log('Triggering PWA install prompt');
                    deferredPrompt.prompt();
                } else {
                    console.log('PWA install prompt not available');
                    checkInstallability();
                }
            }
        })();
    </script>
</head>
<body>
    <!-- Your content here -->
    <a href="?pwa_install=true">Install PWA</a>
</body>
</html>
