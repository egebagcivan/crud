import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";

export default function Books() {
  const { data: session, status } = useSession();

  const { data: books } = api.book.getAll.useQuery();

  useEffect(() => {
    if (!session && status !== "loading") {
      window.location.href = "/login";
    }
  }, [session]);

  if (!session) {
    return null; // Render nothing if not logged in
  }

  return (
    <div className="bg-base-300 min-h-screen">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Image</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>
                  <img src={book.image} alt={`Cover of ${book.title}`} className="w-12 h-12" />
                </td>
                <td>
                  <a href={book.link} className="btn btn-ghost btn-xs">
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
