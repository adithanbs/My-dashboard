
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {getData} from '../../service/Fackserver'



 const getState = (student,professor,hod,staff) => ({
  labels: ['Students','Professors','Hod','Staff'],
      datasets: [
        {
      data:[student,professor,hod,staff],
      backgroundColor: ['#2f7b18', '#167071','#a2971f','#a22823'],	
          hoverBackgroundColor: [ '#2f7b18', '#167071','#a2971f','#a22823']
        }
    ]
});

class Barchart extends React.Component {
state = getState();

componentDidMount = async () => {     
  let response_GetallData = await getData()
  let GetAllData = response_GetallData;
  console.log('GetAllData',GetAllData);
  var rez={};
  GetAllData.forEach(function(item){
    rez[item.type] ? rez[item.type]++ :  rez[item.type] = 1;
  });
  console.log(rez);
let student= rez.student
let professor = rez.professor
let hod = rez.hod
let staff = rez.staff
setInterval(() => {
this.setState(getState(student,professor,hod,staff));
}, 1000);
}

render() {  
return (
<div >
  <Bar  data={this.state}  options={{
                          responsive: true,
                          maintainAspectRatio: true,  }}/>
</div>
);
}
}

export default Barchart


