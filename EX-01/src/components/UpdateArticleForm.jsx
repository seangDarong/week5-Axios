import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateArticleForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [form, setForm] = useState(null); // Start as null
  const [loading, setLoading] = useState(true);

  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    axios.get(`http://localhost:3000/articles/${id}`)
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch article:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/articles/${id}`, form);
      alert('Article updated');
      navigate('/');
    } catch (err) {
      alert('Failed to update article');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!form) return <div>Article not found.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
