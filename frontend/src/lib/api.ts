const API = process.env.NEXT_PUBLIC_API_URL;

export async function getArticles() {
  const res = await fetch(`${API}/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil artikel");
  }

  const result = await res.json();

  return result.data;
}