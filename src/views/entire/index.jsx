import React, { memo, useState } from 'react'
import { EntireWrapper } from './style'

const Entire = memo(() => {
  let [optionA, setOptionA] = useState(null)
  let [optionB, setOptionB] = useState(null)
  let [optionC, setOptionC] = useState(null)
  let [optionD, setOptionD] = useState(null)
  let [title, setTitle] = useState(null)
  let [dm, setDm] = useState(null)
  let arr = []
  let currentProfileIndexA = -1
  let currentProfileIndexB = -1
  let currentProfileIndexC = -1
  let currentProfileIndexD = -1
  const sendMessage = (value) => {
    const text = preText(value)
    console.log(text, '文本获取')
    let searchResult = text.indexOf('————————————————', 0)
    console.log(searchResult, 'searchResult')
    if (searchResult !== -1) {
      let csdn = text.slice(searchResult, text.length + 1)
      console.log(csdn, 'csdn')
      text = text.replace(csdn, '')
    }
    arr = text.split("hwu")
    arr = arr.filter(item => item)
    console.log(arr, '去除空字符串')
    getTitle(arr[0])
  }
  const getTitle = (t) => {
    console.log(t, 'title')
    let length = t.match(/[\u4E00-\u9FA5]/g) ? t.match(/[\u4E00-\u9FA5]/g).length : 0
    console.log(length, 'len')
    if (length > 5) {
      title = t
      arr = arr.filter((item) => {
        return item !== title
      });
    } else {
      console.log('未识别到标题或标题少于五个汉字')
    }
    arr.map(item => {
      getValue(item)
      getCodes(item)
    })
    console.log(length, '包含几个汉字')
    arr.splice(currentProfileIndexA, arr.length)
    dm = arr.join('\n').replace(';', "\n")
    let searchResult = dm.indexOf('————————————————', 0)
    console.log(searchResult, 'searchResult')
    if (searchResult !== -1) {
      let csdn = dm.slice(searchResult, dm.length + 1)
      console.log(csdn, 'csdn')
      dm = dm.replace(csdn, '')
      console.log(dm, 'dm')
    }
    console.log('title', title)
    console.log('dm', dm)
    console.log('optionA', optionA)
    console.log('optionB', optionB)
    console.log('optionC', optionC)
    console.log('optionD', optionD)
    setTitle(title)
    setDm(dm)
    setOptionA(optionA)
    setOptionB(optionB)
    setOptionC(optionC)
    setOptionD(optionD)
  }
  // 多行文本域内容逐行获取
  const preText = (pretext) => {
    return pretext.replace(/\r\n/g, "hwu").replace(/\n/g, "hwu");
  }
  // 获取单个选项并从原数组中移除
  const getValue = (str) => {
    let reg = /(([a-dA-D][:|.|,|、|：|，| |。]))/
    if (reg.test(str.trim().substr(0, 2))) {
      const value = str.trim().substr(2)
      if (str.trim().substr(0, 1) == 'A') currentProfileIndexA = arr.findIndex((profile) =>
        profile === str);
      if (str.trim().substr(0, 1) == 'B') currentProfileIndexB = arr.findIndex((profile) =>
        profile === str);
      if (str.trim().substr(0, 1) == 'C') currentProfileIndexC = arr.findIndex((profile) =>
        profile === str);
      if (str.trim().substr(0, 1) == 'D') currentProfileIndexD = arr.findIndex((profile) =>
        profile === str);
      console.log(currentProfileIndexA, 'currentProfileIndexA ');
      console.log(currentProfileIndexB, 'currentProfileIndexB ');
      console.log(currentProfileIndexC, 'currentProfileIndexC ');
      console.log(currentProfileIndexD, 'currentProfileIndexD ');
      if (currentProfileIndexB !== -1) {
        if (currentProfileIndexA == currentProfileIndexB - 1) {
          optionA = arr[currentProfileIndexA].trim().substr(2)
        } else {
          let changeArr = arr.slice(currentProfileIndexA, currentProfileIndexB)
          optionA = changeArr.join("").trim().substr(2)
        }
      }
      if (currentProfileIndexC !== -1) {
        if (currentProfileIndexB == currentProfileIndexC - 1) {
          optionB = arr[currentProfileIndexB].trim().substr(2)
        } else {
          let changeArr = arr.slice(currentProfileIndexB, currentProfileIndexC)
          optionB = changeArr.join("").trim().substr(2)
        }
      }
      if (currentProfileIndexD !== -1) {
        if (currentProfileIndexC == currentProfileIndexD - 1) {
          optionC = arr[currentProfileIndexC].trim().substr(2)
        } else {
          let changeArr = arr.slice(currentProfileIndexC, currentProfileIndexD)
          optionC = changeArr.join("").trim().substr(2)
        }
        if (currentProfileIndexD == arr.length - 1) {
          optionD = arr[currentProfileIndexD].trim().substr(2)
        } else {
          let changeArr = arr.slice(currentProfileIndexD, arr.length)
          optionD = changeArr.join("").trim().substr(2)
        }
      } else {
        if (str.trim().substr(0, 1) == 'C') optionC = str.trim().substr(2)
      }
      console.log(arr, 'affffffffff')
    }
  }
  const getCodes = (str) => {
    // 去除复制代码块多余的数字
    if (!isNaN(Number(str)) && str.length < 2) {
      arr = arr.filter((item) => {
        return item !== str
      });
    }
  }
  return (
    <EntireWrapper>
      <div className='flex'>
        <div className='flex-left'>
          <h1 className='filter'>代码题智能粘贴</h1>
          <textarea name="" id="" cols="30" rows="10" onChange={e => sendMessage(e.target.value)}></textarea>
        </div>
        <div className='flex-right'>
          <div>标题：{title}</div>
          <div>代码：{dm}</div>
          <div>A:{optionA}</div>
          <div>B:{optionB}</div>
          <div>C:{optionC}</div>
          <div>D:{optionD}</div>
        </div>
      </div>
    </EntireWrapper>
  )
})

export default Entire
