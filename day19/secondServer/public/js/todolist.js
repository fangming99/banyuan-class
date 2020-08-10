    var taskListEle = document.getElementsByClassName("task-list")[0];
    var taskItems = document.getElementsByClassName("task-item");
    var inputEle = document.getElementsByClassName("input")[0];
    var addBtn = document.getElementsByClassName("button")[0];
    var close = document.getElementsByClassName("close");

    //初始化
    init();
    // 绑定
    bindCloseEvent();
    addBtn.onclick = addTask;

    //enter事件
    inputEle.onkeydown = function (e) {
      if (e.keyCode === 13) {
        addTask();
      }
    };

    //初始化
    function init() {
      for (var i = 0; i < taskItems.length; i++) {
        var span = createCloseSymbol();
        taskItems[i].appendChild(span);
      }
      bindCheckedEvent();
    }

    //给li绑定点击checked事件
    function bindCheckedEvent() {
      for (var i = 0; i < taskItems.length; i++) {
        taskItems[i].onclick = function () {
          console.log('taskName===>', this.getAttribute('task'));
          console.log('classList===>', this.classList.contains('checked'))

          $.ajax({
            type: 'post',
            url: 'http://localhost:3000/checkTask',
            data: {
              name: this.getAttribute('task'),
              checked: !this.classList.contains('checked')
            },
            success: (result) => {
              this.classList.toggle('checked')
            },
            error: () => {

            }
          })

        };
      }
    }

    //添加任务
    function addTask() {
      var li = document.createElement("li");
      li.className = "task-item";
      //添加文本
      var inputValue = inputEle.value;
      //如果没有输出，则直接返回
      if (inputValue === "") {
        return;
      }


      $.ajax({
        type: 'post',
        url: 'http://localhost:3000/addTask',
        data: {
          name: inputValue,
        },
        success: () => {
          var text = document.createTextNode(inputValue);
          li.appendChild(text);
          taskListEle.appendChild(li);
          //重置input的值
          inputEle.value = "";
          var span = createCloseSymbol();
          li.appendChild(span);
          li.onclick = function () {
            this.classList.toggle("checked");
          };
          bindCloseEvent();
        },
        error: () => {

        }
      })
    }

    function createCloseSymbol() {
      var span = document.createElement("span");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      return span;
    }

    function bindCloseEvent() {
      for (var i = 0; i < close.length; i++) {

        close[i].onclick = function () {
          $.ajax({
            type: 'post',
            // contentType: false,
            // processData: false,
            url: 'http://localhost:3000/closeTask',
            data: {
              name:this.parentElement.getAttribute('task')
            },
            success: () => {
              var parentEle = this.parentElement;
              parentEle.remove();

            },
            error: () => {

            }
          })

        };
      }
    }
