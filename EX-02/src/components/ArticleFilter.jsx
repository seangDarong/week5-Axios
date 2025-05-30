import { useEffect, useState } from 'react';
import axios from 'axios'

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API 
    axios.get('http://localhost:3000/articles')
    .then(res => setArticles(res.data))
    .catch(err => console.error(err));

  };

  const [journalists, setJournalists] = useState([]);

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    axios.get('http://localhost:3000/journalists')
    .then(res => setJournalists(res.data))
    .catch(err => console.error(err));
  };

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    // Fetch categories from the API
    axios.get('http://localhost:3000/categories')
    .then(res => setCategories(res.data))
    .catch(err => console.error(err));
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter">
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map(j =>(
            <option key ={j.id} value={j.id}>{j.name}</option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter">
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}