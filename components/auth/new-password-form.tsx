"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  newPasswordschema } from "@/schema";
import { CardWrapper } from './card-wrapper'
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";


export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    
    const token = searchParams.get("token");


    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof newPasswordschema>>({
        resolver: zodResolver(newPasswordschema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const OnSubmit = (values: z.infer<typeof newPasswordschema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            newPassword(values, token).then((data) => {
                if (data?.error) { setError(data.error) }
                if (data?.success) { setSuccess(data.success) }
            })
        })
        // console.log(values)
    }
    return (
        <CardWrapper
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"

        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(
                        OnSubmit
                    )}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter new password"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />                       
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Confirm new password"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />                       
                    </div>

                    {(error) && <FormError message={ error} />}
                    {success && <FormSuccess message={success} />}
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Reset Password
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}

