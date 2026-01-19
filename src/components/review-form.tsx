import { ReviewFormProps } from "@/types";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { reviewFormSchema } from "@/modules/auth/schemas";
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem, FormDescription } from "@/components/ui/form";
import { StarPicker } from "@/components/star-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const ReviewForm = ({ productId, initialData }: ReviewFormProps) => {
    const [isPreview, setIsPreview] = useState<boolean>(!!initialData);
    const trpc = useTRPC();

    const queryClient = useQueryClient()

    const createReview = useMutation(trpc.reviews.create.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({ productId}));
            setIsPreview(true);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }));

    const updateReview = useMutation(trpc.reviews.update.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({ productId}));
            setIsPreview(true);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }));

    const form = useForm<z.infer<typeof reviewFormSchema>>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            rating: initialData?.rating ?? 0,
            description: initialData?.description ?? "",
        }
    });

    const onSubmit = (values: z.infer<typeof reviewFormSchema>) => {
        if (initialData) {
            updateReview.mutate({
                reviewId: initialData.id,
                rating: values.rating,
                description: values.description,
            });

        } else {
            createReview.mutate({
                productId,
                rating: values.rating,
                description: values.description
            });
        }
    }

    return (
        <Form {...form}>
            <form className='flex flex-col gap-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <p className='font-medium'>
                    {isPreview ? 'Your rating' : 'Like it? Give it a rating'}
                </p>

                <FormField control={form.control} name='rating' render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <StarPicker value={field.value} onChange={field.onChange} disabled={isPreview} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                
                <FormField control={form.control} name='description' render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea placeholder="Want to leave a written review?" disabled={isPreview} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {!isPreview && (
                    <Button variant='elevated' disabled={createReview.isPending || updateReview.isPending} type='submit' size='lg'
                            className='bg-black text-white hover:bg-pink-400 hover:text-primary w-fit'>
                        {initialData ? 'Update review' : 'Submit review'}
                    </Button>
                )}

                {isPreview && (
                    <Button onClick={() => setIsPreview(false)}
                            variant='elevated' size='lg' type='button' className='w-fit'>
                        Edit
                    </Button>
                )}
            </form>
        </Form>
    )
}