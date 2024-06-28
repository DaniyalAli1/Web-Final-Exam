"use server"

import prisma from '@/lib/dt'
import React from 'react'

export const getUser = async() => {
    return await prisma.user.findMany()
}