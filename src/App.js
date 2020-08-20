import React, { useState, useEffect } from 'react';

import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const { data } = await api.get('repositories');

      setRepositories(data);
    }
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: 'Novo Repositório',
      url: 'http://github.com/novo_repositorio',
      techs: ['Node', 'PHP', 'ReactJS'],
    };
    const { data } = await api.post('repositories', newRepository);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <p>{repository.title}</p>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
