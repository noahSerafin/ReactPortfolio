let test = 1
let type = test => typeof value


function maskify(cc) {
    let l = cc.split('')
    console.log(l)
    for (let i = 0; i < l.length-4; i++) {
          l[i] = '#'
      }
      return l.join('')
  }
  
  console.log()
  console.log(maskify('4556364607935616'))
  console.log(maskify('4'))
  console.log(maskify('11111'))
 