var nameEle = document.getElementsByClassName('name')[0]
var passwordEle = document.getElementsByClassName('password')[0]
var sendBtn = document.getElementsByClassName('button')[0]

var loginNameEle = document.getElementsByClassName('login-name')[0]
var loginPasswordEle = document.getElementsByClassName('login-password')[0]
var loginBtn = document.getElementsByClassName('login-button')[0]

let nameEnable = false
let passwordEnable = false

nameEle.onblur = function () {

  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/user/checkName',
    data: {
      name: nameEle.value,
    },
    success: (result) => {
      nameEnable=result.flag
      enableButton()
      if(!result.flag){
        alert(result.message)
      }
    }

  })

}
passwordEle.onblur = function () {
  let password = passwordEle.value
  if (password) {
    let flag = checkPassword(password)
    passwordEnable = flag
    enableButton()
  }

}

function enableButton() {
  sendBtn.disabled = !(nameEnable && passwordEnable)
}

function checkPassword(password) {
  var partten = /^\w{8,15}$/
  return  partten.test(password)
}


sendBtn.onclick = function () {
  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/user/regist',
    data: {
      name: nameEle.value,
      password: passwordEle.value
    },
    success: (result) => {
      if(result.status==='success'){
        alert('注册成功')
      }
    }

  })
}


loginBtn.onclick=function (){
  let loginName=loginNameEle.value
  let loginPassword=loginPasswordEle.value
  if(loginName&&loginPassword){
    $.ajax({
      type:'post',
      url:'http://localhost:3000/user/login',
      data:{
        name:nameEle.value,
        password:passwordEle.value
      },
      success:(result)=>{
        console.log(result)
      }
    })
  }

}
