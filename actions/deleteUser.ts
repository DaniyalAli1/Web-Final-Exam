"use server"

import prisma from '@/lib/dt'
import React from 'react'

export const deleteUser = async(userid: string) => {
    await prisma.user.delete({
        where: {id: userid}
    })
}