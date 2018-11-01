import axios from 'axios'

export const signOut = () =>(
  (dispatch) =>{
    axios.get('/session')
    .then(function(res) {

    })
    .catch(function(err) {

    })
  })