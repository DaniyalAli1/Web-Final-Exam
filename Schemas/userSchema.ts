"use client"
 
import { z } from "zod"
 
export const userSchema = z.object({
  task: z.string().min(2).max(50),
})