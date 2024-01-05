import { auth } from "@/auth"
import { signOut } from "@/auth"
export default async function Page(){
    const session = await auth()
    // return

    return(
        <>
         {JSON.stringify(session)}
        <form action={async () => {
        "use server"
        await signOut()
      }}>
       <button>Sign out</button>
      </form>
        </>
    )
    
}