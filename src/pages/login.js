import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import cookie from 'js-cookie'
import { logAdmin } from '../utils/services/postServices'
import {useRouter} from 'next/router'

export default function Home() {

    const router= useRouter()
const [user,setUser]=useState({})
const addRecord=async (e)=>{
    try{
        e.preventDefault()
          const body = user
          const data =await  logAdmin(user)
          console.log(data)
          cookie.set("token", data.token, { expires: 10 })
          cookie.set("refreshToken", data.refreshToken, { expires: 14 })
          router.push("/")
          }catch(err){
            console.log(err)
          }
}

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <form>

      <input 
      value={user.lastName}
      onChange={(e)=>setUser({...user,email:e.target.value.trim()})}
      type="text"
      placeholder="Email" />
      <input 
            value={user.firstName}
      onChange={(e)=>setUser({...user,password:e.target.value.trim()})}
      type="password"
      placeholder="Password" />
      
       
      
      <button 
      onClick={addRecord}
      >
        login
      </button>

      </form>
   
      </main>

      
    </div>
  )
}
