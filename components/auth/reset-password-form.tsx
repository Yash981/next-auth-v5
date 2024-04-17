"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Resetschema } from "@/schema";
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
import { reset } from "@/actions/reset";


export const ResetPasswordForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof Resetschema>>({
        resolver: zodResolver(Resetschema),
        defaultValues: {
            email: "",
        },
    });

    const OnSubmit = (values: z.infer<typeof Resetschema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            reset(values).then((data) => {
                if (data?.error) { setError(data.error) }
                if (data?.success) { setSuccess(data.success) }
            })
        })
        // console.log(values)
    }
    return (
        <CardWrapper
            headerLabel="Forgot your password?"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
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
                        Send Reset Email
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}

