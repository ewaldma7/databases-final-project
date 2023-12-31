'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Text, TextFieldInput, TextFieldRoot, Heading} from '@radix-ui/themes';

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
interface PitcherObj {
    Name: string;
}
interface BatterObj {
    BatterName: string;
}


const CustomPage = () => {
    const [rows, setRows] = useState<Row[]>([]);
    const [pitcherNames, setPitcherNames] = useState<PitcherObj[]>([]);
    const [batterNames, setBatterNames] = useState<BatterObj[]>([]);
    const [currentView, setCurrentView] = useState("Batter");
    const toggleView = () => {
        setCurrentView(currentView === "Batter" ? "Pitcher" : "Batter");
        setRows([]);
    };
    const omittedKeys = ["BatterId", "PitcherID", "SH", "SF", "CurrentTm"]
    const map = new Map([["twoB", "2B"], ["threeB", "3B"]]);
    const filterKeys = (keys: string[]) => keys.filter(key => !omittedKeys.includes(key));
    const displayHeader = (key: string) => {
        // Check if the key is in the map and replace with the corresponding value
        return map.has(key) ? map.get(key) : key;
    };
    const [batterFormData, setBatterFormData] = useState({
        batterName: '',
        minPlateAppearances: 5,
        attendedCollege: '',
        pitcherHandedness: '',
        minPitcherAge: 18,
        isActivePitcher: '',
        latestStartDate: '',
        teamPlayedFor: '',
    });
    const [pitcherFormData, setPitcherFormData] = useState({
        pitcherName: '',
        minPlateAppearances: 5,
        isActiveBatter: '',
        vsBattersInLeague: '',
        homeRunThreshold: 0,
        avgThreshold: 0,
        obpThreshold: 0,
    });

    useEffect(() => {
        readPitcherNames();
        readBatterNames();
    }, []);

    const handleBatterInputChange = (e: any) => {
        const { name, value } = e.target;
        setBatterFormData({
            ...batterFormData,
            [name]: value,
        });
    };

    const handlePitcherInputChange = (e: any) => {
        const { name, value } = e.target;
        setPitcherFormData({
            ...pitcherFormData,
            [name]: value,
        });
    };

    const readBatterNames = async () => {
        try {
            // Fetch data from the API using axios or perform any necessary operations
            const endpoint = `/api/batter/allbatters`;
            const response = await axios.get(endpoint);
            setBatterNames(response.data);
        } catch (error) {
            console.error('Error fetching pitcher names:', error);
        }
    };

    const readPitcherNames = async () => {
        try {
            // Fetch data from the API using axios or perform any necessary operations
            const endpoint = `/api/pitcher/allpitchers`;
            const response = await axios.get(endpoint);
            setPitcherNames(response.data);
        } catch (error) {
            console.error('Error fetching pitcher names:', error);
        }
    };

    const handleGenerateTable = async () => {
        try {

            // Fetch data from the API using axios or perform any necessary operations
            const endpoint = (currentView === "Batter")
                ? `/api/batter?BatterName=${encodeURIComponent(batterFormData.batterName)}&MinPA=${encodeURIComponent(batterFormData.minPlateAppearances)}&Active=${encodeURIComponent(batterFormData.isActivePitcher)}&Handedness=${encodeURIComponent(batterFormData.pitcherHandedness)}&AttendedCollege=${encodeURIComponent(batterFormData.attendedCollege)}&MinAge=${encodeURIComponent(batterFormData.minPitcherAge)}&PlayedFor=${encodeURIComponent(batterFormData.teamPlayedFor)}&Year=${encodeURIComponent(batterFormData.latestStartDate)}`
                : `/api/pitcher?PitcherName=${encodeURIComponent(pitcherFormData.pitcherName)}&MinPA=${encodeURIComponent(pitcherFormData.minPlateAppearances)}&Active=${encodeURIComponent(pitcherFormData.isActiveBatter)}&League=${encodeURIComponent(pitcherFormData.vsBattersInLeague)}&Hr=${encodeURIComponent(pitcherFormData.homeRunThreshold)}&Avg=${encodeURIComponent(pitcherFormData.avgThreshold)}&Obp=${encodeURIComponent(pitcherFormData.obpThreshold)}`;

            const response = await axios.get(endpoint);
            setRows(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className='items-center text-center p-6'>
                <Heading className='mb-4 text-center font-bold text-10xl pb-6' size={"9"}>Current View: {currentView} </Heading>
                <Button size={"4"}
                    className='bg-blue-500 text-white p-7 rounded-md'
                    onClick={toggleView}
                >
                    Switch View
                </Button>
            </div>
            {currentView === 'Batter' ?
                <div className='max-w-7xl mx-auto p-8 bg-gray-100 rounded-md'>
                    <form className='space-y-4'>
                        {/* Batter details */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='batterName'>Batter Name:</label>
                                <select
                                    id='batterName'
                                    name='batterName'
                                    onChange={handleBatterInputChange}
                                    value={batterFormData.batterName}
                                    className='border rounded-md p-2 w-full'
                                >
                                    <option value="" disabled>Select batter:</option>
                                    {batterNames?.map((obj, index) => <option key={index} value={obj.BatterName}>{obj.BatterName}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor='minPlateAppearances'>Min Plate Appearances: {batterFormData.minPlateAppearances}</label>
                                <input
                                    type='range'
                                    id='minPlateAppearances'
                                    name='minPlateAppearances'
                                    min={1}
                                    max={50}
                                    value={batterFormData.minPlateAppearances}
                                    onChange={handleBatterInputChange}
                                    className='w-full'
                                />
                            </div>
                        </div>

                        {/* Pitcher details */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='attendedCollege'>Pitcher Attended College:</label>
                                <select
                                    id='attendedCollege'
                                    name='attendedCollege'
                                    onChange={handleBatterInputChange}
                                    value={batterFormData.attendedCollege}
                                    className='border rounded-md p-2 w-full'
                                >
                                    <option value=''>Any</option>
                                    <option value='true'>Yes</option>
                                    <option value='false'>No</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor='pitcherHandedness'>Pitcher Handedness:</label>
                                <select
                                    id='pitcherHandedness'
                                    name='pitcherHandedness'
                                    onChange={handleBatterInputChange}
                                    value={batterFormData.pitcherHandedness}
                                    className='border rounded-md p-2 w-full'
                                >
                                    <option value=''>Any</option>
                                    <option value='LHP'>Left Handed</option>
                                    <option value='RHP'>Right Handed</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor='minPitcherAge'>Min Pitcher Age:</label>
                                <input
                                    type='number'
                                    id='minPitcherAge'
                                    name='minPitcherAge'
                                    min={18}
                                    max={60}
                                    value={batterFormData.minPitcherAge}
                                    onChange={handleBatterInputChange}
                                    className='border rounded-md p-2 w-full'
                                />
                            </div>

                            <div>
                                <label htmlFor='teamPlayedFor'>Team Pitcher Played For:</label>
                                <input
                                    type='text'
                                    id='teamPlayedFor'
                                    name='teamPlayedFor'
                                    value={batterFormData.teamPlayedFor}
                                    onChange={handleBatterInputChange}
                                    placeholder='Enter Team Abbreviation (Ex. NYM)'
                                    className='border rounded-md p-2 w-full'
                                />
                            </div>
                        </div>

                        {/* Additional Pitcher options */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='isActivePitcher'>Is Pitcher Still Active:</label>
                                <select
                                    id='isActivePitcher'
                                    name='isActivePitcher'
                                    onChange={handleBatterInputChange}
                                    value={batterFormData.isActivePitcher}
                                    className='border rounded-md p-2 w-full'
                                >
                                    <option value=''>Any</option>
                                    <option value='true'>Yes</option>
                                    <option value='false'>No</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor='latestStartDate'>Latest Start Date:</label>
                                <input
                                    type='date'
                                    id='latestStartDate'
                                    name='latestStartDate'
                                    value={batterFormData.latestStartDate}
                                    onChange={handleBatterInputChange}
                                    className='border rounded-md p-2 w-full'
                                />
                            </div>
                        </div>

                        <Button
                            type='button'
                            className='bg-green-500 text-white p-2 rounded-md'
                            onClick={handleGenerateTable}
                        >
                            Generate Table
                        </Button>
                    </form>

                    {/* Display the generated table using regular HTML elements with Radix UI styling */}
                    {rows.length > 0 ? (
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
                    ) : <div className='max-w-xxl space-y-4'><Text >No available rows</Text></div>}
                </div>
                : <div className='max-w-7xl mx-auto p-8 bg-gray-100 rounded-md'>
                    <form className='space-y-4'>
                        {/* Pitcher details */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='pitcherName'>Pitcher Name:</label>
                                <select
                                    id='pitcherName'
                                    name='pitcherName'
                                    onChange={handlePitcherInputChange}
                                    value={pitcherFormData.pitcherName}
                                    className='border rounded-md p-2 w-full'
                                >
                                    <option value="" disabled>Select pitcher:</option>
                                    {pitcherNames?.map((obj, index) => <option key={index} value={obj.Name}>{obj.Name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor='minPlateAppearances'>Min Plate Appearances: {pitcherFormData.minPlateAppearances}</label>
                                <input
                                    type='range'
                                    id='minPlateAppearances'
                                    name='minPlateAppearances'
                                    min={1}
                                    max={50}
                                    value={pitcherFormData.minPlateAppearances}
                                    onChange={handlePitcherInputChange}
                                    className='w-full'
                                />
                            </div>
                        </div>

                        {/* Batter details */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='isActiveBatter'>Is Batter Still Active:</label>
                                <select
                                    id='isActiveBatter'
                                    name='isActiveBatter'
                                    onChange={handlePitcherInputChange}
                                    value={pitcherFormData.isActiveBatter}
                                    className='border rounded-md p-2 w-full'
                                >
                                    <option value=''>Any</option>
                                    <option value='true'>Yes</option>
                                    <option value='false'>No</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor='vsBattersInLeague'>Vs Batters In League:</label>
                                <select
                                    id='vsBattersInLeague'
                                    name='vsBattersInLeague'
                                    onChange={handlePitcherInputChange}
                                    value={pitcherFormData.vsBattersInLeague}
                                    className='border rounded-md p-2 w-full'
                                >
                                    <option value=''>Any</option>
                                    <option value='AL'>AL</option>
                                    <option value='NL'>NL</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='homeRunThreshold'>Home Run Threshold:</label>
                                <input
                                    type='number'
                                    id='homeRunThreshold'
                                    name='homeRunThreshold'
                                    value={pitcherFormData.homeRunThreshold}
                                    min={0}
                                    onChange={handlePitcherInputChange}
                                    className='border rounded-md p-2 w-full'
                                />
                            </div>

                            <div>
                                <label htmlFor='avgThreshold'>Average Threshold:</label>
                                <input
                                    type='number'
                                    step="0.001"
                                    id='avgThreshold'
                                    name='avgThreshold'
                                    value={pitcherFormData.avgThreshold}
                                    min={0}
                                    max={1}
                                    onChange={handlePitcherInputChange}
                                    className='border rounded-md p-2 w-full'
                                />
                            </div>

                            <div>
                                <label htmlFor='obpThreshold'>OBP Threshold:</label>
                                <input
                                    type='number'
                                    step="0.001"
                                    id='obpThreshold'
                                    name='obpThreshold'
                                    value={pitcherFormData.obpThreshold}
                                    onChange={handlePitcherInputChange}
                                    min={0}
                                    max={1}
                                    className='border rounded-md p-2 w-full'
                                />
                            </div>

                            <Button
                                type='button'
                                className='bg-green-500 text-white p-2 rounded-md'
                                onClick={handleGenerateTable}
                            >
                                Generate Table
                            </Button>
                        </div>
                    </form>
                    {/* Display the generated table using regular HTML elements with Radix UI styling */}
                    {rows.length > 0 ? (
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
                    ) : <div className='max-w-xxl space-y-4'><Text >No available rows</Text></div>}
                </div>}
        </>
    );
};

export default CustomPage;