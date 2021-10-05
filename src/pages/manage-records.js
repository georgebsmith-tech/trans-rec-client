import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import { getRecords } from '../utils/services/getServices'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

const log =console.log

export async function getServerSideProps({ req }) {
  // Fetch data from external API
 
try{
  const refreshToken = req.cookies.refreshToken
  const token = req.cookies.token
  const records = await getRecords({refreshToken,token})
 if (records.error){
   console.log("the error")
   return { props: { error:records } }
 }

  // Pass data to the page via props
  return { props: { records } }
}catch(err){
  console.log(err.data)
  return  { props: { error:"error" } }
}
  

}


export default function ManageRecords({records=[],error}) {

  const router = useRouter()
 

const [selectedCourses,setSelectedCourses]=useState([])
console.log(selectedCourses)
const addRecord=(e)=>{
  e.preventDefault()
  const record= {...user,courses:selectedCourses}
  console.log(record)
}

useEffect(()=>{
  if(error){
    console.log("here")
    console.log(records)
    router.push("/login")
    return 
  }

},[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Manage Records</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      {
        records.length===0?<div> There are no records!!</div>:<div>
          <table>
            <thead>
              <th style={style.td}>S/N</th>
              <th style={style.td}>Surname</th>
              <th style={style.td}>First Name</th>
              <th style={style.td}>Other Name(s)</th>
              <th style={style.td}>Department</th>
              <th style={style.td}>Level</th>
              <th style={style.td}>Courses</th>
              <th style={style.td}>Status</th>
              <th style={style.td}>Action</th>
            </thead>
            <tbody>
              {
                records.map((record,idx)=>{
                  return (
                    <tr>
                      <td style={style.td}>
                        {idx*1+1}
                      </td>
                      <td style={style.td}>
                        {record.lastName}
                      </td>
                      <td style={style.td}>
                        {record.firstName}
                      </td>
                      <td style={style.td}>
                        {record.otherNames}
                      </td>
                      <td style={style.td}>
                        {record.department}
                      </td>
                      <td style={style.td}>
                        {record.level}
                      </td>
                      <td style={style.td}>
                        {record.courses.map(course=><div>{course.course}</div>)}
                      </td>
                      <td style={style.td}>
                        {record.cleared?"Cleard":"Not Cleared"}
                      </td>
                      <td style={style.td}>
                        <Link href="/">
                          <a style={{marginRight:10}}>
                          View
                          </a>

                        </Link>
                        <Link href="/edit-record">
                          <a>
                          Edit
                          </a>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      }

      </main>

      
    </div>
  )
}

const style={
 td: {
  padding:5
  }
  
}