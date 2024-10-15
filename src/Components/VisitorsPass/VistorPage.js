import React , { useEffect , useState} from 'react'

import  PassDescription  from './Description/PassDescription'
import VisitorTable  from './Table/VisitorTable'

import {

    useQuery,
    gql
  } from "@apollo/client";

export const VisitorPage = () => {

   


  
        const { loading, error, data } = useQuery(gql`
        {
          visitors {
            PASS_NO
            DATE
            HTNO
            VISITORS_NAME
            STUDENT_NAME
            EMAIL
            PHNO
            VEHICLE_NO
            FROM
            MEET
            IN
            OUT

          }
        }
      `); 
  
    



    //  if(error){ 
    //      console.log("hrrlo" + error)
    //  }



    return (
        <div style={{display : 'flex' , flexDirection : 'column' , alignItems : 'start'}}>
            <PassDescription/>
            <VisitorTable data = {data} />
        </div>
    )
}


