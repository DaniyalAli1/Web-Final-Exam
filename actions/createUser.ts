"use server"

import { userSchema } from '@/Schemas/userSchema'
import prisma from '@/lib/dt'
import React from 'react'
import { z } from 'zod'

export const createUser = async(values: z.infer<typeof userSchema>) => {
    const user = await prisma.user.create({
        data:{
            task: values.task,
            isComplete: false
        }
    })
}
