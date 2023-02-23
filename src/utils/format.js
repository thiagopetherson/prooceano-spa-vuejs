const formatDate = (date) => {
  
  let d = new Date(date);

  let year = d.getUTCFullYear() 
  let month = (d.getUTCMonth() + 1).toString().padStart(2, '0')
  let day = (d.getUTCDate()).toString().padStart(2, '0')

  let hours = d.getHours()
  let minutes = d.getMinutes()

  return day+"/"+month+"/"+year+" "+hours+":"+minutes;
}

export {
  formatDate
}