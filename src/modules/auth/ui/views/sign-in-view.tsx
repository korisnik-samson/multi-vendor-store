'use client'

import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema, registerSchema } from "@/modules/auth/schemas";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import ScrambledText from "@/components/ui/scrambled-text";
import TextType from "@/components/ui/text-type";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const SignInView = () => {
    const router = useRouter();
    const trpc = useTRPC();

    const login = useMutation(trpc.auth.login.mutationOptions({
        onSuccess: () => {
            toast.success("Log in successful");
            router.push('/');
        },
        onError: (error) => toast.error(error.message)
    }));

    const form = useForm<z.infer<typeof loginSchema>>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        login.mutate(values);
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-5'>
            <div className='bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8 p-4 lg:p-16'>
                        <div className='flex items-center justify-between mb-8'>
                            <Link href='/'>
                                <span className={cn("text-2xl font-semibold", poppins.className)}>
                                    bltka.
                                </span>
                            </Link>

                            <Button asChild variant='ghost' size='sm' className='text-base border-none underline'>
                                <Link prefetch href='/sign-up'>
                                    Sign up
                                </Link>
                            </Button>
                        </div>

                        <TextType text={["Dobrodošli nazad u Biblioteku"]} typingSpeed={65} className='text-4xl font-medium'
                            pauseDuration={12000} showCursor={true} cursorCharacter= {'\u258E'} />

                        {/*<h1 className='text-4xl font-medium'>

                        </h1>*/}

                        <FormField name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base'>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name='password' render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base'>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <Button disabled={login.isPending} type='submit' size='lg' variant='elevated'
                                className='bg-black text-white hover:bg-pink-400 hover:text-primary'>
                            Log in
                        </Button>
                    </form>
                </Form>
            </div>

            <div className='h-screen w-full lg:col-span-2 hidden lg:block'
                 style={{
                     backgroundImage: 'url(/sign-up-background.png)',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                 }}
            />
        </div>
    );
}