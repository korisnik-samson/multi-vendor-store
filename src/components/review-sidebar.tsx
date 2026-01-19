import { ReviewSidebarProps } from "@/types";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ReviewForm } from "@/components/review-form";

export const ReviewSidebar = ({ productId }: ReviewSidebarProps) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.reviews.getOne.queryOptions({ productId }));

    return (
        <div>
            <ReviewForm productId={productId} initialData={data} />
        </div>
    )
}