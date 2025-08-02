import { useState } from 'react';
import apiService from '../services/api.js';

const ApiTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testApiConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Test basic health check first
      console.log('Testing API Base URL:', apiService.baseURL);
      const healthResult = await apiService.checkHealth();
      console.log('Health check result:', healthResult);

      // Test content endpoint
      const contentResult = await apiService.getContent();
      console.log('Content result:', contentResult);

      setResult({
        baseURL: apiService.baseURL,
        health: healthResult,
        content: contentResult
      });
    } catch (err) {
      console.error('API Test Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testDirectFetch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const url = 'https://api.drganeshcs.com/api/content';
      console.log('Testing direct fetch to:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult({
        baseURL: url,
        directFetch: data
      });
    } catch (err) {
      console.error('Direct Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      
      <div className="mb-4 space-x-4">
        <button
          onClick={testApiConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test API Service'}
        </button>
        
        <button
          onClick={testDirectFetch}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Direct Fetch'}
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Configuration:</h3>
        <p><strong>API Base URL:</strong> {apiService.baseURL}</p>
        <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
        <p><strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL}</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-semibold">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-semibold">Result:</h3>
          <pre className="mt-2 text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
