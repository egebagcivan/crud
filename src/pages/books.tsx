import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Modal from "~/components/Modal";

type BookType = {
  title: string;
  author: string;
  description: string;
  image: string;
  link: string;
  id: string;
};
export default function Books() {
  const { data: session, status } = useSession();
  const { data: books, refetch } = api.book.getAll.useQuery();

  const deleteBookMutation = api.book.deleteBook.useMutation();
  const createBookMutation = api.book.createBook.useMutation();
  const updateBookMutation = api.book.updateBook.useMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookType | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
    link: "",
  });

  useEffect(() => {
    if (!session && status !== "loading") {
      window.location.href = "/login";
    }
  }, [session]);

  const handleAddBook = () => {
    setCurrentBook(null);
    setFormData({
      title: "",
      author: "",
      description: "",
      image: "",
      link: "",
    });
    
    setModalOpen(true);
  };

  const handleEditBook = (book: BookType) => {
    setCurrentBook(book);
    setFormData(book);
    setModalOpen(true);
  };

  const handleDeleteBook = async (id: string) => {
    deleteBookMutation.mutate(
      { id: id },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentBook) {
      await updateBookMutation.mutateAsync({ ...formData, id: currentBook.id });
    } else {
      await createBookMutation.mutateAsync(formData);
    }
    refetch();
    setModalOpen(false);
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-300">
      <div className="overflow-x-auto">
        <button onClick={handleAddBook} className="btn btn-primary mb-4">
          Add Book
        </button>
        <table className="table text-accent-content">
          <thead className="text-accent-content">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr key={book.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={book.image} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book.title}</div>
                    </div>
                  </div>
                </td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>
                  <a href={book.link} className="btn btn-ghost btn-xs">
                    Link
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleEditBook(book)}
                    className="btn btn-accent mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>{currentBook ? "Edit Book" : "Add Book"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Author"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <input
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Link"
          />
          <button type="submit" className="btn btn-primary mt-2">
            {currentBook ? "Update" : "Add"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
