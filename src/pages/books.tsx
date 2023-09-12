import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Modal from "~/components/Modal";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

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
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookType | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
    link: "",
  });
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

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

  const confirmDelete = async () => {
    if (bookToDelete) {
      deleteBookMutation.mutate(
        { id: bookToDelete },
        {
          onSuccess: () => {
            refetch();
            setDeleteModalOpen(false);
          },
        },
      );
    }
  };

  const promptDeleteBook = (id: string) => {
    setBookToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
    <div className="min-h-screen bg-base-100 p-6">
      <div className="card card-compact bg-base-300 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <div className="mb-6 flex">
              <button
                onClick={handleAddBook}
                className="btn btn-outline text-accent-content"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Book
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-accent-content">
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
                          <PencilIcon className="h-3 w-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => promptDeleteBook(book.id)}
                          className="btn btn-error"
                        >
                          <TrashIcon className="h-3 w-3" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          modalId="editModal"
        >
          <h2 className="mb-4 text-lg font-bold">
            {currentBook ? "Edit Book" : "Add Book"}
          </h2>
          <form onSubmit={handleSubmit}>
            <label className="mb-2 block">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="input input-bordered mb-4 w-full"
              required
            />
            <label className="mb-2 block">Author</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Author"
              className="input input-bordered mb-4 w-full"
              required
            />
            <label className="mb-2 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="textarea textarea-bordered mb-4 w-full"
              required
            />
            <label className="mb-2 block">Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="input input-bordered mb-4 w-full"
            />
            <label className="mb-2 block">Link</label>
            <input
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="Link"
              className="input input-bordered mb-4 w-full"
            />
            <button
              type="submit"
              disabled={
                currentBook
                  ? updateBookMutation.isLoading
                  : createBookMutation.isLoading
              }
              className="btn btn-primary mt-2"
            >
              {currentBook ? (
                <ArrowPathIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
              {currentBook ? "Update" : "Add"}
            </button>
          </form>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          modalId="deleteModal"
        >
          <h2 className="mb-4 text-lg font-bold">Delete Confirmation</h2>
          <p>Are you sure you want to delete this book?</p>
          <div className="mt-4 flex justify-end">
            <button onClick={confirmDelete} className="btn btn-error mr-2">
              Delete
            </button>
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
