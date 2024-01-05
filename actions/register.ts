"use server"

import { RegisterSchema } from "../schemas"
import * as z from "zod"
import prisma from "@/lib/db"
import bcrypt from "bcrypt"

export async function register(values: z.infer<typeof RegisterSchema>) {


    const validateFields = RegisterSchema.safeParse(values)

    if (!validateFields.success) {
        return { error: "Invalid credenntials" };
    }
    const { email, password, name } = validateFields?.data;

    try {

        const hashedPassword =  await bcrypt.hash(password,10);
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return { error: "This user already exists" };
        }

        await prisma.user.create({
          data:{
            name,
            email,
            password : hashedPassword,
          }
        })

   
    }catch(err){
        return{error : "Something went wrong while register"}
    }
   }




