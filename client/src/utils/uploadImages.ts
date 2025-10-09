export async function uploadImages(files: File[]) {
    const formData = new FormData();
    for (const file of files) {
        formData.append("images", file);
    }

    const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

    if (!serverDomain) throw new Error("Server domain is not defined in the environment variables.")

    const res = await fetch(`${serverDomain}/upload`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Images Upload failed");
    const data = await res.json();
    return data.urls;
}
