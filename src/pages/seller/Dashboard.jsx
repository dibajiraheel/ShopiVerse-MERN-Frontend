import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../ui components/Navbar";
import React, { useState, useEffect } from "react";
import LinePlot from "../../ui components/graphs/LinePlot";
import sellerButtons from "../../utils/SellerNavarbarButtons"
import { getCookie } from "react-use-cookie";
import GetSellerProfile from "../../api/seller/GetSellerProfile";
import { UpdateSellerProfileInStore } from "../../slices/seller/SellerProfile";
import Input from "../../components/Input";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button"
import { fetchDashboardDataForXDays } from "../../constants"
import GetSellerDashboard from "../../api/seller/GetSellerDashboard";
import { AddDataInSellerDashboardSlice } from "../../slices/seller/SellerDashboardSlice";


const Dashboard = () => {

  const themeMode = useSelector(state => state.themeStore.mode)

  const dispatch = useDispatch()

  //Fetch Seller Profile
  useEffect(() => {

    const FetchProfile = async () => {
        const response = await GetSellerProfile()
        console.log('GET SELLER PROFILE RESPONSE RECEIVED', response);
        
        if (!response) return
        dispatch(UpdateSellerProfileInStore({profile: response}))
        return
    }
   
    FetchProfile()

  }, [])


  //Fetch Seller Dashboard
  const fetchedForXDays = useSelector(state => state.sellerDashboardStore.fetchedForXDays)
  const totalOrders = useSelector(state => state.sellerDashboardStore.totalOrders)
  const totalActiveOrders = useSelector(state => state.sellerDashboardStore.totalActiveOrders)
  const totalOrdersReceivedInLastXDays = useSelector(state => state.sellerDashboardStore.totalOrdersReceivedInLastXDays)
  const totalSalesInLastXDays = useSelector(state => state.sellerDashboardStore.totalSalesInLastXDays)
  const totalOrdersReceivedToday = useSelector(state => state.sellerDashboardStore.totalOrdersReceivedToday)
  const dates = useSelector(state => state.sellerDashboardStore.dates)
  
  const FetchSellerDashboardData = async (sellerId, days) => {
    console.log('FETCH SELLER DASHBOARD DATA CALLED FOR DAYS', days);
    
    const response = await GetSellerDashboard(sellerId, days)
    console.log('RESPONSE AFTER FETCHING', response);
    
    if (!response) return false
    const sellerDashboardData = {sellerDashboard: {...response}}
    dispatch(AddDataInSellerDashboardSlice(sellerDashboardData))
    return true
  }
  
  useEffect(() => {
    console.log('FETCHED FOR X DAYS FROM STORE', fetchedForXDays);
    
    if (!(fetchedForXDays >= 2)) {
      console.log('CALLING FETCH SELLER DASHBOARD DATA FROM USE EFFECT');
      
      FetchSellerDashboardData(sellerId, fetchDashboardDataForXDays)
    } 
  }, [fetchedForXDays, totalOrders, totalActiveOrders, totalOrdersReceivedInLastXDays, totalSalesInLastXDays, totalOrdersReceivedToday, dates])
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {control, handleSubmit} = useForm()
  const sellerId = getCookie('_id')
  const handleDaysInput = async (data) => {
    if (Number(fetchedForXDays) == Number(data.days)) return
    setIsSubmitting(true)
    const days = Number(data.days)
    const response = await FetchSellerDashboardData(sellerId, days)
    if (!response) return
    setIsSubmitting(false)
    return
  }


  // Graphs Data
  const orderReceivedData = {
        labels: dates,
        datasets: [
          {
            label: "Orders Received",
            data: totalOrdersReceivedInLastXDays
              ? Object.values(totalOrdersReceivedInLastXDays)
              : [2, 10, 22, 8, 1, 30, 46],
            borderColor: "rgba(255, 255, 0, 0.6)", // Line color
            borderWidth: 3, // Thickness of the line
            backgroundColor: "rgba(255, 255, 0, 0.6)", // Fill color under the line
            pointBorderColor: "rgba(255, 255, 0, 0.8)", // Border color of points
            pointBackgroundColor: "rgba(255, 255, 0, 1)", // Fill color of points
            pointBorderWidth: 2, // Thickness of points
          },
        ],
      };
    
  const salesData = {
    labels: dates,
    datasets: [
      {
        label: "Sales In PKR",
        data: totalSalesInLastXDays
          ? Object.values(totalSalesInLastXDays)
          : [2000, 10600, 24000, 8000, 1000, 30000, 26500],
        borderColor: "rgba(0, 255, 0, 0.6)", // Line color
        borderWidth: 3, // Thickness of the line
        backgroundColor: "rgba(0, 255, 0, 0.6)", // Fill color under the line
        pointBorderColor: "rgba(0, 255, 0, 0.8)", // Border color of points
        pointBackgroundColor: "rgba(0, 0, 255, 1)  ", // Fill color of points
        pointBorderWidth: 2, // Thickness of points
      },
    ],
  };

  return (

    <div className="min-w-screen min-h-screen">

      <div>
        <Navbar buttons={sellerButtons()} mode={'seller'} dashboardNavigateLink={'/dashboard'} profileNavigateLink={'/seller/profile'} />
      </div>

      <div className="pt-20 flex flex-row gap-5 justify-center items-center">
        
        <form className="flex flex-col justify-center items-center gap-5" onSubmit={handleSubmit(handleDaysInput)}>
        
          <div>
            <Controller control={control} name="days" render={({field}) => (
              <Input
                minNumAllowed={2}
                maxNumAllowed={30}
                label="Days"
                placeholder="Enter Days"
                type="number"
                defaultValue={fetchDashboardDataForXDays}
                value={field.value}
                onChange={field.onChange}
                inputClasses={`${
                  themeMode === 'dark'
                    ? 'bg-transparent input-success border-2 text-center text-xl text-white'
                    : 'bg-white border-gray-300 text-center text-xl text-black'
                } rounded-md px-3 py-2 w-full`}
                labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white text-center' : 'text-black text-center'}`}
              />
            )} />
          </div>
            
          <div>
            <Button
              text={isSubmitting ? 'Getting Data' : 'Submit'}
              classes={`${
                        themeMode == "dark"
                          ? "bg-transparent border border-green-500"
                          : "bg-green-500"
                      } rounded-md mb-10 hover:bg-green-600 hover:bg-green-800`}
              type={'submit'}
              disabled={isSubmitting}
            />
          </div>
        
        </form>
      
      </div>

      <div
          className={`flex flex-col md:flex-row justify-around items-center gap-4 p-4 rounded-2xl shadow-md transition-all duration-300 ${
            themeMode === "dark" ? "" : "bg-white"
          }`}
        >
          <div className="text-center">
            <h2 className={`text-lg font-semibold ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}>
              Orders Completed
            </h2>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Number(totalOrders) - Number(totalActiveOrders)}
            </p>
          </div>

          <div className="text-center">
            <h2 className={`text-lg font-semibold ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}>
              Orders Active
            </h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalActiveOrders}
            </p>
          </div>

          <div className="text-center">
            <h2 className={`text-lg font-semibold ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}>
              Orders Received Today
            </h2>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {totalOrdersReceivedToday || 0}
            </p>
          </div>
      </div>

      <div className="mx-5 gap-y-5 flex flex-col md:flex-row justify-center items-center pb-30">
      
        <div className="w-full md:w-1/2 md:px-5">
          <LinePlot data={orderReceivedData} mode={themeMode} />
        </div>

        <div className="w-full md:w-1/2 md:px-5">
          <LinePlot data={salesData} mode={themeMode} />
        </div>

      </div>

    </div>



  )

}

export default Dashboard;
