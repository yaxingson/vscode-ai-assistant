import * as https from 'node:https'

function request(url:string) {
  if(typeof fetch === 'undefined') {
    https.request({}, req=>{
      req.on('data', chunk=>{})
      req.on('end', ()=>{

      })
    })
  }
}

