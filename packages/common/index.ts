
import z, { ZodError } from "zod";
export  const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(3,"password is too short")
})
export  const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(3,"password is too short")
})

export const zodErrorMessage = ({error}: {error: ZodError})=>{ 
    return error.issues.map((er)=>`path: ${er.input}, message: ${er.message}`).join(",");
}