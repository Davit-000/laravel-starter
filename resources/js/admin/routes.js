import Toolbar from './components/Toolbar';
import Navigation from './components/Navigation';

export const routes = [
    {
        name: 'admin.login',
        path: '/admin/login',
        component: () => import('./pages/auth/Login')
    },
    {
        name: 'admin.dashboard',
        path: '/admin/dashboard',
        components: {
            toolbar: Toolbar,
            navigation: Navigation,
            default: () => import('./pages/Dashboard')
        }
    }
];
