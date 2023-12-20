'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Slider, Text, TextFieldInput, TextFieldRoot } from '@radix-ui/themes';

interface Row {
    BatterName: string;
    PitcherName?: string;
    BatterId: string;
    PitcherID: number;
    B?: string;
    PA?: number;
    AB?: number;
    H?: number;
    twoB?: number;
    threeB?: number;
    HR?: number;
    RBI?: number;
    BB?: number;
    SO?: number;
    BA?: number;
    OBP?: number;
    SLG?: number;
    OPS?: number;
    SH?: number;
    SF?: number;
    IBB?: number;
    HBP?: number;
    GIDP?: number;
    CurrentTm?: string;
  }
  

  const VsPage = () => {
    const [rows, setRows] = useState<Row[]>([]);
    const [batterName, setBatterName] = useState<string>('');
    const [pitcherName, setPitcherName] = useState<string>('');
    const [minPlateAppearances, setMinPlateAppearances] = useState(5);
    const omittedKeys = ["BatterId", "PitcherID", "SH", "SF", "CurrentTm"]
    const map = new Map([["twoB", "2B"], ["threeB", "3B"]]);
    const filterKeys = (keys: string[]) => keys.filter(key => !omittedKeys.includes(key));
    const displayHeader = (key: string) => {
        // Check if the key is in the map and replace with the corresponding value
        return map.has(key) ? map.get(key) : key;
      };

    const handleGenerateTable = async () => {
        try {
          // Fetch data from the API using axios or perform any necessary operations
          const response = await axios.get(`/api/vs?BatterName=${encodeURIComponent(batterName)}&PitcherName=${encodeURIComponent(pitcherName)}&MinPA=${encodeURIComponent(minPlateAppearances)}`);
          setRows(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
    return (
      <div className='max-w-xxl p-4 space-y-4'>
        <div className='flex space-x-4'>
          <Text className='self-center'>Batter:</Text>
          <TextFieldRoot>
            <TextFieldInput
              className='border rounded-md p-2'
              placeholder='Enter Batter Name'
              value={batterName}
              onChange={(e) => setBatterName(e.target.value)}
            />
          </TextFieldRoot>
  
          <Text className='self-center'>VS</Text>
  
          <Text className='self-center'>Pitcher:</Text>
          <TextFieldRoot>
            <TextFieldInput
              className='border rounded-md p-2'
              placeholder='Enter Pitcher Name'
              value={pitcherName}
              onChange={(e) => setPitcherName(e.target.value)}
            />
          </TextFieldRoot>

          <Text className='self-center'>Min PA: {minPlateAppearances}</Text>
        <input
          type='range'
          min={1}
          max={50}
          value={minPlateAppearances}
          onChange={(e) => setMinPlateAppearances(Number(e.target.value))}
        />

          <Button
          className='bg-green-500 text-white p-2 rounded-md'
          onClick={handleGenerateTable}
        >
          Generate Table
        </Button>
        </div>

       {/* Display the generated table using regular HTML elements with Radix UI styling */}
      {rows.length > 0 && (
        <div className='overflow-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr>
                {filterKeys(Object.keys(rows[0])).map((key) => (
                  <th key={key} className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {displayHeader(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {rows.map((row, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  {filterKeys(Object.keys(row)).map((key) => (
                    <td key={key} className='px-6 py-4 whitespace-nowrap'>{row[key as keyof Row]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    );
  };
  
  export default VsPage;