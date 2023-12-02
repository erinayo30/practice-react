import React, { useRef, useState } from 'react'
import { data } from '../../assets/data'

const Quiz = () => {

  let[index, setIndex] = useState(0)
  let[question,  setQuestion] = useState(data[index]);
  let [lock, setLock] =useState(false)
  let [score, setScore] = useState(0)
  let[result, setResult] = useState(false)

  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)

  let option_array= [option1,option2,option3,option4]

  const checkAns = (e, ans) =>{
    if (lock ===false) {
      if (index === data.length -1) {
        setResult(true)
        return 0
      }
            if (question.ans===ans) {
          e.target.classList.add("correct")
          setLock(true)
          setScore(prev=>prev+1)
        }else{
              e.target.classList.add("wrong")
              setLock(true)
              option_array[question.ans-1].current.classList.add("correct")
        }
    }

 
  }
  const next =() =>{
    if (lock === true) {
      setIndex(++index)
      setQuestion(data[index])
      setLock(false)
      option_array.map((option)=>{
        option.current.classList.remove('wrong')
         option.current.classList.remove('correct')
         return null
      })
    }
  }
  const reset =() => {
    setIndex(0);
    setQuestion(data[0])
    setScore(false)
    setLock(false)
    setResult(false)

  }

  return (
    <div className='w-[640px] m-auto mt-3 text-[#262626] bg-white flex rounded-2xl gap-10 px-8 py-6 flex-col font-serif'>
    <h1 className='font-black text-4xl'>Challenge Yourself</h1>
    <hr className='h-1 border-0 bg-[#707070]' />
    {result?<></>:<>
     <h3 className='text-3xl font-medium'>{index+1}. {question.question}</h3>
    <ul className='flex gap-10 items-center h-16 pl-3 rounded-xl text-xl cursor-pointer'>
      <li
      ref={option1}
       onClick={(e)=>{checkAns(e,1)}}
      className='border-2 gap-5 rounded-xl p-3'>{question.option2}</li> 
      <li
      ref={option2}
       onClick={(e)=>{checkAns(e,2)}}
      className='border-2 gap-5 rounded-xl p-3'>{question.option3}</li> 
      <li 
      ref={option3}
       onClick={(e)=>{checkAns(e,3)}}
     className=' border-2 gap-5 rounded-xl p-3'>{question.option4}</li>
      <li
      ref={option4}
       onClick={(e)=>{checkAns(e,4)}}
      className='border-2 gap-5 rounded-xl p-3'>{question.option1}</li>
    </ul>
     <button 
    onClick={next}
    className=' rounded bg-[#553f9a] text-white h-7 cursor-pointer text-center content-center items-center'>Next</button>
    <div
     className='m-auto'
       name='index'> {index+1} of {data.length} questions</div>
    </>}
    {result?<>
     <h3>Your Score: {score} out of{data.length}</h3>
    <button
    onClick={reset}
    className=' rounded bg-[#553f9a] text-white h-7 cursor-pointer text-center content-center items-center'
    >Reset</button>
    </>:<></>}
   
    </div>
  )
}

export default Quiz
