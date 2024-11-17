import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { LogOut, Loader2 } from 'lucide-react';

function LogoutBtn() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const logoutHandler = async () => {
        try {
            setIsLoading(true);
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={logoutHandler}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {/* {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                // <LogOut className="h-4 w-4 mr-2" />
            )} */}
            Logout
        </button>
    );
}

export default LogoutBtn;