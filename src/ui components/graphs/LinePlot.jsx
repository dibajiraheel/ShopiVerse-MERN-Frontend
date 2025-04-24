import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  


const LinePlot = ({data, mode}) => {
    
    const options = {
        
        responsive: true,
        
        plugins: {
            
            legend: {
                
                labels: {
                    
                    color: mode == 'dark' ? 'white' : 'black', // Change legend text color
                    
                    font: {

                        size: 24, // Increase legend text size
                        weight: 'bold'

                    }

                }

            }

        },
        
        scales: {
           
            x: {

                ticks: {

                    color: mode == 'dark' ? 'white' : 'black', // Change X-axis labels text color
                    font: {

                        size: 16, // Increase X-axis label size
                        weight: 'bold'

                    }
                }

            },

            y: {

                ticks: {

                    color: mode == 'dark' ? 'white' : 'black', // Change Y-axis labels text color
                    font: {

                        size: 16, // Increase X-axis label size
                        weight: 'bold'

                    }

                }

            }

        }

    };
    

    if (Object.keys(data)?.length > 0) {
        
        console.log('DATA RECEIVED', data);
        

        return (

            <div>
                <Line data={data} options={options}/>
            </div>
            
            )

    }

    return null

}

export default LinePlot