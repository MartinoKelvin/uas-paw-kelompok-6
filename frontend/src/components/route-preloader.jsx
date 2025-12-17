import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Prefetch routes based on current location
const routePrefetchMap = {
    '/': ['/packages', '/sign-in'],
    '/packages': ['/sign-in', '/book'],
    '/sign-in': ['/dashboard'],
    '/dashboard': ['/profile', '/all-bookings', '/manage-packages'],
    '/manage-packages': ['/create-package', '/edit-package'],
};

export function RoutePreloader() {
    const location = useLocation();

    useEffect(() => {
        const routesToPrefetch = routePrefetchMap[location.pathname] || [];

        routesToPrefetch.forEach((route) => {
            // Create a link element to prefetch the route
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
        });

        // Cleanup
        return () => {
            const links = document.querySelectorAll('link[rel="prefetch"]');
            links.forEach((link) => link.remove());
        };
    }, [location.pathname]);

    return null;
}
