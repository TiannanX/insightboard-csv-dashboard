import { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { validateData } from '../utils/sampleData';

export function useCSVParser() {
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState(null);

  const parseFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      setIsParsing(true);
      setError(null);

      if (!file) {
        setError('No file provided');
        setIsParsing(false);
        reject(new Error('No file provided'));
        return;
      }

      if (!file.name.toLowerCase().endsWith('.csv')) {
        setError('Please upload a CSV file');
        setIsParsing(false);
        reject(new Error('Please upload a CSV file'));
        return;
      }

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors && results.errors.length > 0) {
            const errorMsg = results.errors[0].message || 'Failed to parse CSV';
            setError(errorMsg);
            setIsParsing(false);
            reject(new Error(errorMsg));
            return;
          }

          const validation = validateData(results.data);

          if (!validation.valid) {
            setError(validation.error);
            setIsParsing(false);
            reject(new Error(validation.error));
            return;
          }

          setIsParsing(false);
          resolve(validation.data);
        },
        error: (err) => {
          setError('Failed to read file');
          setIsParsing(false);
          reject(err);
        },
      });
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    parseFile,
    isParsing,
    error,
    clearError,
  };
}