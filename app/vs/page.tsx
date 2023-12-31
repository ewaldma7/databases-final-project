'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Text, TextFieldInput, TextFieldRoot } from '@radix-ui/themes';

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
        return map.has(key) ? map.get(key) : key;
    };

    const handleGenerateTable = async () => {
        try {
            const response = await axios.get(`/api/vs?BatterName=${encodeURIComponent(batterName)}&PitcherName=${encodeURIComponent(pitcherName)}&MinPA=${encodeURIComponent(minPlateAppearances)}`);
            setRows(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='flex justify-center items-start min-h-screen bg-gray-100'>
            <div className='max-w-screen-xl w-full p-12 bg-white shadow-lg rounded-lg text-xl mt-16'>
                <div className='space-y-8 text-center'>
                    <div className='flex space-x-8 items-center'>
                        <Text className='self-center'>Batter:</Text>
                        <TextFieldRoot>
                            <TextFieldInput
                                className='border rounded-md p-4'
                                placeholder='Enter Batter Name'
                                value={batterName}
                                onChange={(e) => setBatterName(e.target.value)}
                            />
                        </TextFieldRoot>

                        <Text className='self-center'>VS</Text>

                        <Text className='self-center'>Pitcher:</Text>
                        <TextFieldRoot>
                            <TextFieldInput
                                className='border rounded-md p-4'
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
                            className='bg-green-500 text-white p-4 rounded-md'
                            onClick={handleGenerateTable}
                            disabled={!!!batterName && !!!pitcherName}
                        >
                            Generate Table
                        </Button>
                    </div>

                    {rows.length > 0 ? (
                        <div className='overflow-auto'>
                            <table className='min-w-full divide-y divide-gray-200 text-xl'>
                                <thead>
                                    <tr>
                                        {filterKeys(Object.keys(rows[0])).map((key) => (
                                            <th key={key} className='px-12 py-6 font-medium text-gray-500 uppercase tracking-wider'>
                                                {displayHeader(key)}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {rows.map((row, index) => (
                                        <tr key={index} className='hover:bg-gray-50'>
                                            {filterKeys(Object.keys(row)).map((key) => (
                                                <td key={key} className='px-12 py-8 whitespace-nowrap'>{row[key as keyof Row]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className='text-center'>
                            <p className='text-xl'>No available rows</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VsPage;