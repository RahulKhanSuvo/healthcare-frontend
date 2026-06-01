import type { AnyFieldApi } from "@tanstack/react-form"
type AppFieldProps = {
    field: AnyFieldApi
    label?: "text" | "email" | "password" | "number"
    placeholder?: string
    append: React.ReactNode
    prepend: React.ReactNode
    className: string
    disable: boolean
}
const AppField = () => {
    return (
        
    )
}