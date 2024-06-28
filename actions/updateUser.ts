"use server"

import prisma from '@/lib/dt'
import React from 'react'

export const updateUser = async(userid: string, state: boolean) => {
    await prisma.user.update({
        data:{isComplete: state},
        where:{id: userid}
    })
}
