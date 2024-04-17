"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loginschema } from "@/schema";
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
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import Link from "next/link";



export const LoginForm = () => {
    const searchparams = useSearchParams();
    const  callbackUrl = searchparams.get("callbackUrl");
    const urlError = searchparams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : "";
    const [showTwofactor, setShowTwofactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof Loginschema>>({
        resolver: zodResolver(Loginschema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const OnSubmit = (values: z.infer<typeof Loginschema>) => {
        // console.log(values, 'value',form)
        setError("")
        setSuccess("")
        startTransition(() => {
            login(values, callbackUrl).then((data) => {
                if(data?.error === "Invalid code!") {
                    setError("Invalid codeee!")
                    return
                }
                if (data?.error) {
                    form.reset()
                    setError(data.error)
                 }
                if (data?.success) { 
                        form.reset()
                        setSuccess(data.success)
                }
                if (data?.twoFactor) {
                    setShowTwofactor(true)   
                }
            }).catch(() => {
                setError("Something went wrong!")
            })
        })
    }
    // console.log(showTwofactor, 'showtwofactor')
    // console.log(isPending, 'pending')
    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial

        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(
                        OnSubmit
                    )}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {showTwofactor ? (
                        <>
                            <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="123456"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </>):
                        ( 
                            <>
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
                                            placeholder="•••••••••"
                                            type="password"
                                        />
                                    </FormControl>
                                    <Button variant="link" size={"sm"} asChild className="font-normal px-0 float-right">
                                        <Link href="/auth/reset">Forgot password?</Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </>
                        )}
                    </div>

                    {(error || urlError) && <FormError  message={ error || urlError} />}
                    {success && <FormSuccess message={success} />}
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {showTwofactor ? "Confirm" : "Login"}
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}

