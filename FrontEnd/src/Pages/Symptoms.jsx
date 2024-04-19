import React, { useState } from 'react';

const Symptoms = () => {
    // State to store symptoms
    const [symptoms, setSymptoms] = useState([]);
    // State to store selected symptom
    const [selectedSymptom, setSelectedSymptom] = useState('');

    // Function to add a symptom
    const addSymptom = () => {
        if (selectedSymptom.trim() !== '') {
            setSymptoms([...symptoms, selectedSymptom]);
            setSelectedSymptom('');
        }
    };

    // Function to remove a symptom
    const removeSymptom = (index) => {
        const newSymptoms = [...symptoms];
        newSymptoms.splice(index, 1);
        setSymptoms(newSymptoms);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Symptom Checker</h2>
            <div className="flex items-center mb-4">
                <input
                    className="border rounded py-2 px-4 mr-2 w-full md:w-auto"
                    type="text"
                    placeholder="Enter symptom"
                    value={selectedSymptom}
                    onChange={(e) => setSelectedSymptom(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={addSymptom}
                >
                    Add Symptom
                </button>
            </div>
            <ul className="mb-4">
                {symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <span className="mr-2">{symptom}</span>
                        <button
                            className="text-red-600 hover:text-red-700"
                            onClick={() => removeSymptom(index)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            {symptoms.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Selected Symptoms:</h3>
                    <ul className="mb-4">
                        {symptoms.map((symptom, index) => (
                            <li key={index} className="mb-1">
                                {symptom}
                            </li>
                        ))}
                    </ul>
                    {/* Add logic for symptom checking here */}
                    {/* For demo purposes, just display a placeholder message */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Possible Conditions:</h3>
                        <p className="text-gray-700">Placeholder: List of possible conditions based on selected symptoms</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Symptoms;
