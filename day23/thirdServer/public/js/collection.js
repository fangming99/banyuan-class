// 获取selector中option的方式

function getMajor() {
  let majorSelector = document.getElementsByClassName('major')[0]
  const index = majorSelector.selectedIndex
  const major = majorSelector.options[index]
  return majorValue = major.value
}

function getGender() {
  let genderSelector = document.getElementsByClassName('gender')[0]
  const index = genderSelector.selectedIndex
  const gender = genderSelector.options[index]
  return genderValue = gender.value
}

let btn = document.getElementsByClassName('button')[0]
let nameEle = document.getElementsByClassName('name')[0]
let ageEle = document.getElementsByClassName('age')[0]
//console.log(value);

btn.onclick = function () {
  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/collection',
    data: {
      name: nameEle.value,
      gender: getGender(),
      age: ageEle.value,
      major: getMajor()
    },
    success: (result) => {

    //   console.log(result.status)
      if(result.status === 'success'){
        console.log(result.students)
        $('.student-list').html('')
        let html = ''
        result.students.forEach((item)=>{
          let gender = item.gender == 1 ? '男' : '女'
          html+= `<div><span>${item.name} ${gender} ${item.age}岁 学习${item.major}  </span></div>`
        })
        $('.student-list').html(html)
        // alert('提交成功')
      }
    }



    // success:(result)=>{

    //   if(result.status === 'success'){
    //       //result ===> { status: 'success', students: []}
    //     console.log(result.students)
    //     $('.student-list').html('')
    //       //document.getElementsByClassName('student-list')[0].innerHTML('')
    //     let html = ''
    //     result.students.forEach((item)=>{
    //       let gender = item.gender == 1 ? '男' : '女'
    //       html+= `<div><span>${item.name} ${gender} ${item.age}岁 学习了${item.major}  </span></div>`
    //     })
    //     $('.student-list').html(html)
    //       // document.getElementsByClassName('student-list')[0].innerHTML(html)
    //     alert('存入成功')
    //   }
    // }

  })
}
