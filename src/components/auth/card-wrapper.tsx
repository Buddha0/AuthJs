
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SocialLogin } from "./social-login"
import Link from "next/link"

interface WrapperProps {
    children: React.ReactNode
    title: string;
    linkToTitle:string;
    linkHref:string;
}

export default function CardWrapper({ children, title , linkToTitle, linkHref }: WrapperProps) {
    return (
        <>
            <div className="w-full h-[100vh] flex justify-center items-center ">

                <Card className="w-[400px] shadow-md ">

                    <CardHeader className="text-center">
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {children}
                    </CardContent>

                    <CardFooter>
                        <SocialLogin />
                    </CardFooter>

                    <CardFooter>
                     <Link href = {linkHref}> <p className="text-center cursor-pointer">{linkToTitle}</p></Link>  
                    </CardFooter>

                </Card>

            </div>

        </>
    )
}