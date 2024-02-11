import React from 'react'
import { useShopify } from '../context/ShopifyContext'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
   const {autenticated} = useShopify();

   if(!autenticated) return <Navigate to="/carrito" replace />;

   return <Outlet />;

}

export default ProtectedRoute