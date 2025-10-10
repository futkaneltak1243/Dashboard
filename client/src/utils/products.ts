import { handleSubmit } from "./handleSubmit";

export async function toggleProductLike(
    productId: number,
    isfavorite: number,
    onSuccess?: (res: any) => void,
    onError?: (err: any) => void,
) {
    return handleSubmit({
        url: `/products/${productId}/favorite`,
        method: "PUT",
        data: { isfavorite },
        onSuccess,
        onError,
    });
}