"use server"
import { LoginSchema } from "../schemas"
import * as z from "zod"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function login(values: z.infer<typeof LoginSchema>) {


    const validateFields = LoginSchema.safeParse(values)

    if (!validateFields.success) {
        return { error: "Invalid credenntials" };
    }

    const { email, password } = validateFields.data;

   
    try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: "/settings",
        })
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "Invalid credentials!" }
            default:
              return { error: "Something went wrong!" }
          }
        }
    
        throw error;
      }
    
   


}
