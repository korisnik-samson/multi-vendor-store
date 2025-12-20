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
import { registerSchema } from "@/modules/auth/schemas";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import TextType from "@/components/ui/text-type";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const SignUpView = () => {
    const router = useRouter();
    const trpc = useTRPC();

    const register = useMutation(trpc.auth.register.mutationOptions({
        onSuccess: () => {
            toast.success("Account created successfully!");
            router.push('/');
        },
        onError: (error) => toast.error(error.message)
    }));

    const form = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        }
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        register.mutate(values);
    }

    const username: string = form.watch('username');
    const usernameErrors: FieldError | undefined = form.formState.errors.username;

    const showPreview = username && !usernameErrors;

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
                                <Link prefetch href='/sign-in'>
                                    Sign In
                                </Link>
                            </Button>
                        </div>

                        <TextType text={["Pridružite se preko 1.580 kreatora koji zarađuju na Biblioteku."]} typingSpeed={65} className='text-4xl font-medium'
                                  pauseDuration={12000} showCursor={true} cursorCharacter= {'\u258E'}/>

                        <FormField name='username' render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base'>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription className={cn('hidden', showPreview && 'block')}>
                                    Your store will be available at&nbsp;
                                    {/* TODO: USe a proper method to generate preview URL */}
                                    <strong>{username}</strong>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

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

                        <Button disabled={register.isPending} type='submit' size='lg' variant='elevated'
                                className='bg-black text-white hover:bg-pink-400 hover:text-primary'>
                            Create account
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