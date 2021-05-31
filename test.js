function test() {
  let arr = [

    {
      comment_id: 1,
      user_id: 3245,
      comment_date: "06-24",
      comment_content: "我！雷姆发一级评论",
      parent_id: null
    },
    {
      comment_id: 2,
      user_id: 3245,
      comment_date: "06-24",
      comment_content: "雷姆发二级评论",
      parent_id: "1"
    },
    {
      comment_id: 3,
      user_id: 3650,
      comment_date: "07-04",
      comment_content: "hello",
      parent_id: "1"
    },
    {
      comment_id: 4,
      user_id: 3650,
      comment_date: "07-04",
      comment_content: "11111",
      parent_id: null
    },
    {
      comment_id: 5,
      user_id: 3650,
      comment_date: "07-04",
      comment_content: "嘤嘤嘤",
      parent_id: null
    },
    {
      comment_id: 6,
      user_id: 3650,
      comment_date: "07-04",
      comment_content: "111111111",
      parent_id: null
    },
    {
      comment_id: 7,
      user_id: 3650,
      comment_date: "07-04",
      comment_content: "了了了零零零",
      parent_id: null
    },
    {
      comment_id: 8,
      user_id: 4035,
      comment_date: "07-12",
      comment_content: "111",
      parent_id: null
    },
    {
      comment_id: 9,
      user_id: 4035,
      comment_date: "07-12",
      comment_content: "12",
      parent_id: "3"
    },
    {
      comment_id: 10,
      user_id: 4035,
      comment_date: "07-12",
      comment_content: "123",
      parent_id: "4"
    },
    {
      comment_id: 11,
      user_id: 4436,
      comment_date: "07-22",
      comment_content: "六根清静",
      parent_id: null
    },
    {
      comment_id: 12,
      user_id: 4436,
      comment_date: "07-22",
      comment_content: "六根清静啊",
      parent_id: null
    },
    {
      comment_id: 13,
      user_id: 4436,
      comment_date: "07-22",
      comment_content: "六根清",
      parent_id: null
    },
    {
      comment_id: 14,
      user_id: 4436,
      comment_date: "07-22",
      comment_content: "嘻嘻哈哈啊",
      parent_id: "6"
    },
    {
      comment_id: 15,
      user_id: 4436,
      comment_date: "07-22",
      comment_content: "嘻嘻哈哈啊",
      parent_id: "5"
    },
    {
      comment_id: 16,
      user_id: 5130,
      comment_date: "08-11",
      comment_content: "我是布丁",
      parent_id: "8"
    }

  ]



  function fn(temp) {
    let arr1 = []
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].parent_id == temp) {
        arr1.push(arr[i])
        arr[i].child=fn(arr[i].comment_id)

      }
    }

    return arr1
  }

  const res=fn(null)
  return res

}

export {
  test
}


// [
//   {comment_id: 1, user_id: 3245, comment_date: "06-24", comment_content: "我！雷姆发一级评论", parent_id: null,child:[
//     {comment_id: 2, user_id: 3245, comment_date: "06-24", comment_content: "雷姆发二级评论", parent_id: "1",child:[
//       {comment_id: 9, user_id: 4035, comment_date: "07-12", comment_content: "12", parent_id: "3",child:[
//         {comment_id: 10, user_id: 4035, comment_date: "07-12", comment_content: "123", parent_id: "4"}
//       ]}
//     ]}
//   ]}
// ]
