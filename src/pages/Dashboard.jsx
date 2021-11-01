import React from 'react'
import { Link } from 'react-router-dom'
import  Barchart  from '../components/chart/Barchart';
import Piechart from '../components/chart/Piechart';
import {getData} from '../service/Fackserver'


function Dashboard() {
           
               let data = getData ()
               // console.log(data); 

   
    return (
        <>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="card full-height">
                    <Barchart/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card__header">
                            <h3>No Of Users : <strong>{data.length}</strong> <br></br>
                            </h3>

                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div className="card">
                        <div className="card__header">
                            <h3>latest Data</h3>
                            <Piechart/>
                       </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
            </div>
       
      
          </>
          )
}

export default Dashboard
