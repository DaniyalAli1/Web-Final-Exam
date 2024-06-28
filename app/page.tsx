"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getUser } from "@/actions/getUser";
import { deleteUser } from "@/actions/deleteUser";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { FaRegTrashAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { userSchema } from "@/Schemas/userSchema";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/createUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { updateUser } from "@/actions/updateUser";



export default function Home() {

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      task: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof userSchema>) {
    console.log(values)

    createUser(values)
  }

  const router = useRouter()

  const [userInfo, setUserInfo] = useState <any>()

  const handleLike = useCallback((userid: string)=>{
    updateUser(userid, true)
  },[])

  const handledislike = useCallback((userid: string)=>{
    updateUser(userid, false)
  },[])



  const handleDelete = useCallback((userid: string)=>{
    deleteUser(userid).then(()=>{
      router.refresh()
    })
  },[])

  useEffect(()=>{
    getUser().then((data)=>{
      setUserInfo(data)
    })
  },[userInfo])

  return (
    <div>
      <div className=" grid grid-cols-3 items-center m-24 ">
        <div className="border-black border-solid border-2 text-center rounded-lg w-1/2 bg-[#c7dcfc] p-4 ">1</div>
        <div className="border-black border-solid border-2 text-center rounded-lg w-1/2 bg-[#c0f8d0] p-4 ">2</div>
        <div className="border-black border-solid border-2 text-center rounded-lg w-1/2 bg-[#f8d8c0] p-4 ">3</div>

      </div>

      <div className="flex justify-center mb-8">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 space-x-8">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="w-96" placeholder="Enter your task" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-32" type="submit">

        Add Task
        <span>
          <FaPlus className="fill-purple-700 ml-2"/>
          </span>

        </Button>
        
      </form>
    </Form>
      </div>

      <div className="flex justify-center ">


      <div className="space-y-8 grid grid-cols-1">
        {userInfo?.map((userinfo: any)=>{
          return(
            <Card key={userinfo.id}>  
              <CardContent className="border-solid border-2 border-black rounded-lg px-40 flex flex-wrap justify-between gap-40 pt-5">
                
                <p className="flex ">{userinfo.task}</p>  

                <Button className="w-40 bg-[#c0f8d0] text-black border-2 border-solid border-black rounded-lg" type="submit">

        
        <span>
        <FaHeart className="fill-red-700 peer-last" onClick={()=> handledislike(userinfo.id)}/>
          </span>
          Mark as Completed

        </Button>
                

                <FaRegTrashAlt className="fill-red-700" onClick={()=>{handleDelete(userinfo.id)}}/>

              </CardContent>
            </Card>

          )
        })}
      </div>
        </div>
      
    </div>
  );
}
