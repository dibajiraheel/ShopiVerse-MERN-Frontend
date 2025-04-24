import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/customer/Home.jsx'
import {Provider} from 'react-redux'
import store from './store/store'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/seller/Dashboard'
import AddNewProduct from './pages/seller/AddNewProduct'
import AllProducts from './pages/seller/AllProducts'
import AllOrders from './pages/seller/AllOrders'
import ActiveOrders from './pages/seller/ActiveOrders'
import SellerProduct from './pages/seller/SellerProduct'
import EditProduct from './pages/seller/EditProduct'
import EditProductImages from './pages/seller/EditProductImages'
import SellerProfile from './pages/seller/SellerProfile'
import UpdateSellerProfile from './pages/seller/SellerUpdateProfile'
import Signup from "./pages/Signup"
import EnsureAuthentication from './pages/EnsureAuthentication'
import CustomerProduct from './pages/customer/CustomerProduct'
import Cart from './pages/customer/Cart'
import CustomerOrders from './pages/customer/CustomerOrders'
import CustomerProfile from './pages/customer/CustomerProfile'
import CustomerUpdateProfile from './pages/customer/CustomerUpdateProfile'
import LoadCustomerStates from './pages/LoadCustomerStates'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />} > 
    
    {/*Redirect main path to login page*/}
    <Route index element={<Navigate to={'/login'} />} />

    {/*Common Routes*/}
    <Route path='/signup' element={<EnsureAuthentication children={<Signup />} authenticationRequired={false} />} />
    <Route path='/login' element={<EnsureAuthentication children={<Login />} authenticationRequired={false} />} />
    <Route path='/forgot-password' element={<EnsureAuthentication children={<ForgotPassword />} authenticationRequired={false} />} />
    
    {/*Seller Routes*/}
    <Route path='/dashboard' element={<EnsureAuthentication children={<Dashboard />} authenticationRequired={true} />} />
    <Route path='/seller/add-new-product' element={<EnsureAuthentication children={<AddNewProduct />} authenticationRequired={true} />} />
    <Route path='/seller/all-products' element={<EnsureAuthentication children={<AllProducts />} authenticationRequired={true} />} />
    <Route path='/seller/all-orders' element={<EnsureAuthentication children={<AllOrders />} authenticationRequired={true} />} />
    <Route path='/seller/active-orders' element={<EnsureAuthentication children={<ActiveOrders />} authenticationRequired={true} />} />
    <Route path='/seller/item/:itemId/:activePageNo' element={<EnsureAuthentication children={<SellerProduct />} authenticationRequired={true} />} />
    <Route path='/seller/edit-product/:itemId/:activePageNo' element={<EnsureAuthentication children={<EditProduct />} authenticationRequired={true} />} />
    <Route path='/seller/edit-product-images/:itemId/:activePageNo' element={<EnsureAuthentication children={<EditProductImages />} authenticationRequired={true} />} />
    <Route path='/seller/profile' element={<EnsureAuthentication children={<SellerProfile />} authenticationRequired={true} />} />
    <Route path='/seller/update/profile' element={<EnsureAuthentication children={<UpdateSellerProfile />} authenticationRequired={true} />} />
    
    {/*Customer Routes*/}
    <Route path='/home' element={<LoadCustomerStates children={<EnsureAuthentication children={<Home />} authenticationRequired={true} />} />} />
    <Route path='/customer/item/:itemId/:itemPageNo' element={<LoadCustomerStates children={<EnsureAuthentication children={<CustomerProduct />} authenticationRequired={true} />} />} />
    <Route path='/customer/cart' element={<LoadCustomerStates children={<EnsureAuthentication children={<Cart />} authenticationRequired={true} />} />} />
    <Route path='/customer/orders' element={<LoadCustomerStates children={<EnsureAuthentication children={<CustomerOrders />} authenticationRequired={true} />} />} />
    <Route path='/customer/profile' element={<LoadCustomerStates children={<EnsureAuthentication children={<CustomerProfile />} authenticationRequired={true} />} />} />
    <Route path='/customer/update-profile' element={<LoadCustomerStates children={<EnsureAuthentication children={<CustomerUpdateProfile />} authenticationRequired={true} />} />} /> 
  </Route>
))

createRoot(document.getElementById('root')).render(  
  
  <Provider store={store}>
    <RouterProvider router={router} >
    </RouterProvider>
  </Provider>  


)

