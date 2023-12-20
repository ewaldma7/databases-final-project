'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, DropdownMenu } from '@radix-ui/themes';

interface Batter {
    BatterId: number;
    BatterName: string;
}

const BatterPage = () => {
  const [batters, setBatters] = useState<Batter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Batter[]>("http://localhost:3000/api/vs");
        setBatters(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='max-w-xl'>
      <Button>
        Batter
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <ul>
          {batters.map(batter => (
            <li key={batter.BatterId}>{batter.BatterName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BatterPage;
